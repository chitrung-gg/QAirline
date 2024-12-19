"use client";
import Archivement from "@/components/about/Archivement";
import Introduction from "@/components/about/Intro";
import OurValue from "@/components/about/OurValue";
import OurVision from "@/components/about/OurVision";
import Promotion from "@/components/about/Promotion";
import ImageSection from "@/components/ImageSection";
import axios from "axios";
import { useEffect, useState } from "react";

interface AboutUsSection {
    category: string;
    title: string;
    content: string[];
    image: string[];
}

export default function About() {

    const [introData, setIntroData] = useState<AboutUsSection | null>(null);
    const [ourValueData, setOurValueData] = useState<AboutUsSection | null>(null);
    const [achievementData, setAchievementData] = useState<AboutUsSection | null>(null);
    const [ourVisionData, setOurVisionData] = useState<AboutUsSection | null>(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const introResponse = await axios.get("http://localhost:5000/aboutus/Intro");
                const ourValueResponse = await axios.get("http://localhost:5000/aboutus/OurValue");
                const achievementResponse = await axios.get("http://localhost:5000/aboutus/Achievement");
                const ourVisionResponse = await axios.get("http://localhost:5000/aboutus/Intro");

                setIntroData({
                    category: introResponse.data.category,
                    title: introResponse.data.title,
                    content: introResponse.data.content,
                    image: introResponse.data.image,
                });
                setOurValueData({
                    category: ourValueResponse.data.category,
                    title: ourValueResponse.data.title,
                    content: ourValueResponse.data.content,
                    image: ourValueResponse.data.image,
                });
                setAchievementData({
                        category: achievementResponse.data.category,
                        title: achievementResponse.data.title,
                        content: achievementResponse.data.content,
                        image: achievementResponse.data.image,
                });
                setOurVisionData({
                    category: ourVisionResponse.data.category,
                    title: ourVisionResponse.data.title,
                    content: ourVisionResponse.data.content,
                    image: ourVisionResponse.data.image,
                });
            } catch (error) {
                console.error("Error fetching about data:", error);
            }
        };

        fetchAboutData();
    }, []);

    if (!introData || !ourValueData || !achievementData || !ourVisionData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ImageSection />
            <Introduction {...introData}/>
            <OurValue {...ourValueData} />
            <Archivement {...achievementData}/>
            <OurVision {...ourVisionData} />
            <Promotion />
        </div>
    )
}