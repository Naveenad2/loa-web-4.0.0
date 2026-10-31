import { Header } from "@/components/Header";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/Marquee";
import { Story } from "@/components/story/Story";
import { Moods } from "@/components/moods/Moods";
import { HappyHours } from "@/components/happy-hours/HappyHours";
import { Feed } from "@/components/feed/Feed";
import { Visit } from "@/components/visit/Visit";
import { Footer } from "@/components/footer/Footer";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { EmberCursor } from "@/components/effects/EmberCursor";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Moods />
        <HappyHours />
        <Feed />
        <Visit />
      </main>
      <Footer />
      <EmberCursor />
    </>
  );
}
