import Image from "next/image";
import HeroSection from "./Component/hero-section";
import CoreServicesOverview from "./Component/CoreServicesOverview";
import WeServe from "./Component/who-we-serve";
// import ServiceOverview from "./Component/service-hero";
import Footer from "./Component/footer";
import Testimonial from "./Component/Testimonial";
import WorkProcessSection from "./Component/WorkProcessSection";
import NewsletterSignup from "./Component/NewsletterSignup";
import CyberRangeStats from "./Component/CyberRangeStats";
import ToolsScroller from "./Component/ToolsScroller";
import OurCustomers from "./Component/OurCustomers";
import EnterpriseSolutions from "./Component/EnterpriseSolutions";
import CyberThreatLandscape from "./Component/CyberThreatLandscape";
import TrainingPrograms from "./Component/TrainingPrograms";
// import ScrollVelocity from "./Component/ScrollVelocity";
import CourseSection from "./Component/CourseSection";
import WorkshopSection from "./Component/WorkshopSection";
import LearningHub from "./Component/LearningHub";
export default function Home() {
  return (
    <>
      <HeroSection />

      <CyberThreatLandscape />
      {/* <ScrollVelocity
        texts={['CyberWhisper', 'Cybersecurity Training']}
        velocity={100}
        className="custom-scroll-text"
      /> */}
      <TrainingPrograms />
      <CourseSection />

      <CoreServicesOverview />
      <LearningHub />
      <WeServe />
      <EnterpriseSolutions />
      <WorkshopSection />



      <WorkProcessSection />


      <ToolsScroller />
      <OurCustomers />
      <Testimonial />
      <CyberRangeStats />


    </>
  );
}
