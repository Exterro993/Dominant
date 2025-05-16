import "./App.css";
import React, { useEffect, useState } from "react";
import Nav from "./userPages/navBar/Nav";
import { MakeNavbarRoute, MakeRoute } from "./routes/Router";
import Footer from "./userPages/footer/Footer";
import anime from "animejs";
import { useLocation } from "react-router";
import { RotateLoader } from "react-spinners";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeoutLoader = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const timeoutAnime = setTimeout(() => {
      const sections = document.querySelectorAll("section");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anime({
                targets: entry.target,
                opacity: 1,
                translateY: 0,
                duration: 600,
                easing: "easeOutExpo",
              });
            } else {
              anime({
                targets: entry.target,
                opacity: 0,
                translateY: 50,
                duration: 600,
                easing: "easeInExpo",
              });
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((section) => observer.observe(section));

      return () => observer.disconnect();
    }, 100);

    return () => {
      clearTimeout(timeoutLoader);
      clearTimeout(timeoutAnime);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Лоадер поверх контента */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-white bg-opacity-80 flex justify-center items-center">
          <RotateLoader color="#014DF5" />
        </div>
      )}

      <Nav>
        <ul className="hidden lg:flex mt-5 mx-auto max-w-[1000px] justify-center items-center gap-10 text-xl border-b-2 border-b-gray-300 border-dashed">
          {MakeNavbarRoute()}
        </ul>
      </Nav>

      {MakeRoute()}
      <Footer />
    </>
  );
}

export default App;
