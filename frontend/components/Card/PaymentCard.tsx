"use client";
import {Card, CardHeader, CardBody, Input, Divider} from "@nextui-org/react";
import React from "react";

export default function PaymentCard() {
  return (
    <Card className="">
        <CardHeader className="flex text-left items-start p-3 justify-between">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">Thanh toán</p>
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
        <CardBody className="flex flex-col p-3">
            <Input 
                labelPlacement={"outside"}
                placeholder="xxxx xxxx xxxx xxxx"
                size="lg" 
                radius="sm"
                label="Thông tin thẻ" 
                variant="bordered" 
                className="mb-5"
                type="number"
            />
            <div className="flex flex-col md:flex-row justify-between gap-2">
                <Input 
                    labelPlacement={"outside"}
                    placeholder="Tháng"
                    size="lg" 
                    radius="sm"
                    label="Tháng hết hạn" 
                    variant="bordered" 
                    className="mb-5"
                    type="number"
                />
                <Input 
                    labelPlacement={"outside"}
                    placeholder="Năm"
                    size="lg" 
                    radius="sm"
                    label="Năm hết hạn" 
                    variant="bordered" 
                    className="mb-5"
                    type="number"
                />
                <Divider orientation="vertical" className="mx-1" />
                <Input 
                    labelPlacement={"outside"}
                    placeholder="xxx"
                    size="lg" 
                    radius="sm"
                    label="CVV/CVC" 
                    variant="bordered" 
                    className="mb-5"
                    type="number"
                />
            </div>
            <Input 
                labelPlacement={"outside"}
                placeholder="Chủ thẻ"
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