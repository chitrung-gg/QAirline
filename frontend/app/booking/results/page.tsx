"use client";

import FlightCard from "@/components/Card/Flight/FlightCard";
import FlightSearchCard from "@/components/Card/Search/FlightSearchCard";

const sampleFlightData = [
    {
        id: 1,
        departure_location: "Hà Nội",
        departure_time: "07:00",
        departure_airport: "Nội Bài (HAN)",
        arrival_location: "Hồ Chí Minh",
        arrival_time: "09:00",
        arrival_airport: "Tân Sơn Nhất (SGN)",
        departure_date:"20/12/2023",
        arrival_date:"21/12/2023",
        price: 2500000,
        duration: "2h 00m",
        type: "Phổ thông",
        baggage: "20kg",
        meal: "Bữa sáng nhẹ",
        wifi: true,
        entertainment: false
    },
    {
        id: 2,
        departure_location: "Đà Nẵng",
        departure_time: "13:30",
        departure_airport: "Đà Nẵng (DAD)",
        arrival_location: "Nha Trang",
        arrival_time: "14:45",
        arrival_airport: "Cam Ranh (CXR)",
        departure_date:"20/12/2023",
        arrival_date:"21/12/2023",
        price: 1800000,
        duration: "1h 15m",
        type: "Thương gia",
        baggage: "30kg",
        meal: "Bữa trưa đầy đủ",
        wifi: true,
        entertainment: true
    },
    {
        id: 3,
        departure_location: "Hồ Chí Minh",
        departure_time: "20:15",
        departure_airport: "Tân Sơn Nhất (SGN)",
        arrival_location: "Phú Quốc",
        arrival_time: "21:30",
        arrival_airport: "Phú Quốc (PQC)",
        departure_date:"20/12/2023",
        arrival_date:"21/12/2023",
        price: 2200000,
        duration: "1h 15m",
        type: "Tiết kiệm",
        baggage: "15kg",
        meal: "Không",
        wifi: false,
        entertainment: false
    },
    {
        id: 4,
        departure_location: "Hải Phòng",
        departure_time: "06:45",
        departure_airport: "Cát Bi (HPH)",
        arrival_location: "Buôn Ma Thuột",
        arrival_time: "08:30",
        arrival_airport: "Buôn Ma Thuột (BMV)",
        departure_date:"20/12/2023",
        arrival_date:"21/12/2023",
        price: 3000000,
        duration: "1h 45m",
        type: "Thương gia",
        baggage: "40kg",
        meal: "Bữa sáng cao cấp",
        wifi: true,
        entertainment: true
    }
];

export default function BookingResults() {
    return (
        <div className="mx-auto max-w-6xl ">
            <FlightSearchCard />
            <div className="gap-4 flex flex-col items-center justify-center py-8 px-8
            desktop:py-16">
                {sampleFlightData.map((flight) => (
                    <FlightCard
                        key={flight.id}
                        departure_location={flight.departure_location}
                        departure_time={flight.departure_time}
                        departure_airport={flight.departure_airport}
                        arrival_location={flight.arrival_location}
                        arrival_time={flight.arrival_time}
                        arrival_airport={flight.arrival_airport}
                        departure_date={flight.departure_date}
                        arrival_date={flight.arrival_date}
                        price={flight.price}
                        duration={flight.duration}
                        type={flight.type}
                        id={flight.id}
                    />
                ))}
            </div>
        </div>
    )
}