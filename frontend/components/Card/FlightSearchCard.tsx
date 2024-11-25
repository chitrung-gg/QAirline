"use client";

import {Card, Radio, CardBody, RadioGroup, Divider, Button, Input} from "@nextui-org/react";
import {Autocomplete, AutocompleteItem, DatePicker} from "@nextui-org/react";
import React, { useState } from "react";
import {parseDate, getLocalTimeZone} from "@internationalized/date";

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm 1 vì tháng trong JavaScript bắt đầu từ 0
    const day = date.getDate().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}`;
  };

export default function FlightSearchCard() {

const [selected, setSelected] = React.useState("london");
const [departureDate, setDepartureDate] = useState(parseDate(formatDate(new Date())));
const [returnDate, setReturnDate] = useState(parseDate(formatDate(new Date())));

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
                <Autocomplete label="Điểm đi" size="sm" variant="bordered" className="flex-1">
                    {sampleData.map((data) => (
                    <AutocompleteItem key={data.value} value={data.value}>
                        {data.label}
                    </AutocompleteItem>
                    ))}
                </Autocomplete>
                <Autocomplete label="Điểm đến" size="sm" variant="bordered" className="flex-1">
                    {sampleData.map((data) => (
                    <AutocompleteItem key={data.value} value={data.value}>
                        {data.label}
                    </AutocompleteItem>
                    ))}
                </Autocomplete>
                <DatePicker showMonthAndYearPickers label="Ngày đi" className="flex-1" size="sm" variant="bordered" value={departureDate} onChange={setDepartureDate}/>
                <DatePicker showMonthAndYearPickers label="Ngày về" className="flex-1" size="sm" variant="bordered" value={returnDate} onChange={setReturnDate}/>
                <Input size="sm" type="number" className="flex-1" label="Hành khách" variant="bordered" />
                <Button size="md" radius="sm" className="flex-1 bg-blue-normal text-white font-medium text-base">Tìm chuyến bay</Button>
            </div>
        </CardBody>
        <Divider/>
        
        </Card>
    </div>
  );
}