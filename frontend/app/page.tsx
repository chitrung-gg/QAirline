"use client";
import OfferCard from "@/components/Card/OfferCard";
import FlightSearchCard from "@/components/Card/Search/FlightSearchCard";
import { Button, Pagination} from "@nextui-org/react";
import Link from "next/link";
import LocationCard from "@/components/Card/LocationCard";
import NewsCard from "@/components/Card/NewsCard";
import React from "react";
import { useRouter } from "next/navigation";

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

const news = [
  {
    id: 1,
    title: "Ngày mai hãng bay nghỉ",
    image: "/images/Qairline.png",
  },
  {
    id: 2,
    title: "Ngày mai hãng bay nghỉ",
    image: "/images/Qairline.png",
  },
  {
    id: 3,
    title: "Ngày mai hãng bay nghỉ",
    image: "/images/Qairline.png",
  },
  {
    id: 4,
    title: "Ngày mai hãng bay nghỉ",
    image: "/images/Qairline.png",
  },
  {
    id: 5,
    title: "Ngày mai hãng bay nghỉ",
    image: "/images/Qairline.png",
  },
];


export default function Home() {
  const router = useRouter();

  const [offerPage, setOfferPage] = React.useState(1);
  const [newsPage, setNewsPage] = React.useState(1);
  const [offerPerPage, setOfferPerPage] = React.useState(3);
  const [newsPerPage, setNewsPerPage] = React.useState(3);

  const updateItemsPerPage = () => {
    if (window.innerWidth <= 768) { //sm screen
      setOfferPerPage(1);
      setNewsPerPage(1);
    } else if (window.innerWidth <= 1024) { //md screen
      setOfferPerPage(1);
      setNewsPerPage(2);
    } else { 
      setOfferPerPage(3);
      setNewsPerPage(3);
    }
  };

  React.useEffect(() => {
    updateItemsPerPage();

    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const offerPages = Math.ceil(offers.length / offerPerPage);
  const newsPages = Math.ceil(news.length / newsPerPage);

  const offerItems = React.useMemo(() => {
    const start = (offerPage - 1) * offerPerPage;
    const end = start + offerPerPage;

    return offers.slice(start, end);
  }, [offerPage, offerPerPage]);

  const newsItems = React.useMemo(() => {
    const start = (newsPage - 1) * newsPerPage;
    const end = start + newsPerPage;

    return news.slice(start, end);
  }, [newsPage, newsPerPage]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.jpg)' }}>
        <h1 className="max-w-4/5 my-5 text-center text-white text-4xl font-bold">An tâm với mỗi chuyến bay của bạn</h1>
        <div className="lg:w-4/5 rounded-lg my-5">
          <Button
            onClick={() => router.push('/booking')}
          >
            Đặt vé ngay
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-3">
        <div className="w-full md:w-4/5 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between pb-6 gap-5">
            <p className="text-3xl font-semibold">Ưu đãi</p>
            <div className="flex flex-col md:flex-row gap-5">
              <Button as={Link} href="/offers" radius="sm" variant="bordered" color="primary" className="text-md">
                Xem tất cả
              </Button>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                variant="light"
                page={offerPage}
                total={offerPages}
                onChange={setOfferPage}
                siblings={0}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offerItems.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full md:w-4/5 px-8 py-6">
          <div className="flex flex-row items-center justify-center md:justify-between pb-6">
            <p className="text-3xl font-semibold">Điểm đến phổ biến</p>
          </div>
          <LocationCard />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mb-3">
        <div className="w-full md:w-4/5 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between pb-6 gap-5">
            <p className="text-3xl font-semibold">Tin tức & Nổi bật</p>
            <div className="flex flex-col md:flex-row gap-5">
              <Button as={Link} href="/news" radius="sm" variant="bordered" color="primary" className="text-md">
                Xem tất cả
              </Button>
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                variant="light"
                page={newsPage}
                total={newsPages}
                onChange={setNewsPage}
                siblings={0}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((newItem, index) => (
              <NewsCard key={index} {...newItem} link={`/news/${newItem.id}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
