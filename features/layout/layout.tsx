import Sidebar from "@/features/layout/sidebar";
import Appbar from "@/features/layout/appbar";
import Content from "@/features/layout/content";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Appbar />
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}

export default Layout;
