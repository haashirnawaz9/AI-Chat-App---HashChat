import { ClerkLoaded } from "@clerk/nextjs";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
