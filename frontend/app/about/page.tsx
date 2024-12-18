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
    title: string;
    content: string[];
    imageUrl: string;
}

interface Achievement {
    image_url: string;
    description: string;
}

const parseJsonField = (field: string | null): any => {
    if (field) {
        try {
            return JSON.parse(field);  
        } catch (error) {
            console.error("Error parsing JSON data:", error);
            return field; 
        }
    }
    return field; 
};

export default async function About() {

    const [introData, setIntroData] = useState<AboutUsSection | null>(null);
    const [ourValueData, setOurValueData] = useState<AboutUsSection | null>(null);
    const [achievementData, setAchievementData] = useState<Achievement[] | null>(null);
    const [ourVisionData, setOurVisionData] = useState<AboutUsSection | null>(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const introResponse = await axios.get("http://localhost:5000/aboutus/Intro");
                const ourValueResponse = await axios.get("http://localhost:5000/aboutus/OurValue");
                const achievementResponse = await axios.get("http://localhost:5000/aboutus/Achievement");
                const ourVisionResponse = await axios.get("http://localhost:5000/aboutus/Intro");

                setIntroData({
                    title: parseJsonField(introResponse.data.title),
                    content: parseJsonField(introResponse.data.content) || [],
                    imageUrl: parseJsonField(introResponse.data.image)?.[0] || "",
                });
                setOurValueData({
                    title: parseJsonField(ourValueResponse.data.title),
                    content: parseJsonField(ourValueResponse.data.content) || [],
                    imageUrl: parseJsonField(ourValueResponse.data.image)?.[0] || "",
                });
                setAchievementData(parseJsonField(achievementResponse.data) || []);
                setOurVisionData({
                    title: parseJsonField(ourVisionResponse.data.title),
                    content: parseJsonField(ourVisionResponse.data.content) || [],
                    imageUrl: parseJsonField(ourVisionResponse.data.image)?.[0] || "",
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
            <Archivement achievements={achievementData}/>
            <OurVision {...ourVisionData} />
            <Promotion />
        </div>
    )
}