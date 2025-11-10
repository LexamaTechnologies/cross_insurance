import { Metadata } from "next";

import { DashboardClient } from "./DashboardClient";

export const metadata: Metadata = {
  title: "Dashboard | Cross Insurance",
  description:
    "Métricas clave del CRM: clientes, pólizas, renovaciones, facturas y leads recientes.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
