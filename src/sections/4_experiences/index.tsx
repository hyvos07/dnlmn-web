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
                </div>
            </div>
        </div>
    );
}