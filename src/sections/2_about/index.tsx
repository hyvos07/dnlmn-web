import AboutBox from "./component/AboutBox";
import InterestItem from "./component/Interests";
import UnivButton from "./component/UnivButton";
import ProjectButton from "./component/ProjectButton";
import Spotify from "./component/Spotify";
import Image from 'next/image';

import { Smartphone, PanelsTopLeft, HardDrive, GraduationCap, Telescope, Layers, Gamepad2, Joystick, Database } from 'lucide-react';
import TechSlider from "./component/Slider";
import techStackData from '../../../public/tech.json';

export default function AboutContent() {
    const nyerahTailwind = "max-w-[275px] sm:max-w-sm md:max-w-md lg:max-w-2xl";
    const _sliderItems = techStackData;

    return (
        <div id="about" className="min-h-screen py-12 flex flex-col gap-6">
            <div className="flex flex-col text-center gap-4">
                <p className="text-2xl lg:text-3xl font-semibold max-lg:mb-4 mb-8">About Me</p>
                <div className="flex justify-between lg:items-stretch md:items-center gap-8 max-lg:flex-col lg:mb-6">
                    <img
                        src="images/jakun.jpg"
                        alt="Profile Picture"
                        className="rounded-xl w-80 max-lg:hidden"
                        draggable="false"
                    />
                    <div className="flex flex-col justify-between gap-4 w-full lg:w-[360px]">
                        <Spotify />
                        <AboutBox
                            icon={<GraduationCap size={20} />}
                            title='Education'
                            children={<UnivButton />}
                        />
                        <ProjectButton />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <AboutBox icon={<Telescope size={20} />} title='Interest' children={
                        <div className="grid grid-cols-2 max-lg:grid-cols-1 lg:gap-0 gap-8 px-3 pb-2 max-md:mt-2">
                            <div className="flex flex-col gap-8">
                                <InterestItem
                                    icon={<Smartphone size={28} />}
                                    title="Mobile Development"
                                    desc={"Flutter, Dart, Android Studio"}
                                />
                                <InterestItem
                                    icon={<HardDrive size={28} />}
                                    title="Backend System"
                                    desc={"Django, SpringBoot, Firebase"}
                                />
                                <InterestItem
                                    icon={<PanelsTopLeft size={28} />}
                                    title={"Web Development"}
                                    desc={"Next.js, TailwindCSS, TypeScript"}
                                />
                            </div>
                            <div className="flex flex-col gap-8">
                                <InterestItem
                                    icon={<Joystick size={28} />}
                                    title={"Game Development"}
                                    desc={"Unity Engine, C#"}
                                />
                                <InterestItem
                                    icon={<Database size={28} />}
                                    title="Database"
                                    desc={"PostgreSQL"}
                                />
                                <InterestItem
                                    icon={<Gamepad2 size={28} />}
                                    title="Gaming"
                                    desc={"Genshin Impact, Minecraft, eFootball"}
                                />
                            </div>
                        </div>
                    } />
                    <AboutBox icon={<Layers size={20} />} title='Tech Stack'
                        children={
                            <div className="flex flex-col gap-6 items-center justify-center mt-1 mb-3">
                                <div className={"overflow-hidden py-2 px-5 relative " + nyerahTailwind}>
                                    <TechSlider items={_sliderItems} />
                                    <div className="absolute left-3 top-0 bottom-0 w-12 bg-gradient-to-r from-[#04060f] to-transparent z-10"></div>
                                    <div className="absolute right-3 top-0 bottom-0 w-12 bg-gradient-to-l from-[#04060f] to-transparent z-10"></div>
                                </div>
                                <p className="text-sm text-center"> ... and many more! </p>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}