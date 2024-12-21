"use client";
import ImageSection from "@/components/ImageSection";
import FAQSection from "@/components/Support/FAQSection";
import Headline from "@/components/Support/Headline";
import axios from "axios";
import { useEffect, useState } from "react";

const faqs = [
    {
        question: 'Sau khi nhân được hành lý, tôi phát hiện dấu hiệu bị hư hỏng hoặc mất mát, thất lạc thì tôi phải làm gì?',
        answer: "Ngay khi phát hiện hành lý của mình bị hư hỏng, mất mát hoặc không nhận được hành lý, Quý khách vui lòng liên hệ với nhân viên tại quầy hành lý thất lạc tại sân bay để được hỗ trợ."
    },
    {
        question: 'Tôi có thể tra cứu lịch bay ở đâu?',
        answer: 'Quý khách có thể tra cứu thông tin lịch bay tại tính năng "Thông tin hành trình" trên website của QAirline.'
    },
    {
        question: 'Tôi được mang bao nhiêu kg/kiện hành lý xách tay?',
        answer: `Quý khách được mang Hành lý xách tay theo tiêu chuẩn như sau:
            1. Về trọng lượng:
            Đối với hạng Phổ thông: 12kg/ 26lb bao gồm 01 kiện xách tay không quá 10kg / 22lb và 01 phụ kiện;
            Đối với hạng Phổ thông đặc biệt / hạng Thương gia: 18kg / 40lb gồm 02 kiện(mỗi kiện không quá 10kg / 22lb) và 01 phụ kiện.

            2. Về kích thước: tổng kích thước tối đa 3 chiều(dài, rộng, cao) cần đảm bảo:
            Đối với 01 kiện xách tay: 115cm(56cm x 36cm x 23cm);
            Đối với 01 phụ kiện: 40cm x 30cm x 15cm. 

            Ngoài tiêu chuẩn hành lý xách tay nêu trên, hành khách được phép mang đồ dùng cá nhân lên máy bay miễn phí.`
    },
    {
        question: "Quy định về trọng lượng và kích thước của một kiện hành lý ký gửi khi đi máy bay như thế nào?",
        answer: `Kích thước tiêu chuẩn của một kiện hành lý ký gửi như sau:
            1. Về trọng lượng:
            - Hạng thương gia: trọng lượng 32kg/70lb 
            - Hạng phổ thông đặc biệt/phổ thông: trọng lượng 23kg/50lb 
            2. Về kích thước: tổng kích thước 3 chiều (dài, rộng, cao) không được vượt quá 158cm/62in
            Nếu mỗi kiện hành lý vượt quá tiêu chuẩn nêu trên, hành khách sẽ được yêu cầu đóng gói lại hành lý và trả phí theo hành lý tính cước tại sân bay hoặc được yêu cầu gửi theo đường hàng hóa.`,
    },
    {
        question: "Làm thế nào để chọn được giá tốt nhất khi mua vé máy bay trên website của QAirline?",
        answer: `Khi tìm kiếm chuyến bay trên website hoặc ứng dụng di động của QAirline, hệ thống luôn hiển thị thông tin mức giá thấp nhất còn chỗ giúp Quý khách dễ dàng lựa chọn.
                Bên cạnh đó, Quý khách nên có kế hoạch mua vé máy bay sớm đặc biệt đặt vé máy bay vào các chuyến sáng sớm hoặc tối muộn.`
    }
];

interface FAQItem {
    question: string;
    answer: string;
}

export default function Support() {
    const [data, setData] = useState<FAQItem[]>([]);
    const fetchData = async () => {
        try {
          const response = await axios.get<FAQItem[]>('http://localhost:5000/faq'); // Adjust API endpoint
          setData(response.data);
        } catch (error) {
          console.error('Error fetching faqs:', error);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);


    return (
        <div className="">
            <ImageSection />
            <Headline />
            <FAQSection faqs={data}/>
        </div>
    );
}