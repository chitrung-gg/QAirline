"use client";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";

export default function PolicyCard() {
    return (
        <Card className="">
            <CardHeader className="flex gap-3 pb-1 ml-1">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold">Chính sách bảo vệ hành khách của QAirline</p>
                </div>
            </CardHeader>
            <CardBody className="px-3 py-1 mx-1">
                <div className="flex flex-col">
                    <p className="text-small">
                        QAirline luôn mong muốn được đồng hành cùng Quý khách trong những chuyến bay và cam kết áp dụng mọi biện pháp
                        để bảo vệ khách hàng trong suốt hành trình bay cùng QAirline.
                    </p>
                    {/* <Divider className="my-2 bg-transparent" />
                    <div className="text-small">
                        <h2 className="mx-2 mb-2 font-semibold">1. Trường hợp số lượng hành khách làm thủ tục lên tầu nhiều hơn so với số ghế thực tế của máy bay</h2>
                        <p className="mx-3">
                            Trong một số trường hợp, chúng tôi không thể cung cấp chỗ ngồi cho hành khách mặc dù hành khách đã có vé và làm thủ tục lên máy bay.
                            Trường hợp này xảy ra nếu số lượng hành khách làm thủ tục vượt quá số ghế thực tế của máy bay.
                        </p>
                        <p className="mx-3">...</p>
                    </div> */}
                </div>
            </CardBody>
            <CardFooter className="pt-2 ml-1 gap-2 grid grid-cols-2 justify-between mt-2">
                <Link
                    isExternal
                    href="/policy"
                    className="text-sm font-semibold text-blue-normal"
                >
                    Đọc thêm
                </Link>
            </CardFooter>
        </Card>
    );
}