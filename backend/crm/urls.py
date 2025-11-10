from django.urls import path
from rest_framework import routers

from .views import (
    ClientViewSet,
    DashboardMetricsView,
    DocumentViewSet,
    InsuranceProductViewSet,
    InvoiceViewSet,
    LeadViewSet,
    PolicyViewSet,
    RenewalViewSet,
    SessionLoginView,
    SessionLogoutView,
    SessionStatusView,
)

router = routers.DefaultRouter()
router.register(r"clients", ClientViewSet)
router.register(r"products", InsuranceProductViewSet)
router.register(r"policies", PolicyViewSet, basename="policy")
router.register(r"renewals", RenewalViewSet)
router.register(r"invoices", InvoiceViewSet)
router.register(r"documents", DocumentViewSet)
router.register(r"leads", LeadViewSet)

urlpatterns = router.urls + [
    path("dashboard/metrics/", DashboardMetricsView.as_view(), name="dashboard-metrics"),
    path("auth/login/", SessionLoginView.as_view(), name="session-login"),
    path("auth/logout/", SessionLogoutView.as_view(), name="session-logout"),
    path("auth/session/", SessionStatusView.as_view(), name="session-status"),
]
