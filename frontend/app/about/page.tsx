import Archivement from "@/components/about/Archivement";
import Introduction from "@/components/about/Intro";
import OurValue from "@/components/about/OurValue";
import OurVision from "@/components/about/OurVision";
import Promotion from "@/components/about/Promotion";
import ImageSection from "@/components/Card/ImageSection";

export default function About() {
    return (
        <div>
            <ImageSection />
            <Introduction />
            <OurValue />
            <Archivement />
            <OurVision />
            <Promotion />
        </div>
    )
}