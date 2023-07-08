import React from "react";
import MetaInfoContainer from "../containers/MetaInfoContainer";
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Footer/Footer";
import { useState } from "react";

const About = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  return (
    <>
      <MetaInfoContainer pageName="About" />
      <div className="flex min-h-screen">
        <Sidebar onCloseSidebar={() => setIsSidebarActive(false)} isSidebarActive={isSidebarActive} />
        <div className="flex-grow"></div>
      </div>
      <Footer />
    </>
  );
};

export default About;
