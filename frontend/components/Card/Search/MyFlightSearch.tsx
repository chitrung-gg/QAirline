"use client";
import { Card, CardHeader, CardBody, Divider, Button, Input } from "@nextui-org/react";
import React from "react";

interface MyFlightSearchProps {
  onSearch: (data: any | null) => void; 
}

export default function MyFlightSearch(props: MyFlightSearchProps) {
  const [ticketCode, setTicketCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSearch = async () => {
    if (!ticketCode) {
      props.onSearch(null); 
      return;
    }

    setLoading(true);

    try {
      alert("Search flight with ticket code: " + ticketCode);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm chuyến bay", error);
      props.onSearch(null); 
    } finally {
      setLoading(false);
    }
  };

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
            value={ticketCode}
            onChange={(e) => setTicketCode(e.target.value)}
          />
          <Button
            size="md"
            radius="sm"
            className="w-1/3 bg-blue-normal text-white font-medium text-base"
            onClick={handleSearch}
            disabled={loading}
          >
            Tìm chuyến bay
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}