import axios from "axios";
import PromotionTable from "@/components/admin/post-info/PromotionTable";

export default async function Page() {
  const res = await axios.get('http://localhost:5000/promotion');
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