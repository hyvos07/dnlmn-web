import exps from "../../json/exp.json";
import Timeline from "./components/Timeline";

export default function ExperienceContent() {
    const experiences: Experience[] = exps;

    return (
        <div id="exp" className="mt-16 py-16 md:px-8">
            <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-12 md:mb-20 xl:mb-[90px] text-center">My Experiences</h2>
                <div className="w-full">
                    <Timeline experiences={experiences} />
                    <p className="font-semibold text-center max-md:text-sm text-lg mt-16 md:mt-28">
                        More informations can be found on my &nbsp;
                        <a
                            href="https://www.linkedin.com/in/danielliman/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#54b4e2] relative inline-block group"
                        >
                            LinkedIn
                            <span className="absolute left-0 bottom-0 h-[1px] bg-[#54b4e2] w-0 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        &nbsp; profile.
                    </p>
                </div>
            </div>
        </div>
    );
}