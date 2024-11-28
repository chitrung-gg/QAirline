import {Card, CardHeader, CardBody, Input, Button} from "@nextui-org/react";

export default function OfferInputCard() {
  return (
    <Card className="max-w-sm">
        <CardHeader className="flex gap-3 pb-1 ml-1">
            <div className="flex flex-col">
                <p className="text-lg font-semibold">Ưu đãi & Giảm giá</p>
            </div>
        </CardHeader>
        <CardBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-2 items-center">
                <Input size="sm" className="md:w-2/3" type="text" label="Mã khuyến mại" variant="bordered"/>
                <Button size="md" radius="sm" className="md:w-1/3 bg-blue-normal text-white font-medium text-base">Áp dụng</Button>
            </div>
        </CardBody>
    </Card>
  );
}