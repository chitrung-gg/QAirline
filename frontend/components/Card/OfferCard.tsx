"use client"

import { Promotion } from "@/interfaces/promotion";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { toLocalTimeZone, parseZonedDateTime, DateFormatter } from "@internationalized/date";
import { useState } from "react";

export default function OfferCard(prop: Promotion) {
  const [buttonText, setButtonText] = useState("Sao chép mã");

  const handleCopyCode = () => {
    navigator.clipboard.writeText(prop.code).then(() => {
      setButtonText("Đã sao chép"); 
      setTimeout(() => {
        setButtonText("Sao chép mã"); 
      }, 1000);
    }).catch((error) => {
      console.error("Có lỗi khi sao chép mã!", error);
    });
  };

  const formatDate = (isoDate: string) => {
    const dateFormatter = new Intl.DateTimeFormat('vi-VN', {
      calendar: 'gregory', // Lịch Dương
      timeZone: 'UTC', // Múi giờ UTC
    });
  
    const date = new Date(isoDate);
    return dateFormatter.format(date);
  };

  return (
    <Card shadow="sm" className="rounded-lg" >
      <CardBody className="overflow-visible p-0">
        <Image
          radius="none"
          width="100%"
          alt="offer"
          className="w-full object-cover h-[240px]"
          src={prop.coverImage}
        />
      </CardBody>
      <CardFooter className="flex flex-col justify-between">
        <div className="w-full text-left col-span-4">
          <span className="font-bold mobile:text-base text-lg desktop:text-xl">{prop.description}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full gap-6 mt-2 mb-2">
          <div className="flex flex-col justify-between w-3/5 text-left">
            <div className="flex flex-col mt-2">
              <div className="">
                <span className="font-medium rounded-lg border-dashed border-2 border-blue-normal px-2 py-1 
                  mobile:text-base 
                  tablet:text-base
                  text-lg">{prop.code}</span>
              </div>
              <div className="mt-5">
                <span className="font-medium bg-secondary-light-hover px-2 py-1 rounded-lg mobile:text-xs text-sm">
                  {/* HSD: {prop.endDate} */}
                  HSD: {formatDate(prop.endDate)}
                </span>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex items-end md:justify-end mr-1">
            {/* <Button className="text-base mobile:text-sm font-medium text-white bg-blue-normal " radius='sm' onPress={() => router.push("/")}>
              Đặt vé ngay
            </Button> */}
            <Button 
              className="text-base mobile:text-sm font-medium text-white bg-blue-normal" 
              radius="sm" 
              onPress={handleCopyCode}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}