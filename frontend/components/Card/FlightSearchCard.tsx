"use client";

import {Card, Radio, CardBody, RadioGroup, Divider, Button, Input} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem, DatePicker} from "@nextui-org/react";
import React, { useState } from "react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";
import { GoArrowSwitch } from "react-icons/go";

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm 1 vì tháng trong JavaScript bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };

export default function FlightSearchCard() {

    const [selected, setSelected] = React.useState("bay-thang");
    const [departureDate, setDepartureDate] = useState(parseDate(formatDate(new Date())));
    const [returnDate, setReturnDate] = useState(parseDate(formatDate(new Date())));

    const [departure, setDeparture] = useState("london");
    const [destination, setDestination] = useState("paris");

    const handleSwap = () => {
        setDeparture(destination);
        setDestination(departure);
      };

    const sampleData = [
            { value: "london", label: "London" },
            { value: "paris", label: "Paris" },
            { value: "new-york", label: "New York" },
            { value: "tokyo", label: "Tokyo" },
            { value: "berlin", label: "Berlin" },
            { value: "madrid", label: "Madrid" },
            { value: "rome", label: "Rome" },
            { value: "moscow", label: "Moscow" },
            { value: "beijing", label: "Beijing" },
            { value: "bangkok", label: "Bangkok" },
            { value: "hanoi", label: "Hanoi" },
            { value: "saigon", label: "Saigon" },
        ];

  return (
    <div className="gap-5 bg-white w-full place-items-center">
        <Card className="max-w-screen-xl w-full" shadow="none">
        <CardBody>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-5 items-center mb-3 mt-5">
                <RadioGroup orientation="horizontal" value={selected} onValueChange={setSelected}>
                    <Radio value="bay-thang" className="mr-3">Bay thẳng</Radio>
                    <Radio value="khu-hoi">Khứ hồi</Radio>
                </RadioGroup>
            </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
                <div className="flex flex-wrap md:flex-nowrap gap-1 items-center flex-auto">
                    <Autocomplete label="Điểm đi" size="sm" variant="bordered" className="flex-auto w-32" selectedKey={departure} onSelectionChange={(value) => setDeparture(value as string)}>
                        {sampleData.map((data) => (
                        <AutocompleteItem key={data.value} value={data.value}>
                            {data.label}
                        </AutocompleteItem>
                        ))}
                    </Autocomplete>
                    <Button size="md" onClick={handleSwap} className="bg-transparent" isIconOnly>
                        <GoArrowSwitch />
                    </Button>
                    <Autocomplete label="Điểm đến" size="sm" variant="bordered" className="flex-auto w-32" selectedKey={destination} onSelectionChange={(value) => setDestination(value as string)}>
                        {sampleData.map((data) => (
                            <AutocompleteItem key={data.value} value={data.value}>
                                {data.label}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>
                <DatePicker showMonthAndYearPickers label="Ngày đi" className="flex-auto w-32" size="sm" variant="bordered" value={departureDate} onChange={setDepartureDate}/>
                <DatePicker showMonthAndYearPickers label="Ngày về" className="flex-auto w-32" size="sm" variant="bordered" value={returnDate} onChange={setReturnDate}/>
                <Input size="sm" type="number" className="flex-auto w-20" label="Hành khách" variant="bordered" />
                <Button size="md" radius="sm" className="flex-auto w-32 bg-blue-normal text-white font-medium text-base">Tìm chuyến bay</Button>
            </div>
        </CardBody>
        <Divider/>
        
        </Card>
    </div>
  );
}