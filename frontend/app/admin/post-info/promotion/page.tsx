import axios from "axios";
import PromotionTable from "@/components/admin/post-info/PromotionTable";

export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/promotion`);
  const data = res.data;

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Khuyến mại
        </h1>
        <PromotionTable data={data}/>
      </main>
    );
  }