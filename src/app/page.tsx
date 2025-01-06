import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SplashScreen from "@/components/SplashScreen";
import HomeContent from "@/sections/home";

export default function HomePage() {
  return (
    <div className="justify-items-center font-[family-name:var(--font-plus-jakarta-sans)]">
      <SplashScreen />
      <NavBar />
      <main className="flex flex-col justify-center items-center px-14 mx-auto lg:px-44">
        <HomeContent />
        <div id="proj" className="min-h-screen flex justify-center items-center">
          <p className="text-3xl font-semibold">My Projects</p>
        </div>
        <div id="exp" className="min-h-screen flex justify-center items-center">
          <p className="text-3xl font-semibold">My Experiences</p>
        </div>
        <div id="cp" className="min-h-screen flex justify-center items-center">
          <p className="text-3xl font-semibold">Contact Me!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
