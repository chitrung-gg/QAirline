"use client";
import ImageSection from "@/components/ImageSection";
import NewsCard from "@/components/Card/NewsCard";
import React from "react";
import { Pagination } from "@nextui-org/react";
import { News } from "@/interfaces/news";
import { api } from "@/utils/api/config";

export default function NewsPage() {
    const [page, setPage] = React.useState(1);
    const [newsPerPage, setNewsPerPage] = React.useState(3);
    const [isClient, setIsClient] = React.useState(false);
    const [news, setNews] = React.useState<News[]>([]);
    
    const fetchNews = async () => {
        try {
            const response = await api.get(`http://localhost:5000/news`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    React.useEffect(() => {
        fetchNews().then((data) => {
            setNews(data);
        });
    }, []);

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
      }, [page, newsPerPage, news]);

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
                                    <NewsCard {...newItem} />
                                </div>
                            )}

                            {/* md screen */}
                            {isClient && window.innerWidth >= 769 && window.innerWidth <= 1024 && index === 0 && (
                                <div className="md:col-span-2">
                                    <NewsCard {...newItem} />
                                </div>
                            )}
                            {isClient && window.innerWidth >= 769 && window.innerWidth <= 1024 && index !== 0 && index <= 4 && (
                                <div className="md:col-span-1">
                                    <NewsCard {...newItem} />
                                </div>
                            )}

                            {/* lg screen */}
                            {isClient && window.innerWidth > 1024 && index === 0 && (
                                <div className="lg:col-span-2">
                                    <NewsCard {...newItem} />
                                </div>
                            )}
                            {isClient && window.innerWidth > 1024 && index !== 0 && index < 5 && (
                                <div className="lg:col-span-1">
                                    <NewsCard {...newItem} />
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