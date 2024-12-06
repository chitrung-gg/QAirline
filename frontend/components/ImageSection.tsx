import Image from "next/image";

export default function ImageSection() {
    return (
        <div className="relative h-[200px] w-full">
            <Image
                src="/images/city.jpg"
                alt="NYC Skyline"
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
            />
        </div>
    )
}