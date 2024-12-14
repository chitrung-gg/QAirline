import axios from 'axios';
import GeneralNewsTable from '@/components/admin/post-info/GeneralTable';

export default async function Page() {
  const res = await axios.get('http://localhost:5000/news');
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