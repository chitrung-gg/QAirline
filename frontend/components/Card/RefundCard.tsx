"use client";
import {Card, CardHeader, CardBody, CardFooter, Input, Link, Image, Button} from "@nextui-org/react";
import React from "react";

export default function RefundCard() {
  return (
    <Card className="max-w-lg">
        <CardHeader className="flex text-left items-start px-10 py-5 justify-between">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">Thông tin thẻ</p>
            </div>
            <div className="flex space-x-4 justify-end">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                    alt="Visa Logo" 
                    className="h-8 w-8" 
                />
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                    alt="MasterCard Logo" 
                    className="h-8 w-8" 
                />
            </div>
        </CardHeader>
        <CardBody className="flex flex-col px-10 py-1">
            <Input 
                isRequired
                labelPlacement={"outside"}
                placeholder="xxxx xxxx xxxx xxxx"
                size="lg" 
                radius="sm"
                type="email" 
                label="Thông tin thẻ" 
                variant="bordered" 
                className="mb-5"
            />
            <Input 
                isRequired
                labelPlacement={"outside"}
                placeholder="Họ và tên chủ thẻ"
                size="lg" 
                radius="sm"
                type="text" 
                label="Họ và tên chủ thẻ" 
                variant="bordered" 
                className="mb-5"
            />
        </CardBody>
    </Card>
  );
}