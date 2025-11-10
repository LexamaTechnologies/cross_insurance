from rest_framework import serializers

from .models import (
    Client,
    Document,
    InsuranceProduct,
    Invoice,
    Lead,
    Policy,
    Renewal,
)


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_primary",
            "phone_secondary",
            "document_id",
            "address_line1",
            "address_line2",
            "city",
            "state",
            "postal_code",
            "country",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class InsuranceProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = InsuranceProduct
        fields = [
            "id",
            "name",
            "category",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class PolicySerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    product = serializers.PrimaryKeyRelatedField(queryset=InsuranceProduct.objects.all())
    client_detail = ClientSerializer(source="client", read_only=True)
    product_detail = InsuranceProductSerializer(source="product", read_only=True)

    class Meta:
        model = Policy
        fields = [
            "id",
            "policy_number",
            "client",
            "client_detail",
            "product",
            "product_detail",
            "status",
            "start_date",
            "end_date",
            "renewal_date",
            "premium_amount",
            "coverage_summary",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class RenewalSerializer(serializers.ModelSerializer):
    policy = serializers.PrimaryKeyRelatedField(queryset=Policy.objects.all())
    policy_detail = PolicySerializer(source="policy", read_only=True)

    class Meta:
        model = Renewal
        fields = [
            "id",
            "policy",
            "policy_detail",
            "renewal_date",
            "status",
            "notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class InvoiceSerializer(serializers.ModelSerializer):
    policy = serializers.PrimaryKeyRelatedField(queryset=Policy.objects.all())

    class Meta:
        model = Invoice
        fields = [
            "id",
            "policy",
            "invoice_number",
            "issue_date",
            "due_date",
            "amount",
            "currency",
            "is_manual",
            "status",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class DocumentSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    policy = serializers.PrimaryKeyRelatedField(
        queryset=Policy.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Document
        fields = [
            "id",
            "client",
            "policy",
            "document_type",
            "title",
            "description",
            "file",
            "is_shared_with_client",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["created_at", "updated_at"]


class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = [
            "id",
            "name",
            "phone",
            "email",
            "insurance_type",
            "notes",
            "attachment",
            "source",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["source", "created_at", "updated_at"]
