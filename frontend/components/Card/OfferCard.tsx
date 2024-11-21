"use client"

import {Card, CardHeader, CardBody, CardFooter, Image, Button, image} from "@nextui-org/react";

export default function OfferCard() {
    const data = 
        {
          title: "Giảm xxxk cho vé từ xxx.xxx.xxxđ cho người lớn",
          img: "/images/Qairline.png",
          expired: "31/12/2024",
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
                <span className="font-bold text-base">{data.title}</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between w-full gap-6 mt-2 mb-2">
                  <div className="flex flex-col justify-between w-3/5 text-left">
                    <div className="flex flex-col mt-2">
                      <div className="">
                        <span className="font-medium rounded-lg border-dashed border-2 border-blue-normal px-2 py-1 text-lg">HELLO</span>
                      </div>
                      <div className="mt-5">
                      <span className="font-medium bg-secondary-light-hover px-2 py-1 rounded-lg text-xs">HSD: {data.expired}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-2/5 flex items-end md:justify-end mr-1">
                    <Button className="text-base mobile:text-sm font-medium text-white bg-blue-normal " radius='sm' onPress={() => console.log("pressed")}>
                      Đặt vé ngay
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
        </div>
    );
}