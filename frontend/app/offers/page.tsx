import ImageSection from "@/components/Card/ImageSection";
import OfferCard from "@/components/Card/OfferCard";

const offers = [
    {
        image: '/images/sky.jpg',
        title: 'Giảm 300k cho vé bay từ 2.000.000Đ cho người lớn',
        promoCode: 'WANDER15',
        expiryDate: '11/4/2025'
    },
    {
        image: '/images/sky.jpg',
        title: 'Giảm 300k cho vé bay từ 2.000.000Đ cho người lớn',
        promoCode: 'WANDER15',
        expiryDate: '11/4/2025'
    },
    {
        image: '/images/sky.jpg',
        title: 'Giảm 300k cho vé bay từ 2.000.000Đ cho người lớn',
        promoCode: 'WANDER15',
        expiryDate: '11/4/2025'
    },
    {
        image: '/images/sky.jpg',
        title: 'Giảm 300k cho vé bay từ 2.000.000Đ cho người lớn',
        promoCode: 'WANDER15',
        expiryDate: '11/4/2025'
    },
    {
        image: '/images/sky.jpg',
        title: 'Giảm 300k cho vé bay từ 2.000.000Đ cho người lớn',
        promoCode: 'WANDER15',
        expiryDate: '11/4/2025'
    },
];

export default function OffersPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <ImageSection />

            {/* Offers Grid */}
            <div className="max-w-7xl mx-auto px-8 py-12
            mobile:px-4
            desktop:py-12">
                <div className="flex items-center justify-start mobile:justify-center tablet:justify-center pb-12">
                    <p className="text-3xl font-bold font-robotoflex capitalize text-blue-normal">Ưu đãi</p>
                </div>

                <div className="grid grid-cols-1 desktop:grid-cols-2 laptop:grid-cols-2 gap-8">
                    {offers.map((offer, index) => (
                        <OfferCard key={index} {...offer} />
                    ))}
                </div>
            </div>
        </div>
    )
}