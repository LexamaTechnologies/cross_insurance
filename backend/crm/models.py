from django.db import models


class TimeStampedModel(models.Model):
    """Reusable base model to track creation and update times."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Client(TimeStampedModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    phone_primary = models.CharField(max_length=30, blank=True)
    phone_secondary = models.CharField(max_length=30, blank=True)
    document_id = models.CharField(max_length=100, blank=True)
    address_line1 = models.CharField(max_length=255, blank=True)
    address_line2 = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["last_name", "first_name"]

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}".strip()


class InsuranceProduct(TimeStampedModel):
    class ProductCategory(models.TextChoices):
        AUTO = "auto", "Autos"
        LIFE = "life", "Vida"
        PROPERTY = "property", "Propiedad"
        COMMERCIAL = "commercial", "Comerciales"
        ANNUITY = "annuity", "Anualidades"
        OTHER = "other", "Otros"

    name = models.CharField(max_length=150)
    category = models.CharField(
        max_length=20,
        choices=ProductCategory.choices,
        default=ProductCategory.OTHER,
    )
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self) -> str:
        return self.name


class Policy(TimeStampedModel):
    class PolicyStatus(models.TextChoices):
        ACTIVE = "active", "Activa"
        PENDING = "pending", "Pendiente"
        LAPSED = "lapsed", "Vencida"
        CANCELLED = "cancelled", "Cancelada"
        EXPIRED = "expired", "Expirada"

    policy_number = models.CharField(max_length=64, unique=True)
    client = models.ForeignKey(Client, related_name="policies", on_delete=models.CASCADE)
    product = models.ForeignKey(
        InsuranceProduct, related_name="policies", on_delete=models.PROTECT
    )
    status = models.CharField(
        max_length=20, choices=PolicyStatus.choices, default=PolicyStatus.PENDING
    )
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    renewal_date = models.DateField(null=True, blank=True)
    premium_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    coverage_summary = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.policy_number} - {self.client}"


class Renewal(TimeStampedModel):
    class RenewalStatus(models.TextChoices):
        DRAFT = "draft", "Borrador"
        SCHEDULED = "scheduled", "Programada"
        SENT = "sent", "Enviada"
        COMPLETED = "completed", "Completada"
        CANCELLED = "cancelled", "Cancelada"

    policy = models.ForeignKey(Policy, related_name="renewals", on_delete=models.CASCADE)
    renewal_date = models.DateField()
    status = models.CharField(
        max_length=20, choices=RenewalStatus.choices, default=RenewalStatus.DRAFT
    )
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ["-renewal_date"]

    def __str__(self) -> str:
        return f"Renewal for {self.policy.policy_number} on {self.renewal_date}"


class Invoice(TimeStampedModel):
    class InvoiceStatus(models.TextChoices):
        DRAFT = "draft", "Borrador"
        PENDING = "pending", "Pendiente"
        PAID = "paid", "Pagada"
        OVERDUE = "overdue", "Atrasada"
        CANCELLED = "cancelled", "Cancelada"

    policy = models.ForeignKey(Policy, related_name="invoices", on_delete=models.CASCADE)
    invoice_number = models.CharField(max_length=64, unique=True)
    issue_date = models.DateField()
    due_date = models.DateField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    is_manual = models.BooleanField(default=False)
    status = models.CharField(
        max_length=20, choices=InvoiceStatus.choices, default=InvoiceStatus.DRAFT
    )
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["-issue_date"]

    def __str__(self) -> str:
        return f"Invoice {self.invoice_number} ({self.status})"


class Document(TimeStampedModel):
    class DocumentType(models.TextChoices):
        LICENSE = "license", "Licencia"
        ID = "id", "Identificación"
        POLICY = "policy", "Póliza"
        CLAIM = "claim", "Reclamo"
        OTHER = "other", "Otro"

    client = models.ForeignKey(Client, related_name="documents", on_delete=models.CASCADE)
    policy = models.ForeignKey(
        Policy,
        related_name="documents",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    document_type = models.CharField(
        max_length=20, choices=DocumentType.choices, default=DocumentType.OTHER
    )
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to="documents/")
    is_shared_with_client = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.title


class Lead(TimeStampedModel):
    class InsuranceType(models.TextChoices):
        AUTO = "Autos", "Autos"
        LIFE = "Vida", "Vida"
        PROPERTY = "Propiedad", "Propiedad"
        COMMERCIAL = "Comerciales", "Comerciales"
        ANNUITY = "Anualidades", "Anualidades"
        OTHER = "Otro", "Otro"

    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=40)
    email = models.EmailField()
    insurance_type = models.CharField(
        max_length=40, choices=InsuranceType.choices, default=InsuranceType.AUTO
    )
    notes = models.TextField(blank=True)
    attachment = models.FileField(upload_to="leads/", blank=True, null=True)
    source = models.CharField(max_length=100, default="web_form")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.insurance_type})"
