import { Card, CardBody } from "@nextui-org/react";

export default function Policy() {
    return (
        <div className="bg-sky-image bg-cover bg-center bg-fixed">
            <div className="inset-0 overflow-y-auto">
                <div className="min-h-screen flex flex-col items-center mobile:px-4 tablet:px-6 px-8 py-12">
                    <h1 className="text-2xl font-semibold text-center mb-12 text-white
                    desktop:text-3xl pt-12">
                        Chính sách bảo vệ hành khách của QAirLine
                    </h1>
                    <Card className="w-full max-w-5xl bg-white/70 backdrop-blur-sm rounded-none">
                        <CardBody className="p-8">
                            <div className="space-y-6 mobile:text-sm tablet:text-sm text-base">
                                <p>
                                    QAirline luôn mong muốn được đồng hành cùng Quý khách trong những chuyến bay và cam kết áp dụng mọi biện pháp
                                    để bảo vệ khách hàng trong suốt hành trình bay cùng QAirline.
                                </p>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">1. Trường hợp số lượng hành khách làm thủ tục lên tầu nhiều hơn so với số ghế thực tế của máy bay</h2>
                                    <p>
                                        Trong một số trường hợp, chúng tôi không thể cung cấp chỗ ngồi cho hành khách mặc dù hành khách đã có vé và làm thủ tục lên máy bay.
                                        Trường hợp này xảy ra nếu số lượng hành khách làm thủ tục vượt quá số ghế thực tế của máy bay.
                                    </p>
                                    <p>
                                        Nếu hành khách chủ động nhường chỗ cho hành khách khác hoặc bị từ chối lên máy bay, chúng tôi sẽ đền bù và thu xếp chuyến bay thay thế.
                                        Chúng tôi sẽ thông báo đến hành khách giải thích các quyền lợi và đền bù theo chính sách của QAirline trừ các trường hợp được miễn trừ bồi thường theo quy định của pháp luật.
                                    </p>
                                    <p>
                                        Các chính sách và thủ tục mà chúng tôi thực hiện đảm bảo hành khách được đối xử công bằng và hợp lý.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">2. Các trách nhiệm đối với hành lý bị hỏng hóc</h2>
                                    <p>
                                        Nếu hành lý kí gửi của hành khách bị hư hỏng hoặc thất lạc,
                                        hãy điền các thông tin cần thiết vào bản khai báo tại Quầy hành lý bị thất lạc trong thời gian sớm nhất.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">3. Cung cấp thông tin về Hoàn/Hủy đổi vé/thay đổi hành trình</h2>
                                    <p>
                                        Trường hợp muốn hoàn vé, hành khách vui lòng liên lạc với nơi xuất vé để được hỗ trợ.
                                    </p>
                                    <p>
                                        Nếu hành khách gửi yêu cầu hoàn vé qua thư điện tử, yêu cầu hoàn vé phải được gửi từ địa chỉ thư điện tử mà hành khách đã đăng ký trong quá trình đặt chỗ,
                                        mua vé, nếu không yêu cầu hoàn vé của hành khách sẽ không được chấp nhận.
                                    </p>
                                    <p>
                                        Tùy thuộc vào điều kiện của giá vé, việc hoàn vé của hành khách có thể bị thu phí hoặc không được phép hoàn.
                                        Tiền hoàn vé sẽ được chuyển về thẻ hoặc tài khoản hành khách đã sử dụng khi mua vé.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">4. QAirline đáp ứng các yêu cầu cần thiết trong các trường hợp chuyến bay bất thường</h2>
                                    <h2 className="font-semibold">4.1. Các dịch vụ cung cấp tại sân bay</h2>
                                    <p>
                                        Trong thời gian chờ đợi thực hiện chuyến bay tại sân bay,
                                        đối với những hành khách có vé đã được xác nhận chỗ nhưng việc vận chuyển bị gián đoan, bị chậm, huỷ chuyến,
                                        chúng tôi sẽ phục vụ hành khách một số dịch vụ như sau:
                                    </p>
                                    <ul className="space-y-2 list-disc pl-4">
                                        <li>
                                            Thời gian chậm từ 01 đến dưới 02 giờ: Phục vụ đồ uống
                                        </li>
                                        <li>
                                            Thời gian chậm từ 01 đến dưới 02 giờ: Phục vụ đồ uống
                                        </li>
                                        <li>
                                            Thời gian chậm từ 01 đến dưới 02 giờ: Phục vụ đồ uống
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">4.2. Bồi thường cho hành khách</h2>
                                    <p>
                                        Đối với các chuyến bay ngoài lãnh thổ Việt Nam, sẽ theo quy định của nước sở tại hoặc quy định của chúng tôi.
                                    </p>
                                    <p>
                                        Việc bồi thường sẽ được thực hiện tại sân bay hoặc các chi nhánh của QAirline tùy từng trường hợp cụ thể.
                                        Chúng tôi sẽ thực hiện bồi thường bằng một trong các phương thức sau: Tiền mặt, chuyển khoản, chứng từ thanh toán hoặc các dịch vụ do QAirline
                                        cung cấp trên cơ sở thỏa thuận với hành khách.
                                    </p>
                                    <p>
                                        Hành khách vui lòng gửi văn bản yêu cầu trong thời hạn 90 ngày kể từ ngày chuyến bay dự kiến cất cánh nếu hành khách
                                        chưa nhận được bồi thường hoặc cho rằng mức bồi thường không đúng với quy định pháp luật.
                                        Chúng tôi sẽ trả lời hoặc thực hiện bồi thường trong vòng 7 ngày kể từ ngày nhận được văn bản.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">4.3. Các trường hợp miễn trừ trách nhiệm</h2>
                                    <p>
                                        Theo quy định của chính phủ Việt Nam và các nước sở tại, QAirline sẽ được miễn trừ nghĩa vụ bồi thường trong các trường hợp sau:
                                    </p>
                                    <ul className="space-y-2 list-disc pl-4">
                                        <li>
                                            Chuyến bay bị chậm, hủy vì lý do bất khả kháng như ảnh hưởng của thời tiết,
                                            theo yêu cầu của nhà chức trách, an ninh hàng không, xung đột vũ trang, kết cấu hạ tầng...
                                        </li>
                                        <li>
                                            Nếu chúng tôi có thể chứng minh được đã thông báo cho hành khách về việc chậm,
                                            huỷ chuyến ít nhất 24 giờ trước giờ cất cánh dự kiến theo lịch hoặc hành khách không đăng ký địa chỉ liên lạc;
                                            hoặc không liên hệ được với hành khách theo địa chỉ đã đăng ký.
                                        </li>
                                        <li>
                                            Miễn trừ bồi thường cho khách bị từ chối trong trường hơp lý do từ hành khách
                                            (như tình trạng sức khỏe, dịch bệnh, việc khách không tuân thủ đúng điều lệ/ hợp đồng vận chuyển/ quy định của nhà chức trách…),
                                            theo yêu cầu của nhà chức trách, an ninh hàng không...
                                        </li>
                                        <li>
                                            Các trường hợp miễn trừ khác.
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">4.4. Hoàn vé cho khách</h2>
                                    <p>
                                        Hành khách sẽ được miễn trừ các điều kiện hạn chế và phí hoàn vé (nếu có) nếu:
                                    </p>
                                    <ul className="space-y-2 list-disc pl-4">
                                        <p>
                                            QAirline thay đổi lịch bay ít nhất 1 ngày trước ngày khởi hành dự kiến và chuyến bay bị ảnh hưởng như sau:
                                        </p>
                                        <li>
                                            Chuyến bay bị chậm/khởi hành sớm làm mất nối chuyến đến điểm dừng tiếp theo trong hành trình và không có phương án thay thế;
                                        </li>
                                        <li>
                                            Chuyến bay bị chậm/khởi hành sớm từ 4 giờ trở lên;
                                        </li>
                                        <li>
                                            Chuyến bay bị hủy và chuyển chuyến bay thay thế có giờ khởi hành muộn/sớm hơn giờ khởi hành cũ từ 4 giờ trở lên.
                                        </li>
                                        <li>
                                            Chuyến bay bị hủy và không có phương án thay thế hoặc phương án thay thế khiến hành trình bị thay đổi;
                                        </li>
                                        <li>
                                            Khách bị từ chối vận chuyển.
                                        </li>
                                    </ul>

                                    <ul className="space-y-2 list-disc pl-4">
                                        <p>
                                            QAirline thay đổi lịch bay trong vòng 1 ngày trước ngày khởi hành dự kiến và chuyến bay bị ảnh hưởng như sau:
                                        </p>
                                        <li>
                                            Chuyến bay bị chậm từ 4 giờ trở lên;
                                        </li>
                                        <li>
                                            Chuyến bay bị hủy/khởi hành sớm từ 15 phút trở lên
                                        </li>
                                        <li>
                                            Khách bị từ chối vận chuyển do lỗi của QAirline
                                        </li>
                                    </ul>

                                    <p>
                                        Trường hợp thay đổi lịch bay ảnh hưởng đến nối chuyến, hành khách sẽ được miễn trừ điều kiện hạn chế và phí hoàn (nếu có)
                                        mà không tính đến các giới hạn về thời gian nêu trên.
                                    </p>

                                    <ul className="space-y-2 list-disc pl-4">
                                        <p>
                                            Trường hợp hành khách bỏ chỗ trên chuyến bay và QAirline thay đổi lịch bay:
                                        </p>
                                        <li>
                                            Nếu thông báo thay đổi lịch bay gửi đến hành khách ít nhất 24 giờ trước thời gian khởi hành ban đầu,
                                            chính sách hoàn vé sẽ được áp dụng theo điều kiện giá vé.
                                        </li>
                                        <li>
                                            Nếu thông báo thay đổi lịch bay gửi đến hành khách trong vòng 24 giờ trước thời gian khởi hành ban đầu,
                                            hành khách được hoàn vé miễn điều kiện hạn chế, phí thay đổi/hoàn, phí no-show và phí xử lý (nếu có).
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h2 className="font-semibold">5. Thông báo kịp thời về các thay đổi trong hành trình của hành khách</h2>
                                    <p>
                                        Chúng tôi sẽ thông báo kịp thời về các thay đổi liên quan đến chuyến bay của hành khách.
                                        Chúng tôi sẽ thông báo cho hành khách về các thay đổi của chuyến bay dựa trên các thông tin liên lạc hành khách đã cung cấp khi đặt chỗ.
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}