from datetime import timedelta

from django.contrib.auth import authenticate, login, logout
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, viewsets
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, BasePermission
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Client, Document, InsuranceProduct, Invoice, Lead, Policy, Renewal
from .serializers import (
    ClientSerializer,
    DocumentSerializer,
    InsuranceProductSerializer,
    InvoiceSerializer,
    LeadSerializer,
    PolicySerializer,
    RenewalSerializer,
)


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all().order_by("last_name", "first_name")
    serializer_class = ClientSerializer


class InsuranceProductViewSet(viewsets.ModelViewSet):
    queryset = InsuranceProduct.objects.filter(is_active=True).order_by("name")
    serializer_class = InsuranceProductSerializer


class PolicyViewSet(viewsets.ModelViewSet):
    queryset = (
        Policy.objects.select_related("client", "product")
        .prefetch_related("renewals", "invoices")
        .all()
    )
    serializer_class = PolicySerializer
    lookup_field = "policy_number"
    lookup_value_regex = "[\w-]+"


class RenewalViewSet(viewsets.ModelViewSet):
    queryset = Renewal.objects.select_related("policy", "policy__client").all()
    serializer_class = RenewalSerializer


class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.select_related("policy", "policy__client").all()
    serializer_class = InvoiceSerializer


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.select_related("client", "policy").all()
    serializer_class = DocumentSerializer


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (AllowAny,)
    authentication_classes: list = []

    def perform_create(self, serializer):
        serializer.save(source="web_form")


class DashboardAccessPermission(BasePermission):
    message = "Acceso restringido al dashboard"

    def has_permission(self, request, view):
        user = getattr(request, "user", None)
        return bool(user and user.is_authenticated and user.is_staff)


class DashboardMetricsView(APIView):
    permission_classes = (DashboardAccessPermission,)

    def get(self, request):
        today = timezone.now().date()
        next_30_days = today + timedelta(days=30)
        last_seven_days = timezone.now() - timedelta(days=7)

        summary = {
            "total_clients": Client.objects.count(),
            "total_policies": Policy.objects.count(),
            "active_policies": Policy.objects.filter(
                status=Policy.PolicyStatus.ACTIVE
            ).count(),
            "pending_policies": Policy.objects.filter(
                status=Policy.PolicyStatus.PENDING
            ).count(),
            "renewals_next_30_days": Policy.objects.filter(
                renewal_date__range=(today, next_30_days)
            ).count(),
            "manual_invoices": Invoice.objects.filter(is_manual=True).count(),
            "invoices_pending": Invoice.objects.exclude(
                status=Invoice.InvoiceStatus.PAID
            ).count(),
            "leads_last_7_days": Lead.objects.filter(
                created_at__gte=last_seven_days
            ).count(),
        }

        renewal_alert_qs = (
            Policy.objects.select_related("client", "product")
            .filter(renewal_date__range=(today, next_30_days))
            .order_by("renewal_date")[:5]
        )
        invoice_alert_qs = (
            Invoice.objects.select_related("policy", "policy__client")
            .filter(
                status__in=[
                    Invoice.InvoiceStatus.DRAFT,
                    Invoice.InvoiceStatus.PENDING,
                    Invoice.InvoiceStatus.OVERDUE,
                ]
            )
            .order_by("-issue_date")[:5]
        )
        lead_alert_qs = (
            Lead.objects.filter(created_at__gte=last_seven_days)
            .order_by("-created_at")[:5]
        )

        alerts = {
            "renewals": [
                {
                    "policy_number": policy.policy_number,
                    "client": str(policy.client),
                    "product": policy.product.name,
                    "renewal_date": policy.renewal_date.isoformat()
                    if policy.renewal_date
                    else None,
                    "status": policy.status,
                }
                for policy in renewal_alert_qs
            ],
            "invoices": [
                {
                    "invoice_number": invoice.invoice_number,
                    "policy_number": invoice.policy.policy_number,
                    "client": str(invoice.policy.client),
                    "status": invoice.status,
                    "amount": str(invoice.amount),
                    "due_date": invoice.due_date.isoformat()
                    if invoice.due_date
                    else None,
                    "is_manual": invoice.is_manual,
                }
                for invoice in invoice_alert_qs
            ],
            "leads": [
                {
                    "name": lead.name,
                    "insurance_type": lead.insurance_type,
                    "created_at": lead.created_at.isoformat(),
                    "phone": lead.phone,
                }
                for lead in lead_alert_qs
            ],
        }

        data = {"summary": summary, "alerts": alerts}
        return Response(data)


@method_decorator(csrf_exempt, name="dispatch")
class SessionLoginView(APIView):
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"detail": "Usuario y contraseña son requeridos."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if not user or not user.is_staff:
            return Response(
                {"detail": "Credenciales inválidas o usuario sin permisos."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        login(request, user)
        request.session.save()
        return Response(
            {
                "detail": "Autenticación exitosa.",
                "user": {"username": user.username, "email": user.email},
            }
        )


class SessionLogoutView(APIView):
    permission_classes = (DashboardAccessPermission,)

    def post(self, request):
        logout(request)
        return Response({"detail": "Sesión cerrada."})


class SessionStatusView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        user = getattr(request, "user", None)
        is_authenticated = bool(user and user.is_authenticated)
        data = {
            "authenticated": is_authenticated,
            "username": user.username if is_authenticated else None,
            "is_staff": bool(user and user.is_staff),
        }
        return Response(data)
