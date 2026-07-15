import PropTypes from "prop-types";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/#a-propos" },
  { label: "Nos Offres de Services", href: "/#offres-services" },
  { label: "Publications", href: "/publications" },
];

const Footer = ({ className = "" }) => {
  const onLinkClick = useCallback(() => {
    window.open("mailto:contact@iecameroun.cm");
  }, []);

  return (
      <footer
          className={`relative w-full bg-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero py-16 sm:py-24 lg:py-[137px] px-6 sm:px-10 lg:px-[30px] text-left font-[Outfit] ${className}`}
      >
        <div className="max-w-[1336px] lg:mx-auto flex flex-col items-center gap-10">
          <div className="w-full max-w-[914px] rounded-[10px] bg-[#4c4034] flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-8">
            <h2 className="m-0 text-xl sm:text-2xl lg:text-[32px] leading-tight font-bold text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero text-center sm:text-left">
              Une question stratégique ?
            </h2>
            <button
                className="cursor-pointer border-none py-3 px-5 bg-[#a98047] rounded-[10px] shrink-0"
                onClick={onLinkClick}
            >
              <b className="text-base leading-7 font-['Plus_Jakarta_Sans'] text-[#4c4034]">
                Contactez-nous !
              </b>
            </button>
          </div>

          <div className="w-full flex flex-col gap-6 py-6 text-left text-xl text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black font-[Poppins]">
            <div className="w-full flex flex-wrap items-center justify-center sm:justify-between gap-6">
              <img
                  className="h-[80px] w-auto sm:h-[108px] object-cover shrink-0"
                  loading="lazy"
                  alt=""
                  src="/logo-ie237.svg"
              />
              <div className="hidden lg:flex items-center gap-1 xl:gap-[75px] text-xl sm:text-[12px] lg:text-[12px] lg:gap-6 text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black">
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
                      <Link key={item.href} to={item.href} className="no-underline">
                        <h3 className="m-0 font-normal transition-colors hover:text-[#a98047]">
                          {item.label}
                        </h3>
                      </Link>
                  );
                })}
              </div>
              <img
                  className="h-[16px] w-auto sm:h-[19px] object-cover"
                  loading="lazy"
                  alt=""
                  src="/Social@2x.png"
              />
            </div>

            <div className="w-full flex flex-col items-center gap-6 text-sm text-gray-600 font-[Inter]">
              <div className="w-full h-px border-t border-solid opacity-[0.08]" />
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="leading-[26px] text-center sm:text-left">
                  © Copyright 2026, Tous Droits Réservés
                </div>
                <div className="leading-[26px] whitespace-pre-wrap text-center sm:text-right">
                  IE237 Pour la puissance Camerounaise...
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;