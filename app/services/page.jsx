"use client"
import ServiceHero from '../Component/service-hero';
import FeaturedScroll from '../Component/FeaturedScroll';
import OurServices from '../Component/OurServices';
import ScrollAnimation from '../Component/ScrollAnimation';

import Essentials from '../Component/Essentials';
import CareerFocus from '../Component/CareerFocus';
import SkillLevels from '../Component/SkillLevels';
import FreeTrial from '../Component/FreeTrial';
import NeedHelp from '../Component/NeedHelp';
export default function ServicesPage() {

  return (
    <main className="bg-white dark:bg-black transition-colors duration-300">
      <ServiceHero />
      {/* <FeaturedScroll /> */}
      <ScrollAnimation>
        <OurServices />
      </ScrollAnimation>

      <ScrollAnimation>
        <Essentials />
      </ScrollAnimation>

      <ScrollAnimation>
        <CareerFocus />
      </ScrollAnimation>

      <ScrollAnimation>
        <SkillLevels />
      </ScrollAnimation>

      <ScrollAnimation>
        <FreeTrial />
      </ScrollAnimation>

      <ScrollAnimation>
        <NeedHelp />
      </ScrollAnimation>

    </main>
  );
}
