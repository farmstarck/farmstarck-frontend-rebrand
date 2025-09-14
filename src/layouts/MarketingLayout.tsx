import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

const MarketingLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
