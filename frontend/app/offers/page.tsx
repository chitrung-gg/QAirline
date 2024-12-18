"use client"

import { useState, useEffect } from 'react';
import ImageSection from "@/components/ImageSection";
import OfferCard from "@/components/Card/OfferCard";
import { promotionService } from '@/utils/services/promotionservice';
import { Promotion } from "@/interfaces/promotion";
import Loading from '@/components/Loading';

export default function OffersPage() {
    const [offers, setOffers] = useState<Promotion[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setIsLoading(true);
                const promotions = await promotionService.getAll();

                setOffers(promotions);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch offers');
                setIsLoading(false);
                console.error(err);
            }
        };

        fetchOffers();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

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

                {offers.length === 0 ? (
                    <div className="text-center text-gray-500">
                        Không có ưu đãi nào hiện tại
                    </div>
                ) : (
                    <div className="grid grid-cols-1 desktop:grid-cols-3 laptop:grid-cols-3 gap-8">
                        {offers.map((offer, index) => (
                            <OfferCard key={index} {...offer} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}