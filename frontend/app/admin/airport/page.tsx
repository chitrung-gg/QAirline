import axios from 'axios';
import AirportTable from '@/components/admin/airport/AirportTable';

export default async function Page() {
  const res = await axios.get('http://localhost:5000/airport');
  const data = res.data;

    return (
      <main className='h-full w-full'>
        <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
          Thông tin
        </h1>
        <AirportTable data={data}/>
      </main>
    );
  }