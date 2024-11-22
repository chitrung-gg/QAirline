"use client"

import {Card, CardHeader, CardBody, CardFooter, Image, Button, image} from "@nextui-org/react";

export default function NewsCard() {
    const data = 
        {
          title: "Ngày mai hãng bay nghỉ",
          img: "/images/Qairline.png",
          link: "/articles/1",
        }


    return (
        <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card shadow="sm" className="rounded-lg" >
              <CardBody className="overflow-visible p-0">
                <Image
                  radius="none"
                  width="100%"
                  alt={data.title}
                  className="w-full object-cover h-[140px]"
                  src={data.img}
                />
              </CardBody>
              <CardFooter className="flex flex-col justify-between">
                <div className="w-full text-left col-span-4">
                    <span className="text-base">{data.title}</span>
                </div>
                <div className="w-full text-left col-span-4 mt-1">
                    <a href={data.link} className="text-blue-normal">Xem thêm</a>
                </div>
                
              </CardFooter>
            </Card>
        </div>
    );
}