import PropTypes from "prop-types";
const ServiceCard = ({ className = "", icon, title, options }) => {
  return (
    <div
      className={`h-full min-w-0 rounded-[15px] bg-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-nero border border-[#e7e7e7] box-border flex flex-col items-start gap-2 p-6 text-left text-milestone-webflow-html-website-template-webflow-io-1440x761-default-1-black font-[Manrope] ${className}`}
    >
      <div className="h-10 w-10 rounded-[5px] bg-[#ececec] flex items-center justify-center mb-2 shrink-0">
        <img className="h-6 w-6" loading="lazy" alt="" src={icon} />
      </div>
      <b className="w-full whitespace-pre-line tracking-[-0.02em] leading-7 text-base sm:text-lg">
        {title}
      </b>
      <div className="text-xs tracking-[-0.02em] leading-[30px] font-medium text-[#757095]">
        {options}
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  options: PropTypes.string,
};

export default ServiceCard;
