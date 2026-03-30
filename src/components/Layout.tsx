import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans">
        <Header />
        <main className="relative z-0">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
