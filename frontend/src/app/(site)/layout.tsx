import "@/shared/styles/globals.css";
import Footer from "@/components/ui/Footer/index";
import ScrollToTop from "@/components/ui/ScrollToTop/index";
import Header from "@/components/ui/Header/index";
import "@/shared/styles/index.css";
import "@/shared/styles/prism-vsc-dark-plus.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="theme-green">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
