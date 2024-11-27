"use client";
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { useState } from "react";

export default function FareSummaryCard() {
    const [isPriceDetailsExpanded, setIsPriceDetailsExpanded] = useState(true);
    const [isTaxDetailsExpanded, setIsTaxDetailsExpanded] = useState(true);
    const [isServiceDetailsExpanded, setIsServiceDetailsExpanded] = useState(true);

    //placeholder data
    const fareSummary = {
        totalFare: "1.705.000đ",
        priceDetails: {
            total: "1.500.000đ",
            items: [
                { description: "Người lớn x1", amount: "1.500.000đ" }
            ]
        },
        taxDetails: {
            total: "200.000đ",
            items: [
                { description: "Phụ thu dịch vụ hệ thống", amount: "100.000đ" },
                { description: "Phụ phí quản trị hệ thống", amount: "100.000đ" }
            ]
        },
        serviceDetails: {
            total: "100.000đ",
            items: [
                { description: "Hành lý mua thêm?", amount: "100.000đ" }
            ]
        }
    };

    return (
        <Card className="max-w-sm">
            <CardHeader className="flex gap-3 pb-1 ml-1">
                <div className="flex flex-col">
                <p className="text-lg font-semibold">Tổng chi phí chiều đi</p>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-1 ">
                <div
                    className="flex items-center justify-between py-2 cursor-pointer"
                    onClick={() => setIsPriceDetailsExpanded(!isPriceDetailsExpanded)}
                >
                    <div className="flex items-center gap-2">
                        {isPriceDetailsExpanded ? (
                            <GoChevronUp size={20} />
                        ) : (
                            <GoChevronDown size={20} />
                        )}
                        <p className="text-sm font-semibold ml-1">Giá vé</p>
                    </div>
                    <div className="flex items-right gap-2">
                        <p className="text-sm font-semibold text-right mr-1">{fareSummary.priceDetails.total}</p>
                    </div>
                </div>

                {isPriceDetailsExpanded && (
                <>
                    {fareSummary.priceDetails.items.map((item, index) => (
                        <div key={index} className="gap-1 grid grid-cols-2 justify-between pb-2">
                            <p className="text-sm ml-1">{item.description}</p>
                            <p className="text-sm text-right mr-1">{item.amount}</p>
                        </div>
                    ))}
                </>
                )}
                <Divider/>
                <div
                    className="flex items-center justify-between py-2 cursor-pointer"
                    onClick={() => setIsTaxDetailsExpanded(!isTaxDetailsExpanded)}
                >
                <div className="flex items-center gap-2">
                    {isTaxDetailsExpanded ? (
                    <GoChevronUp size={20} />
                    ) : (
                    <GoChevronDown size={20} />
                    )}
                    <p className="text-sm font-semibold ml-1">Thuế, phí</p>
                </div>
                <div className="flex items-right gap-2">
                            <p className="text-sm font-semibold text-right mr-1">{fareSummary.taxDetails.total}</p>
                        </div>
                </div>

                {isTaxDetailsExpanded && (
                <>
                    {fareSummary.taxDetails.items.map((item, index) => (
                        <div key={index} className="gap-1 grid grid-cols-2 justify-between pb-2">
                            <p className="text-sm ml-1">{item.description}</p>
                            <p className="text-sm text-right mr-1">{item.amount}</p>
                        </div>
                    ))}
                </>
                )}
                <Divider/>
                <div
                    className="flex items-center justify-between py-2 cursor-pointer"
                    onClick={() => setIsServiceDetailsExpanded(!isServiceDetailsExpanded)}
                >
                    <div className="flex items-center gap-2">
                        {isServiceDetailsExpanded ? (
                            <GoChevronUp size={20} />
                        ) : (
                            <GoChevronDown size={20} />
                        )}
                        <p className="text-sm font-semibold ml-1">Dịch vụ</p>
                    </div>
                    <div className="flex items-right gap-2">
                        <p className="text-sm font-semibold text-right mr-1">{fareSummary.serviceDetails.total}</p>
                    </div>
                </div>

                {isServiceDetailsExpanded && (
                    <>
                        {fareSummary.serviceDetails.items.map((item, index) => (
                            <div key={index} className="gap-1 grid grid-cols-2 justify-between pb-2">
                                <p className="text-sm ml-1">{item.description}</p>
                                <p className="text-sm text-right mr-1">{item.amount}</p>
                            </div>
                        ))}
                    </>
                )}
                <Divider/>
            </CardBody>
            <CardFooter className="pt-2 ml-1 gap-2 grid grid-cols-2 justify-between">
                <p className="text-lg font-semibold">Tổng tiền</p>
                <p className="text-lg font-semibold text-right mr-2">{fareSummary.totalFare}</p>
            </CardFooter>
        </Card>
    );
}