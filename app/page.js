import dynamic from "next/dynamic";
import HeroSection from "./Component/hero-section";
import WhenVisibleSection from "./Component/WhenVisibleSection";

// Above-the-fold: load with SSR for fast first paint
const CyberThreatLandscape = dynamic(
  () => import("./Component/CyberThreatLandscape"),
  { loading: () => <div className="h-64 bg-gray-900/30 animate-pulse" />, ssr: true }
);
const TrainingPrograms = dynamic(
  () => import("./Component/TrainingPrograms"),
  { loading: () => <div className="h-64 bg-gray-900/30 animate-pulse" />, ssr: true }
);
const CourseSection = dynamic(
  () => import("./Component/CourseSection"),
  { loading: () => <div className="h-64 bg-gray-900/30 animate-pulse" />, ssr: true }
);

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
