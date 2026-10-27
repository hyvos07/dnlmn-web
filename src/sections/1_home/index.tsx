import Greetings from "./components/Greetings";
import Social from "./components/Social";
import HeroBackground from "./components/HeroBackground";

export default function HomeContent() {
  return (
    <div id="home" className="isolate mb-8 min-h-[calc(100vh+60px)] max-lg:py-16 sm:max-lg:py-20 flex lg:flex-row flex-col-reverse gap-8 lg:gap-10 items-center justify-center lg:justify-between w-screen max-w-none relative overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 flex w-full min-w-0 flex-col gap-5 lg:gap-7 justify-center items-start px-12 sm:px-16 md:px-24 lg:px-44 -mt-[60px]">
        <Greetings />
        <div className="flex min-w-0 flex-col gap-3 lg:gap-5">
          <h1 className="text-lg sm:text-xl lg:text-4xl font-semibold">
            {"I'm Daniel Liman."}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-[34rem] break-words">
            A <span className="font-bold"> Software Engineer </span>based in Jakarta, Indonesia. &nbsp;
            <br className="md:block hidden" />
            Focusing on building <span className="font-bold">web applications</span> and <span className="font-bold">mobile apps</span>.
          </p>
        </div>
        <Social />
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 w-screen min-w-[1440px] -translate-x-1/2 pointer-events-none">
        <svg viewBox="0 0 1440 106.66666666666666" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L80,85.3C160,75,320,53,480,58.7C640,64,800,96,960,101.3C1120,107,1280,85,1360,74.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" fillOpacity="1" fill="#070707"/>
        </svg>
      </div>
    </div>
  );
}
