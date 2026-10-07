import FurinaLazy from "@/components/FurinaLazy";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-fg">
      <div className="flex flex-col text-center items-center">
        <FurinaLazy />
        <p className="font-extrabold text-sm text-fg-muted m-2">
          There is nothing here.
        </p>
        <p className="font-medium text-sm text-fg-muted">
          Only you and this little rotateable creature.
        </p>
      </div>
    </div>
  );
}