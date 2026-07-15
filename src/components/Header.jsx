import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Nos Offres de Services", href: "/#offres-services" },
  { label: "Publications", href: "/#publications" },
];

const Header = ({ className = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onLinkClick = useCallback(() => {
    window.open(
      "mailto:contact@iecameroun.cm",
    );
  }, []);

  return (
    <header
      className={`relative w-full bg-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero ${className}`}
    >
      <div className="max-w-[1440px] bg-[#ffffff] mx-[80px] px-6 sm:px-10 lg:px-[50px] pt-6 pb-10 sm:pt-8 sm:pb-16 lg:pt-[41px] lg:pb-[82px]"
           id="accueil">
        <nav className="flex items-center justify-between gap-0 top-0 z-[99] text-[#4c4034] font-[Poppins] py-3">
          <h2 className="m-0 text-lg sm:text-xl lg:text-[20px] font-semibold shrink-0">
            Intelligence Economique | IE237
          </h2>

          <button
            className="lg:hidden border-none bg-transparent cursor-pointer text-[#4c4034] text-xl leading-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>

          <div className="hidden lg:flex items-center gap-1 xl:gap-[75px] text-xl sm:text-[12px] lg:text-[14px] lg:gap-6 lg:font-black text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black">
            {navItems.map((item) => {
              const isAnchor = item.href.includes("#");

              if (isAnchor) {
                return (
                    <HashLink
                        key={item.href}
                        to={item.href}
                        smooth
                        className="no-underline"
                    >
                      <h3 className="m-0 font-normal transition-colors hover:text-[#a98047]">
                        {item.label}
                      </h3>
                    </HashLink>
                );
              }

              return (
                  <NavLink key={item.href} to={item.href} end className="no-underline">
                    {({ isActive }) => (
                        <h3
                            className={`m-0 font-normal transition-colors ${
                                isActive ? "text-[#a98047]" : "hover:text-[#a98047]"
                            }`}
                        >
                          {item.label}
                        </h3>
                    )}
                  </NavLink>
              );
            })}
          </div>

          <button
            className="hidden lg:flex lg:h-9 cursor-pointer border-none py-3 px-5 bg-[#4c4034] rounded-[10px] items-center gap-2 shrink-0"
            onClick={onLinkClick}
          >
            <span className="text-[12px] leading-6 font-[Poppins] text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero">
              Contactez-nous
            </span>
            <img className="h-6 w-6" alt="" src="/arrow-right-02-round.svg" />
          </button>
        </nav>

        {menuOpen && (
          <div className="lg:hidden flex flex-col gap-4 py-4 text-xl text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black">
            {navItems.map((item) => (
              <h3 key={item} className="m-0 font-normal">
                {item}
              </h3>
            ))}
            <button
              className="cursor-pointer border-none py-3 px-5 bg-[#4c4034] rounded-[10px] flex items-center justify-center gap-2 w-fit"
              onClick={onLinkClick}
            >
              <span className="text-[12px] leading-6 font-[Poppins] text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero">
                Contactez-nous
              </span>
            </button>
          </div>
        )}
        <img
            className="left-0 w-[517px] absolute opacity-50 top-0"
            alt=""
            src="/Ellipse-737.svg"
        />
        <section className="flex flex-col items-start gap-4 py-12 sm:py-16 lg:py-[100px] text-left text-xl text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero font-[Poppins]">
            <style>{`
              @keyframes highlightSweep {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
              }
              .highlight-mark {
                animation: highlightSweep 0.7s ease-out forwards;
                transform-origin: left center;
              }
            `}</style>

            <div className="h-[39px] rounded-[42px] bg-[#a98047] flex items-center justify-center px-5">
              <h3 className="m-0 font-medium text-sm sm:text-base">IE237</h3>
            </div>

            <br/>
            <h2 className="m-0 max-w-[560px] text-2xl sm:text-3xl lg:text-4xl leading-tight text-natural-black">
              <b>{`Un `}</b>
              <span className="relative inline-block">
                <span
                    className="highlight-mark absolute z-0 left-[-6px] right-[-6px] bottom-[6%] top-[45%] bg-[#f3d17e] rounded-sm"
                    style={{ animationDelay: "0.4s" }}
                />
                <span className="relative font-medium text-[#4c4034]">
                  Think Do tank
                </span>
              </span>
              <br />
                <span className="relative inline-block">
                  <span
                      className="highlight-mark absolute z-0 left-[-6px] right-[-6px] bottom-[6%] top-[45%] bg-[#f3d17e] rounded-sm"
                      style={{ animationDelay: "0.9s" }}
                  />
                  <span className="relative text-[#4c4034] font-medium">républicain{" "}</span>
                </span>{" "}
              <b>
                au service
                <br/>
                d'une souveraineté Camerounaise durable
              </b>
            </h2>
            <br/>
            <br/>
            <br/>
            <div className="w-full flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[#000000] gap-8 sm:gap-0 relative lg:top-10 text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black">
              <div className="flex flex-col gap-1.5 pb-8 sm:pb-0 sm:pr-14">
                <h2 className="m-0 lg:text-lg sm:text-xs font-bold">
                  Notre Siège
                </h2>
                <div className="text-base text-[#8b8a8f]">
                  Bastos - Yaoundé, Cameroun
                </div>
              </div>
              <div className="flex flex-col gap-1.5 sm:pl-14">
                <h2 className="m-0 lg:text-lg sm:text-xs font-bold">
                  Notre Socle
                </h2>
                <div className="text-base text-[#8b8a8f]">
                  Veille - Influence - Protection
                </div>
              </div>
            </div>
        </section>
      </div>
      <img
        className="lg:absolute sm:relative right-0 my-10 lg:top-16 lg:w-120 max-w-[1325px] z-0 h-auto object-contain mx-auto block px-6"
        alt=""
        src="/Image.png"
      />
    </header>
  );
};
<img
    className="relative w-full h-auto block align-middle"
/>
Header.propTypes = {
  className: PropTypes.string,
};

export default Header;
