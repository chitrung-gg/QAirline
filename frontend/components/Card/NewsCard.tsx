"use client"

import {Card, CardHeader, CardBody, CardFooter, Image, Button, image} from "@nextui-org/react";

interface NewsProps {
  title: string;
  image: string;
  link: string;
}

export default function NewsCard(prop: NewsProps) {
    return (
        <div className="">
            <Card shadow="sm" className="rounded-lg" >
              <CardBody className="overflow-visible p-0">
                <Image
                  radius="none"
                  width="100%"
                  alt={prop.title}
                  className="w-full object-cover h-[140px]"
                  src={prop.image}
                />
              </CardBody>
              <CardFooter className="flex flex-col justify-between">
                <div className="w-full text-left col-span-4">
                    <span className="text-base">{prop.title}</span>
                </div>
                <div className="w-full text-left col-span-4 mt-1">
                    <a href={prop.link} className="text-blue-normal">Xem thêm</a>
                </div>
                
              </CardFooter>
            </Card>
        </div>
    );
}