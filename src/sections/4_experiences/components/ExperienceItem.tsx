export default function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
    return (
        <div key={index} className="group md:max-w-2xl rounded-lg p-6 md:p-8 bg-gray-900 hover:scale-105 transition-transform duration-200 z-[999]">
            <div className="flex flex-col items-start">
                <div className="flex items-center mb-4">
                    <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="flex-shrink-0 md:w-12 md:h-12 w-11 h-11 bg-gray-200 rounded-xl flex items-center justify-center text-xl">
                            <img
                                src={exp.logo}
                                alt={exp.company}
                                className="object-cover w-full h-full rounded-xl"
                                draggable="false"
                            />
                        </div>
                    </a>
                    <div className="ml-5 md:ml-4">
                        <h3 className="text-sm md:text-lg text-[#54b4e2] font-bold max-md:mb-0.5 md:-mb-[1px]">{exp.position}</h3>
                        <p className="">
                            <a
                                href={exp.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs md:text-sm relative inline-block"
                            >
                                {exp.company}
                                <span className="absolute left-0 bottom-0 h-[1px] bg-white w-0 group-hover:w-full transition-all duration-300"></span>
                            </a>
                            <span className="max-md:hidden">
                                &nbsp; · &nbsp;
                            </span>
                            <br className="md:hidden" />
                            <span className="text-xs text-gray-400">{exp.period}</span>
                        </p>
                    </div>
                </div>
                <p className="max-md:text-xs text-sm text-gray-300 pr-4">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="max-md:text-xs text-sm text-gray-300 md:space-y-1.5 space-y-1 pl-2 mt-2 md:mt-3">
                        {exp.achievements.map((achievement, index) => (
                            <li key={index} className="flex">
                                <span className="mr-2.5">•</span>
                                <span className="-mb-0.5">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}