import dynamic from 'next/dynamic';
import Image from "next/image";

// Static imports for above-the-fold content
import HeroSection from "./Component/hero-section";

// Lazy loaded components
const CoreServicesOverview = dynamic(() => import("./Component/CoreServicesOverview"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const WeServe = dynamic(() => import("./Component/who-we-serve"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const Footer = dynamic(() => import("./Component/footer"), {
  loading: () => <div className="h-32 bg-gray-900" />,
  ssr: true,
});

const Testimonial = dynamic(() => import("./Component/Testimonial"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const WorkProcessSection = dynamic(() => import("./Component/WorkProcessSection"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const NewsletterSignup = dynamic(() => import("./Component/NewsletterSignup"), {
  loading: () => <div className="h-32 bg-gray-900" />,
  ssr: true,
});

const CyberRangeStats = dynamic(() => import("./Component/CyberRangeStats"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const ToolsScroller = dynamic(() => import("./Component/ToolsScroller"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const OurCustomers = dynamic(() => import("./Component/OurCustomers"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const EnterpriseSolutions = dynamic(() => import("./Component/EnterpriseSolutions"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const CyberThreatLandscape = dynamic(() => import("./Component/CyberThreatLandscape"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const TrainingPrograms = dynamic(() => import("./Component/TrainingPrograms"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const CourseSection = dynamic(() => import("./Component/CourseSection"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const WorkshopSection = dynamic(() => import("./Component/WorkshopSection"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

const LearningHub = dynamic(() => import("./Component/LearningHub"), {
  loading: () => <div className="h-96 bg-gray-900" />,
  ssr: true,
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <CyberThreatLandscape />
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
