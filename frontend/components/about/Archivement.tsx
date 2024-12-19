"use client";

import { Card, Image } from "@nextui-org/react";

const achivements = [
    {
        image_url: "/images/flygroup.png",
        description: "Hơn 20 năm kinh nghiệm trong ngành hàng không"
    },
    {
        image_url: "/images/hero-section.png",
        description: "Đội bay hiện đại với 100.000 máy bay được trang bị công nghệ tiên tiến."
    },
    {
        image_url: "/images/customer.png",
        description: "Phục vụ hơn 50 triệu hành khách mỗi năm."
    },
    {
        image_url: "/images/flygroup.png",
        description: "Đạt giải thưởng \"Đội bay xuất sắc\" cho dịch vụ khách hàng xuất sắc."
    },
];

interface AchievementProps {
    category: string;
    title: string;
    content: string[];
    image: string[];
}

export default function Archivement({ title, content, image }: AchievementProps) {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="w-full flex flex-col justify-center items-center px-4 py-8 desktop:py-8 gap-8">
                <p className="text-2xl md:text-3xl lg:text-3xl font-bold text-blue-normal italic text-center">
                    {/* Thành tựu đạt được */}
                    {title}
                </p>
                <div className="grid grid-cols-4 mobile:grid-cols-2 tablet:grid-cols-2 gap-2">
                    {/* Archivement grid */}
                    {/* {achievements.map((achievement, index) => (
                        <Card
                            key={index}
                            className="achievement-item flex flex-col items-center text-center gap-4"
                        >
                            <Image
                                src={achievement.image_url}
                                alt="Achievement"
                                height={200}
                                className="w-full object-cover transition-all"
                            />
                            <p className="text-base p-2">{achievement.description}</p>
                        </Card>
                    ))} */}
                    {/* Mapping content[i] and image[i] */}
                    {content.map((desc, i) => (
                        <Card key={i} className="achievement-item flex flex-col items-center text-center gap-4">
                            <Image
                                src={image[i]}  
                                alt={`Achievement ${i + 1}`}
                                height={200}
                                className="w-full object-cover transition-all"
                            />
                            <p className="text-base p-2">{desc}</p> 
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}