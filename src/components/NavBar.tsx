'use client';
import handleScroll from "@/utils/handleScroll";
import { Home, Blocks, Sparkles, Mail, ArrowDown, UserRound, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navItems: NavItem[] = [
  { to: 'home', label: 'Home' },
  { to: 'about', label: 'About Me' },
  { to: 'proj', label: 'Projects' },
  { to: 'exp', label: 'Experiences' },
  { to: 'blog', label: 'Blog' },
  { to: 'cp', label: 'Contact' },
];

const iconMap: Record<string, React.ComponentType<{ size: number; strokeWidth: number; color: string }>> = {
  Home: Home,
  'About Me': UserRound,
  Projects: Blocks,
  Experiences: Sparkles,
  Blog: BookOpen,
  Contact: Mail,
};

export default function NavBar() {
  const [active, setActive] = useState<string>(navItems[0].to);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';
  const isBlogRoute = pathname.startsWith('/blog');

  useEffect(() => {
    if (!isHomePage) return;

    const handleScrollEvent = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const item of navItems) {
        const section = document.getElementById(item.to);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = top + window.scrollY;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
            setActive(item.to);
            break;
          }
        }
      }
    };

    const frame = window.requestAnimationFrame(handleScrollEvent);
    window.addEventListener('scroll', handleScrollEvent, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [isHomePage]);

  const handleNavClick = (item: NavItem) => {
    if (item.to === 'blog') {
      if (isHomePage) {
        handleScroll('blog');
      } else {
        router.push('/blog');
      }
      return;
    }

    if (isHomePage) {
      handleScroll(item.to);
    } else {
      router.push(`/#${item.to}`);
    }
  };

  const getIconColor = (item: NavItem): string => {
    if (isBlogRoute) return item.to === 'blog' ? '#54b4e2' : 'white';
    if (active === item.to) return '#54b4e2';
    return 'white';
  };

  return (
    <>
      <nav className="fixed top-6 z-[900] w-full flex justify-center max-sm:hidden">
        <div className="mx-12 bg-zinc-900/75 w-full max-w-[350px] backdrop-blur-sm border border-zinc-800 rounded-[24px]">
          <div className="flex justify-between items-center px-8 min-h-[54px]">
            {navItems.map((item, index) => {
              const IconComponent = iconMap[item.label];
              return (
                <button
                  key={index}
                  onClick={() => handleNavClick(item)}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <IconComponent
                    size={24}
                    strokeWidth={1.75}
                    color={getIconColor(item)}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {active === 'home' && isHomePage && (
        <div className="fixed bottom-10 z-[900] w-full flex justify-center max-md:hidden">
          <button
            onClick={() => handleScroll('about')}
            className={
              `animate-bounce text-zinc-300 lg:block hidden p-3
                            rounded-full bg-zinc-900/75 border border-zinc-800`
            }
          >
            <ArrowDown size={24} strokeWidth={2} />
          </button>
        </div>
      )}
    </>
  );
}
