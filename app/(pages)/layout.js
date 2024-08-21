import "../globals.css";
import Sidebar from "../_components/Sidebar";
import Footer from "../_components/Footer";

export const metadata = {
  title: "Dashboard | Indramed",
  description: "",
};

export default function PagesLayout({ children }) {
  return (
    <div className="pages-layout">
      <main className="h-screen w-screen flex-col">
        <div className="flex h-[93vh] relative justify-between">
          {/* sidebar */}
          <div className="absolute h-full bg-white z-30">
            <Sidebar />
          </div>
          {/* sidebar gap  */}
          <div className="w-[5vw]"></div>
          {/* main content */}
          <div className="w-[95vw]">
            {children}
          </div>
        </div>
        {/* footer */}
        <div className="h-[7vh]">
          <Footer />
        </div>
      </main>
    </div>
  );
}