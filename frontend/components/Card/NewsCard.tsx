"use client"

import { News } from "@/interfaces/news";
import {Card, CardHeader, CardBody, CardFooter, Image, Button, image} from "@nextui-org/react";
import Link from "next/link";

interface NewsProps {
  id: number;
  title: string;
  image: string;
  link: string
}

export default function NewsCard(prop: News) {
    return (
        <div className="">
            <Card shadow="sm" className="rounded-lg" >
              <CardBody className="overflow-visible p-0">
                <Image
                  radius="none"
                  width="100%"
                  alt={prop.title}
                  className="w-full object-cover h-[140px]"
                  src={prop.coverImage || "/images/Qairline.png"}
                />
              </CardBody>
              <CardFooter className="flex flex-col justify-between">
                <Link href={`/news/`} className="w-full text-left col-span-4">
                    <span className="text-base">{prop.title}</span>
                </Link>
                <div className="w-full text-left col-span-4 mt-1">
                    <a href={`/news/${prop.id}`} className="text-blue-normal">Xem thêm</a>
                </div>
                
              </CardFooter>
            </Card>
        </div>
    );
}