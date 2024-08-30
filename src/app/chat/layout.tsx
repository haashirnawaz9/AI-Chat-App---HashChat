import { ClerkLoaded } from "@clerk/nextjs";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkLoaded>
      <div className="flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <div className="-mt-14">
        <Footer />
        </div>
      </div>
    </ClerkLoaded>
  );
}

export default DashboardLayout;
