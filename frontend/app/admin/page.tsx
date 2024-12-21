"use client";
import axios from "axios";
import UserTable from "@/components/admin/UserTable";
import React from "react";

export default function Page() {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        console.log('Token to get user data:', authToken);
        const res = await axios.get('http://localhost:5000/user', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        setData(res.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='h-full w-full'>
      <h1 className="text-xl md:text-2xl text-blue-normal mb-3">
        Người dùng
      </h1>
      <UserTable data={data}/>
    </main>
  );
}