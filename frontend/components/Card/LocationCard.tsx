"use client";
import {Card, CardFooter, Image, Button, CardHeader} from "@nextui-org/react";

export default function LocationCard() {
    const data = {
        title: "Hà Nội",
        country: "Việt Nam",
        img: "/images/Qairline.png",
        description: "Thủ đô của Việt Nam",
    }

  return (
    <div className="gap-5 grid place-items-center" >
        <Card isPressable onPress={() => console.log("item pressed")} className="w-full h-[300px] max-w-screen-xl">
            <Image
                removeWrapper
                alt="Location image"
                className="z-0 w-full h-full object-cover"
                src={data.img}
            />
            <CardFooter className="absolute bottom-3 z-10 ml-2">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col text-left">
                        <p className="font-bold text-2xl">{data.title}</p>
                        <p className="text-lg">{data.country}</p>
                        <p className="">{data.description}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}