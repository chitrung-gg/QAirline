import { Card, CardHeader, CardBody, Divider, Button, Input } from "@nextui-org/react";

export default function MyFlightSearch() {
  return (
    <Card className="p-2">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col
        mobile:items-center
        tablet:items-center
        ">
          <p className="pb-2 font-bold text-xl
            mobile:text-large
            tablet:text-large">
            Thông tin hành trình
          </p>
          <p className="text-base
            mobile:text-sm mobile:text-center
            tablet:text-sm tablet:text-center
            ">
            Quý khách muốn xem chuyến bay đã đặt, đổi lịch trình bay vui lòng điền thông tin bên dưới:
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex w-full gap-4 items-center
        mobile:flex-col
        tablet:flex-col
        ">
          <Input
            size="sm"
            className="w-2/3"
            type="text"
            label="Mã vé điện tử"
            variant="bordered"
          />
          <Button
            size="md"
            radius="sm"
            className="w-1/3 bg-blue-normal text-white font-medium text-base"
          >
            Tìm chuyến bay
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}