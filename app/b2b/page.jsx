import B2BHero from '../Component/B2BHero';
import B2BStats from '../Component/B2BStats';
import B2BFeatures from '../Component/B2BFeatures';
import B2BResilience from '../Component/B2BResilience';
import B2BConnected from '../Component/B2BConnected';
import B2BThemeWrapper from '../Component/B2BThemeWrapper';

export const metadata = {
    title: 'Enterprise Solutions | Cyber Whisper',
    description: 'Advanced B2B cybersecurity infrastructure for high-performance enterprises.',
};

export default function B2BPage() {
    return (
        <main>
            <B2BThemeWrapper>
                <B2BHero />
                <B2BStats />
                <B2BFeatures />
                <B2BResilience />
                <B2BConnected />
            </B2BThemeWrapper>
        </main>
    );
}
