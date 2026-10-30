import { HomeCta } from "@/components/home-cta";
import { HomeHero } from "@/components/home-hero";
import { WhyChooseWanderlust } from "@/components/why-choose-wanderlust";

export default function Home() {
  return (
    <>
      <HomeHero />
      <WhyChooseWanderlust />
      <HomeCta />
    </>
  );
}
