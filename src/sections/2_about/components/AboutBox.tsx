export default function AboutBox({ icon, title, children }: AboutBoxProps) {
    return (
        <div className="flex flex-col rounded-xl gap-5 px-6 pb-6 pt-5 border border-zinc-700 hover:border-zinc-600 transition duration-200">
            <div className="flex justify-between items-center">
                <p className='font-bold max-lg:text-sm tracking-wide text-left'>{title}</p>
                {icon}
            </div>
            {children}
        </div>
    );
};