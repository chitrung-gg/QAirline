import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";

export default function FlightCard() {

    const data = {
        brand: "QAirline", //cái này hơi thừa, mình có brand nào khác đâu :v
        departure_location: "HAN",
        departure_time: "12:00",
        departure_airport: "Sân bay Nội Bài", //cái này cần check lại, 
        //vì HAN hnhu là mã của sân bay nội bài r còn đâu, ghi thêm thì thừa??
        arrival_location: "SGN",
        arrival_time: "14:30",
        arrival_airport: "Sân bay Tân Sơn Nhất",
        logo: "/images/Qairline.png",
        price: 500000,
        duration: "2h 30m",
        type: "Economy",
    }

  return (
    <div className="gap-5 grid place-items-center" >
        <Card className="w-3/5 ">
            <CardHeader className="justify-between">
                <div className="flex gap-3">
                    <Image
                        alt="logo"
                        height={40}
                        src={data.logo}
                        width={40}
                        className='transition-all hover:scale-100'
                    />
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-md">{data.brand}</p>
                    </div>
                </div>
                <div className="flex flex-col mr-3">
                    <p className="text-md">Hạng: {data.type}</p>
                </div>
            </CardHeader>
            <Divider className="bg-transparent"/>
            <CardBody>
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:w-4/5 flex items-center justify-between mx-2">
                        <div className="flex-1 flex flex-col items-start w-[25%]">
                            <p className="text-lg font-bold">{data.departure_time}</p>
                            <p>{data.departure_location}</p>
                            <p>{data.departure_airport}</p>
                        </div>
                        <div className="mx-4 flex flex-col items-center w-[50%]">
                            <div className="border-t border-blue-normal w-full my-2"></div>
                            <p>{data.duration}</p>
                        </div>
                        <div className="flex-1 flex flex-col items-end text-right w-[25%]">
                            <p className="text-lg font-bold">{data.arrival_time}</p>
                            <p>{data.arrival_location}</p>
                            <p>{data.arrival_airport}</p>
                            
                        </div>
                    </div>
                    <div className="md:w-1/5 flex items-center justify-between mx-2">
                        <div className="flex-1 flex flex-col items-center">
                            <p className="text-lg font-bold">{data.price.toLocaleString()} VNĐ</p>
                            <Button className="mt-2 bg-blue-normal text-white">Đặt vé ngay</Button>
                        </div>
                    </div>
                </div>
            </CardBody>
            <Divider className="bg-transparent"/>
            <CardFooter className="flex flex-col items-start md:flex-row md:justify-between">
                <div className="flex gap-3">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-md ml-1">Có thể hoàn tiền một phần</p>
                    </div>
                </div>
                <div className="flex flex-col mr-3 ml-1">
                    <Link href="#" className="bg-transparent text-blue-normal text-md font-semibold">Chi tiết hành trình</Link>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}