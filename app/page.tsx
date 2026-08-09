import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Taskbar } from "@/components/Taskbar";
import { WindowManagerProvider } from "@/components/WindowManager";
import { IconSprite } from "@/components/win98/Icon";

export default function Home() {
  return (
    <WindowManagerProvider>
      <IconSprite />
      <Hero />
      <main className="sections">
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="credits">
        Aswad98 — best viewed at any resolution, unlike the original.
      </footer>
      <Taskbar />
    </WindowManagerProvider>
  );
}
