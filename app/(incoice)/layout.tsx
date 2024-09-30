import SidePanelLayout from "@/lib/components/side-panel/side-panel-layout";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidePanelLayout>{children}</SidePanelLayout>;
}
