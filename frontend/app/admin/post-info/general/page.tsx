import axios from 'axios';
import GeneralNewsTable from '@/components/admin/post-info/GeneralTable';

export default async function Page() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/news`);
  const data = res.data;

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Thông tin
        </h1>
        <GeneralNewsTable newsData={data}/>
      </main>
    );
  }