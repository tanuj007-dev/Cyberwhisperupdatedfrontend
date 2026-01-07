"use client"
import ServiceHero from '../Component/service-hero';
import FeaturedScroll from '../Component/FeaturedScroll';
import OurServices from '../Component/OurServices';
import Stripe from '../Component/stripe';
import Essentials from '../Component/Essentials';
import CareerFocus from '../Component/CareerFocus';
import SkillLevels from '../Component/SkillLevels';
import FreeTrial from '../Component/FreeTrial';
import NeedHelp from '../Component/NeedHelp';
export default function ServicesPage() {

  return (
    <main className="bg-white">
      <ServiceHero />
      {/* <FeaturedScroll /> */}
      <OurServices />
      <Stripe />
      <Essentials />
      <CareerFocus />
      <SkillLevels />
      <FreeTrial />
      <NeedHelp />

    </main>
  );
}
