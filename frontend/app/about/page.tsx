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
                const introResponse = await axios.get("http://localhost:5000/aboutus/category/Intro");
                const ourValueResponse = await axios.get("http://localhost:5000/aboutus/category/OurValue");
                const achievementResponse = await axios.get("http://localhost:5000/aboutus/category/Achievement");
                const ourVisionResponse = await axios.get("http://localhost:5000/aboutus/category/OurVision");

                setIntroData({
                    category: introResponse.data[0].category,
                    title: introResponse.data[0].title,
                    content: introResponse.data[0].content,
                    image: introResponse.data[0].image,
                });
                setOurValueData({
                    category: ourValueResponse.data[0].category,
                    title: ourValueResponse.data[0].title,
                    content: ourValueResponse.data[0].content,
                    image: ourValueResponse.data[0].image,
                });
                setAchievementData({
                        category: achievementResponse.data[0].category,
                        title: achievementResponse.data[0].title,
                        content: achievementResponse.data[0].content,
                        image: achievementResponse.data[0].image,
                });
                setOurVisionData({
                    category: ourVisionResponse.data[0].category,
                    title: ourVisionResponse.data[0].title,
                    content: ourVisionResponse.data[0].content,
                    image: ourVisionResponse.data[0].image,
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