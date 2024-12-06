"use client";
import ImageSection from "@/components/ImageSection";
import NewsCard from "@/components/Card/NewsCard";
import React from "react";
import { Pagination } from "@nextui-org/react";

const news = [
    {
        id: 1,
        image: '/images/sky.jpg',
        title: 'Thông báo về việc mở rộng đường bay',
    },
    {
        id: 2,
        image: '/images/sky.jpg',
        title: 'Tiếp tục mở rộng đường bay',
    },
    {
        id: 3,
        image: '/images/sky.jpg',
        title: 'Mở rộng đường bay',
    },
    {
        id: 4,
        image: '/images/sky.jpg',
        title: 'Quyết định mở rộng đường bay',
    },
    {
        id: 5,
        image: '/images/sky.jpg',
        title: 'Mở rộng đường bay mới',
    },
    {
        id: 6,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 7,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 8,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 9,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 10,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 11,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 12,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 13,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 14,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 15,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 16,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 17,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 18,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
    {
        id: 19,
        image: '/images/sky.jpg',
        title: 'Thông báo mở rộng đường bay',
    },
];

export default function NewsPage() {
    const [page, setPage] = React.useState(1);
    const [newsPerPage, setNewsPerPage] = React.useState(3);
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
        setIsClient(true); 
    }, []);

    const updateItemsPerPage = () => {
        if (window.innerWidth <= 768) { //sm screen
        setNewsPerPage(3);
        }  else { 
        setNewsPerPage(5);
        }
    };

    React.useEffect(() => {
        if (isClient) { 
            updateItemsPerPage();
            window.addEventListener('resize', updateItemsPerPage);
            return () => {
                window.removeEventListener('resize', updateItemsPerPage);
            };
        }
    }, [isClient]);

    const pages = Math.ceil(news.length / newsPerPage);

    const newsItems = React.useMemo(() => {
        const start = (page - 1) * newsPerPage;
        const end = start + newsPerPage;
    
        return news.slice(start, end);
      }, [page, newsPerPage]);

    return (
        <div className="min-h-screen bg-gray-50">
            <ImageSection />

            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="flex items-center md:justify-start justify-center pb-12">
                    <p className="text-3xl font-semibold text-blue-normal">Tin tức & Nổi bật</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((newItem, index) => (
                        <React.Fragment key={index}>
                            {/* sm screen */}
                            {isClient && window.innerWidth <= 769 && (
                                <div className="sm:col-span-1">
                                    <NewsCard {...newItem} link={`/news/${newItem.id}`} />
                                </div>
                            )}

                            {/* md screen */}
                            {isClient && window.innerWidth >= 769 && window.innerWidth <= 1024 && index === 0 && (
                                <div className="md:col-span-2">
                                    <NewsCard {...newItem} link={`/news/${newItem.id}`} />
                                </div>
                            )}
                            {isClient && window.innerWidth >= 769 && window.innerWidth <= 1024 && index !== 0 && index <= 4 && (
                                <div className="md:col-span-1">
                                    <NewsCard {...newItem} link={`/news/${newItem.id}`} />
                                </div>
                            )}

                            {/* lg screen */}
                            {isClient && window.innerWidth > 1024 && index === 0 && (
                                <div className="lg:col-span-2">
                                    <NewsCard {...newItem} link={`/news/${newItem.id}`} />
                                </div>
                            )}
                            {isClient && window.innerWidth > 1024 && index !== 0 && index < 5 && (
                                <div className="lg:col-span-1">
                                    <NewsCard {...newItem} link={`/news/${newItem.id}`} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center justify-center pb-10">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    variant="light"
                    page={page}
                    total={pages}
                    onChange={setPage}
                    siblings={0}
                />
            </div>
            
        </div>
    )
}