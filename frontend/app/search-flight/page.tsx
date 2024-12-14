
import MyFlightSearchCard from "@/components/Card/Search/MyFlightSearch";
import { Button } from "@nextui-org/react";


export default function SearchFlightPage() {
    return (
        <div className="w-full flex flex-col justify-center items-center mx-auto">
            <div className="bg-sky-image
            mobile:max-w-xs">
                <MyFlightSearchCard />
            </div>

        </div>
    )
}