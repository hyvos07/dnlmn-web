export default function OpenToProject() {
    return (
        <div className="flex items-center rounded-full gap-4 py-2 pl-4 pr-4 border border-zinc-700">
            <div className="relative h-3 w-3">
                <div className="absolute w-full h-full animate-ping rounded-full bg-green-300/75" />
                <div className="absolute w-full h-full rounded-full bg-green-400" />
            </div>
            <h3 className="font-medium text-sm">
                Available for projects
            </h3>
        </div>
    );
};