import Greetings from "./components/Greetings";
import OpenToProject from "./components/OpenToProject";
import Social from "./components/Social";

export default function HomeContent() {
    return (
        <div id="home" className="min-h-screen flex lg:flex-row flex-col-reverse gap-16 items-center justify-center lg:justify-between w-full">
            <div className="flex flex-col gap-6 lg:gap-7 justify-center items-start">
                <Greetings />
                <div className="flex flex-col gap-3 lg:gap-5">
                    <p className="text-xl lg:text-4xl font-semibold">
                        I'm Daniel Liman.
                    </p>
                    <p className="lg:text-lg leading-relaxed">
                        A <span className="font-bold"> Software Engineer </span>based in Jakarta, Indonesia.
                        <br className="md:block hidden" />
                        Focusing on building <span className="font-bold">web applications</span> and <span className="font-bold">mobile apps</span>.
                    </p>
                </div>
                <Social />
            </div>
            <div className="items-center justify-center">
                <img 
                    src="images/daniel-liman.jpg"
                    alt="Profile Picture"
                    className="rounded-full lg:max-w-80 max-w-72"
                    draggable="false"
                />
            </div>
        </div>
    );
}