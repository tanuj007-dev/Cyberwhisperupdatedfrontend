// import Banner from "../Component/Banner";
import TrainingHero from "../Component/TrainingHero";

import TrainingSection from "../Component/TrainingSection";
import Batches from "../Component/Batches";
import HelpCenter from "../Component/HelpCenter";
import Placement from "../Component/Placement";

import LearningMode from "../Component/Learningmode";

// import Craw from "../Component/Craw";

import TrustedAlleid from "../Component/TrustedAlleid";
import TrustedByBest from "../Component/TrustedByBest";
// import Recognition from "../Component/Recognition";
import PlacementCell from "../Component/PlacementCell";

export const metadata = {
    title: "Cyber Security Training | Cyber Whisper",
    description: "Enroll in our 1-year Cyber Security Diploma Training gain expert AI skills for the digital era.",
};

export default function TrainingPage() {
    return (
        <main className="bg-white dark:bg-black transition-colors duration-300">
            <TrainingHero />
            {/* <Banner /> */}
            <TrainingSection />
            <HelpCenter />
            <Batches />
            <Placement />
            <LearningMode />
            {/* <Craw /> */}
            <TrustedAlleid />
            <TrustedByBest />
            {/* <Recognition /> */}
            <PlacementCell />
        </main>
    );
}
