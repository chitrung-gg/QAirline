import {Card, CardHeader, CardBody, CardFooter, Divider, Button, Input} from "@nextui-org/react";

export default function MyFlightSearchCard() {
  return (
    <div className="gap-5 grid place-items-center">
        <Card className="max-w-screen-xl w-full">
        <CardHeader className="flex gap-3">
            <div className="flex flex-col">
            <p className="text-md pb-2 font-bold">Thông tin hành trình</p>
            <p className="text-small">Quý khách muốn xem chuyến bay đã đặt, đổi lịch trình bay hay mua thêm dịch vụ,..., vui lòng điền thông tin bên dưới:</p>
            </div>
        </CardHeader>
        <CardBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
                <Input size="sm" className="md:w-2/5" type="text" label="Mã đặt chỗ/Số vé điện tử" variant="bordered"/>
                <Input size="sm" className="md:w-2/5" type="text" label="Họ" variant="bordered" />
                <Button size="md" radius="sm" className="md:w-1/5 bg-blue-normal text-white font-medium text-base">Tìm chuyến bay</Button>
            </div>
        </CardBody>
        <Divider/>
        
        </Card>
    </div>
  );
}