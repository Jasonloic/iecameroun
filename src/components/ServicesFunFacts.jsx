import PropTypes from "prop-types";

const stats = [
  { value: "+18000", label: "Personnes touchées" },
  { value: "+30", label: "Notes d'analyse,\nde veille économique" },
  { value: "+2", label: "Logiciels d'intelligence économique" },
];
const logosRow1 = [
  "/logo_cavie_transparent.png.webp",
  "/IRIC_Yaoundé_Logo.png",
  "/CRTV_logo_2017.png",
  "/logo-univ-dschang.png",
  "/logo-univ-dschang.png",
];

const logosRow2 = [
  "/logo-univ-dschang.png",
  "/logo-univ-dschang.png",
  "/CRTV_logo_2017.png",
  "/IRIC_Yaoundé_Logo.png",
  "/logo_cavie_transparent.png.webp",
];

const ServicesFunFacts = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full bg-[url('/Frame@3x.png')] bg-cover bg-center py-16 md:py-20 px-6 sm:px-10 lg:px-[113px] text-left font-[Poppins] ${className}`}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="flex flex-col gap-3 max-w-[420px]">
          <h1 className="m-0 text-[22px] sm:text-[20px] lg:text-[36px] tracking-[-0.02em] leading-[1.1] font-bold text-natural-black">
            Notre Impact
          </h1>
          <span className="w-12 h-[3px] bg-[#a98047] rounded-full" />
          <div className="lg:text-[16px] sm:text-2xl tracking-[-0.03em] leading-[160%] text-natural-black">
            <b>Une intelligence économique </b>
            <span>Camerounaise solide.</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-12 text-natural-black">
          {stats.map((s) => (
            <div key={s.value + s.label} className="flex flex-col gap-2 min-w-[150px] ">
              <h2 className="m-0 text-2xl sm:text-3xl lg:text-[20px] tracking-[-0.02em] leading-tight font-medium">
                {s.value}
              </h2>
              <div className="lg:text-[12px] text-sm sm:text-base tracking-[-0.02em] leading-tight whitespace-pre-line">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <h3 className="m-8 sm:text-[20px] lg:text-[26px] lg:mx-90 relative top-26 lg:w-full tracking-[-0.02em] leading-[1.1] font-bold text-natural-black">
        Ils nous font confiance
      </h3>
      <br/>
      <div className="w-full mt-20 overflow-hidden flex flex-col gap-8">
        <div className="flex overflow-hidden">
          <div className="flex gap-12 animate-scroll-left shrink-0">
            {[...logosRow1, ...logosRow1].map((logo, i) => (
                <img
                    key={`row1-${i}`}
                    className="h-10 sm:h-12 lg:h-14 w-auto object-contain shrink-0"
                    loading="lazy"
                    alt=""
                    src={logo}
                />
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-12 animate-scroll-right shrink-0">
            {[...logosRow2, ...logosRow2].map((logo, i) => (
                <img
                    key={`row2-${i}`}
                    className="h-10 sm:h-12 lg:h-14 w-auto object-contain shrink-0"
                    loading="lazy"
                    alt=""
                    src={logo}
                />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

ServicesFunFacts.propTypes = {
  className: PropTypes.string,
};

export default ServicesFunFacts;
