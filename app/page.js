import dynamic from "next/dynamic";
import HeroSection from "./Component/hero-section";
import WhenVisibleSection from "./Component/WhenVisibleSection";

import CyberThreatLandscape from "./Component/CyberThreatLandscape";
import TrainingPrograms from "./Component/TrainingPrograms";
import CourseSection from "./Component/CourseSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CyberThreatLandscape />
      <TrainingPrograms />
      <CourseSection />
      <WhenVisibleSection section="CoreServicesOverview" loadingHeight="h-96" />
      <WhenVisibleSection section="LearningHub" loadingHeight="h-96" />
      <WhenVisibleSection section="WeServe" loadingHeight="h-96" />
      <WhenVisibleSection section="EnterpriseSolutions" loadingHeight="h-96" />
      <WhenVisibleSection section="WorkshopSection" loadingHeight="h-96" />
      <WhenVisibleSection section="WorkProcessSection" loadingHeight="h-96" />
      <WhenVisibleSection section="ToolsScroller" loadingHeight="h-96" />
      <WhenVisibleSection section="OurCustomers" loadingHeight="h-96" />
      <WhenVisibleSection section="Testimonial" loadingHeight="h-96" />
      <WhenVisibleSection section="CyberRangeStats" loadingHeight="h-96" />
    </>
  );
}
