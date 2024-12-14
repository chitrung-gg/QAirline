"use client";
import { Destination } from "@/interfaces/destination";
import {Card, CardFooter, Image } from "@nextui-org/react";

export default function LocationCard(prop: Destination) {

  return (
    <div className="gap-5 grid place-items-center" >
        <Card isPressable onPress={() => console.log("item pressed")} className="w-full h-[300px] max-w-screen-xl">
            <Image
                  removeWrapper
                  alt="Location image"
                  className="z-0 w-full h-full object-cover"
                  src={prop.image || "/images/Qairline.png"}
            />
            <CardFooter className="absolute bottom-3 z-10 ml-2">
                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col text-left">
                          <p className="font-bold text-2xl">{prop.city}</p>
                        <p className="text-lg">{prop.country}</p>
                        <p className="">{prop.description}</p>
                    </div>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}