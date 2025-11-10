export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api",
  quoteEndpoint:
    process.env.NEXT_PUBLIC_QUOTE_ENDPOINT ?? "http://127.0.0.1:8000/api/leads/",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+17876000000",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+1 (787) 600-0000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "contacto@crossinsurance.com",
};
