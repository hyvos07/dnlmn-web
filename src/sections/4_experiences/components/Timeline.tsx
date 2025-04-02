import ExperienceItem from './ExperienceItem';

export default function Timeline({ experiences }: { experiences: Experience[] }) {
    return (
        <div className="mx-auto relative">
            {/* Line for md to lg screens */}
            <div className="hidden md:block xl:hidden absolute left-0 top-0 bottom-0 w-1 bg-[#54b4e2] -mt-4 -mb-4 rounded-lg" />

            {/* Line for xl screens */}
            <div className="hidden xl:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#54b4e2] transform -translate-x-1/2 -mt-6 -mb-6 rounded-lg" />

            {experiences.map((exp, index) => (
                <div key={index} className="relative">
                    {/* Line for sm and below screens */}
                    {index > 0 && index < experiences.length && (
                        <div className="md:hidden mx-auto w-[2px] h-12 bg-[#54b4e2]/75 -z-10 relative" />
                    )}

                    <div className={`xl:grid xl:grid-cols-2 md:flex md:flex-row flex items-center
                            ${index % 2 === 0 ? '' : 'xl:flex-row-reverse'} 
                            md:justify-end max-md:justify-center md:mb-10`
                    }>

                        {/* Bullet point for md to lg*/}
                        <div className="hidden md:block xl:hidden absolute left-0 w-5 h-5 rounded-full bg-[#54b4e2] ml-0.5 transform -translate-x-1/2 z-10" />

                        {/* Bullet point for xl screen */}
                        <div className="hidden xl:block absolute left-1/2 w-5 h-5 rounded-full bg-[#54b4e2] transform -translate-x-1/2 z-10" />

                        <div className={`
                            ${index % 2 === 0 ? 'xl:col-start-1 xl:pl-12' : 'xl:col-start-2 xl:pl-12'} 
                            md:w-[90%] md:max-w-xl xl:max-w-none max-md:w-full
                        `}>
                            <ExperienceItem exp={exp} index={index} />
                        </div>

                        {/* Spacing for grid */}
                        <div className="xl:block hidden" />
                    </div>
                </div>
            ))}
        </div>
    );
}