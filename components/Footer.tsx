const Footer = () => (
  <footer
    className="lg:h-auto sm:h-40 h-30 max-w-screen-xl xl:mx-auto mx-5 rounded-[12px] px-5 lg:pt-3 pt-0 pb-3 flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-center sticky bottom-5 border-t-4  transition-all ease-in-out duration-150"
    style={{
      backgroundColor: "var(--foreground)", // Inverted color
      color: "var(--background)", // Inverted text color
      borderColor: "var(--background)", // Inverted border color
    }}
  >
    <div className="text-center lg:text-left">
      <p className="font-cal text-lg sm:text-xl">
        © Profe Web 2025
      </p>
    </div>
  </footer>
);

export default Footer;
