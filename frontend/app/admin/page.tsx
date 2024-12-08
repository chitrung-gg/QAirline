import axios from "axios";
import UserTable from "@/components/admin/UserTable";

export default async function Page() {
  let data = [];

  try {
    const res = await axios.get('http://localhost:5000/user');
    data = res.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu người dùng:', error);
    
    data = [];  
  }

  return (
    <main className='h-full w-full'>
      <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
        Người dùng
      </h1>
      <UserTable data={data}/>
    </main>
  );
}