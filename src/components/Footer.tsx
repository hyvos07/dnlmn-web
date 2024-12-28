import {FileText, Mail, ExternalLink} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      <div className="h-[1px] w-full bg-gradient-to-r from-zinc-800/75 via-zinc-700 to-zinc-800/75" />
      <div className="flex justify-center bg-zinc-950 pb-12 pt-16 max-[960px]:pt-14">
        <div className="flex items-stretch justify-between text-sm tracking-wide w-full px-12 max-sm:px-8 min-[1200px]:w-[1200px] gap-16 max-[960px]:flex-col-reverse">
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-3.5">
              <p className="text-lg leading-none text-zinc-200 font-semibold">
                Daniel Liman
              </p>
              <p className="text-sm text-zinc-500">
                A passionate Software Engineer and Computer Science Student.
              </p>
            </div>
            <div className="space-y-2">
              <ul className="flex gap-3 text-zinc-200 mb-6">
                <li>
                  <a className="custom-link group" href="https://github.com/hyvos07" target="_blank" aria-label="Github">
                    <img src="svgs/logo/github.svg" alt="GitHub Logo" className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a className="custom-link group" href="https://linkedin.com/in/danielliman" target="_blank" aria-label="LinkedIn">
                    <img src="svgs/logo/linkedin.svg" alt="GitHub Logo" className="h-6 w-6" />
                  </a>
                </li>
                <li>
                  <a className="custom-link group" href="https://x.com/hyvos_" target="_blank" aria-label="twitter">
                    <img src="svgs/logo/x-twitter.svg" alt="GitHub Logo" className="h-6 w-6" />
                  </a>
                </li>
                {/* <li>
                  <a className="custom-link group" href="/" target="" aria-label="Resume">
                    <FileText size={24} />
                  </a>
                </li> */}
                <li>
                  <a className="custom-link group" href="mailto:daniel.liman07@gmail.com" target="_blank" aria-label="Email">
                    <Mail size={24} />
                  </a>
                </li>
              </ul>
                <p className="text-xs text-zinc-500">
                  © {new Date().getFullYear()} by dnlmn.
                  <a href="https://github.com/hyvos07" target="_blank" className="underline pl-1">Source code</a>
                </p>
            </div>
          </div>
          <div className="flex flex-col justify-between max-xs:gap-16 max-[960px]:flex-col-reverse max-[960px]:gap-12 text-zinc-200">
            <div className="grid grid-cols-2 gap-y-16 max-[960px]:max-w-[480px] max-xs:grid-cols-2 sm:gap-24">
              <div className="space-y-3.5">
                <p className="text-zinc-200">About me</p>
                <ul className="flex flex-col gap-3 text-zinc-400">
                  <li>
                    <a className="custom-link flex items-center gap-1 font-normal hover:text-zinc-200" href="/projects" target="_self">
                      <span>Projects</span>
                    </a>
                  </li>
                  <li>
                    <a className="custom-link flex items-center gap-1 font-normal hover:text-zinc-200" href="/experiences" target="_self">
                      <span>Experiences</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3.5">
                <p className="text-zinc-200">Other</p>
                <ul className="flex flex-col gap-3 text-zinc-400">
                  <li>
                    <a className="custom-link flex items-center gap-1 font-normal hover:text-zinc-200" href="https://instagram.com/daniel.liman07" target="_blank">
                      <span>Instagram</span>
                      <ExternalLink size={14} />
                    </a>
                  </li>
                  <li>
                    <a className="custom-link flex items-center gap-1 font-normal hover:text-zinc-200" href="https://open.spotify.com/user/21mbqudgwnoeuzanoxignlkzi" target="_blank">
                      <span>Spotify</span>
                      <ExternalLink size={14} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}