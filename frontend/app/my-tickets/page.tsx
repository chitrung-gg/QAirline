"use client"
import MyFlightSearch from "@/components/Card/Search/MyFlightSearch"
import React from "react";

interface FlightInfo {
    flightNumber: string;
    departure: string;
    arrival: string;
    // or something...
}

export default function MyTickets() {
    const [flightInfo, setFlightInfo] = React.useState<FlightInfo | null>(null); 
    const [errorMessage, setErrorMessage] = React.useState(""); 

    const handleSearchResult = (result: FlightInfo | null) => {
        if (result) {
            setFlightInfo(result);
            setErrorMessage("");
        } else {
            setFlightInfo(null);
            setErrorMessage("Không tìm thấy chuyến bay.");
        }
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.jpg)' }}>
                <h1 className="max-w-4/5 my-5 text-center text-white text-4xl font-bold">An tâm với mỗi chuyến bay của bạn</h1>
                <div className="lg:w-4/5 rounded-lg my-5">
                    <MyFlightSearch onSearch={handleSearchResult}/>
                </div>
            </div>
            {flightInfo ? (
                <div className="mt-5 text-lg">
                    <p>Thông tin chuyến bay:</p>
                        <pre>{JSON.stringify(flightInfo, null, 2)}</pre>
                    </div>
                ) : (
                    errorMessage && <div className="mt-5">{errorMessage}</div>
                )}
        </div>
    )
}