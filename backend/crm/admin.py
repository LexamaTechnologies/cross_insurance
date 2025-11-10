from django.contrib import admin

from .models import Client, Document, InsuranceProduct, Invoice, Lead, Policy, Renewal


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "phone_primary", "created_at")
    search_fields = (
        "first_name",
        "last_name",
        "email",
        "phone_primary",
        "document_id",
    )
    list_filter = ("created_at",)


@admin.register(InsuranceProduct)
class InsuranceProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "is_active", "updated_at")
    list_filter = ("category", "is_active")
    search_fields = ("name",)


@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = (
        "policy_number",
        "client",
        "product",
        "status",
        "start_date",
        "renewal_date",
    )
    search_fields = ("policy_number", "client__first_name", "client__last_name")
    list_filter = ("status", "product__category")


@admin.register(Renewal)
class RenewalAdmin(admin.ModelAdmin):
    list_display = ("policy", "renewal_date", "status", "updated_at")
    list_filter = ("status", "renewal_date")
    search_fields = ("policy__policy_number",)


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = (
        "invoice_number",
        "policy",
        "amount",
        "status",
        "issue_date",
        "is_manual",
    )
    list_filter = ("status", "is_manual")
    search_fields = ("invoice_number", "policy__policy_number")


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "client",
        "policy",
        "document_type",
        "is_shared_with_client",
        "updated_at",
    )
    list_filter = ("document_type", "is_shared_with_client")
    search_fields = ("title", "client__first_name", "client__last_name")


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "insurance_type", "phone", "email", "created_at", "source")
    list_filter = ("insurance_type", "source", "created_at")
    search_fields = ("name", "phone", "email")
