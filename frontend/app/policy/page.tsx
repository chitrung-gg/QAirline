import axios from "axios";
import Policy from "@/components/policy";

const policyDataTemp = {
    title: "Chính sách bảo vệ hành khách của QAirLine",
    treeContent: {
        sections: [
        {
            title: "1. Trường hợp số lượng hành khách làm thủ tục lên tầu nhiều hơn so với số ghế thực tế của máy bay",
            content: "Trong một số trường hợp, chúng tôi không thể cung cấp chỗ ngồi cho hành khách mặc dù hành khách đã có vé và làm thủ tục lên máy bay.",
            subsections: []
        },
        {
            title: "2. Các trách nhiệm đối với hành lý bị hỏng hóc",
            content: "Nếu hành lý kí gửi của hành khách bị hư hỏng hoặc thất lạc, hãy điền các thông tin cần thiết vào bản khai báo tại Quầy hành lý bị thất lạc trong thời gian sớm nhất.",
            subsections: []
        },
        {
            title: "3. Cung cấp thông tin về Hoàn/Hủy đổi vé/thay đổi hành trình",
            content: "Trường hợp muốn hoàn vé, hành khách vui lòng liên lạc với nơi xuất vé để được hỗ trợ.",
            subsections: []
        },
        {
            title: "4. QAirline đáp ứng các yêu cầu cần thiết trong các trường hợp chuyến bay bất thường",
            content: "",
            subsections: [
            {
                title: "4.1. Các dịch vụ cung cấp tại sân bay",
                content: "Trong thời gian chờ đợi thực hiện chuyến bay tại sân bay, đối với những hành khách có vé đã được xác nhận chỗ nhưng việc vận chuyển bị gián đoan, bị chậm, huỷ chuyến, chúng tôi sẽ phục vụ hành khách một số dịch vụ như sau."
            },
            {
                title: "4.2. Bồi thường cho hành khách",
                content: "Đối với các chuyến bay ngoài lãnh thổ Việt Nam, sẽ theo quy định của nước sở tại hoặc quy định của chúng tôi."
            }
            ]
        }
        ]
    }
};

export default async function Page() {

    const res = await axios.get('http://localhost:5000/policy');
    //const data = res.data[0];

    const data = policyDataTemp;

    return (
        <Policy policyData={data} />
    );
    
}