"use client";
import OfferCard from "@/components/Card/OfferCard";
import FlightSearchCard from "@/components/Card/Search/FlightSearchCard";
import { Button, Pagination, Card, CardBody, Autocomplete, AutocompleteItem, Select, SelectItem, Input } from "@nextui-org/react";
import Link from "next/link";
import LocationCard from "@/components/Card/LocationCard";
import NewsCard from "@/components/Card/NewsCard";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api/config";
import { Promotion } from "@/interfaces/promotion";
import { News } from "@/interfaces/news";
import { Destination } from "@/interfaces/destination";
import Carousel from "@/components/carousel";
import { FaPlaneArrival, FaPlaneDeparture } from 'react-icons/fa';
import { useAppDispatch } from '@/components/redux/hooks';
import { setSearchParams } from '@/components/redux/feature/booking/bookingSlice';
import { Airport } from '@/interfaces/airport'; // Adjust import path as needed
import { Calendar, Users } from 'lucide-react';

const fetchDestinations = async () => {
  try {
    const response = await api.get(`http://localhost:5000/destination`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const fetchNews = async () => {
  try {
    const response = await api.get(`http://localhost:5000/news`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const fetchOffers = async () => {
  try {
    const response = await api.get(`http://localhost:5000/promotion`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [offerPage, setOfferPage] = React.useState(1);
  const [newsPage, setNewsPage] = React.useState(1);
  const [offerPerPage, setOfferPerPage] = React.useState(3);
  const [newsPerPage, setNewsPerPage] = React.useState(3);

  const [offers, setOffers] = React.useState<Promotion[]>([]);
  const [news, setNews] = React.useState<News[]>([]);
  const [destinations, setDestinations] = React.useState<Destination[]>([]);

  const [airports, setAirports] = useState<Airport[]>([]);
  const [searchForm, setSearchForm] = useState({
    departure: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    tripType: 'mot-chieu' as 'mot-chieu' | 'khu-hoi'
  });

  const fetchAirports = async () => {
    try {
      const response = await api.get<Airport[]>('http://localhost:5000/airport'); // Adjust API endpoint
      setAirports(response.data);
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  };

  useEffect(() => {
    fetchOffers().then((data) => {
      setOffers(data);
    });

    fetchDestinations().then((data) => {
      setDestinations(data);
    });

    fetchNews().then((data) => {
      setNews(data);
    });

    fetchAirports();
  }, []);

  const handleAirportSelect = (field: 'departure' | 'destination', value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle other input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSearch = () => {
    // Dispatch search parameters to Redux store
    dispatch(setSearchParams({
      departure: searchForm.departure,
      destination: searchForm.destination,
      departureDate: searchForm.departureDate,
      returnDate: searchForm.tripType === 'khu-hoi' ? searchForm.returnDate : undefined,
      passengers: searchForm.passengers,
      tripType: searchForm.tripType
    }));
  
    // Navigate to flight results page
      router.push('/booking/results');
  };

  const getAirportOptions = () => {
    return airports.map(airport => ({
        key: airport.id,
        label: `${airport.name} (${airport.city})`,
        value: airport.name // or use iataCode if preferred
    }));
  };

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
  }, [offerPage, offerPerPage, offers]);

  const newsItems = React.useMemo(() => {
    const start = (newsPage - 1) * newsPerPage;
    const end = start + newsPerPage;

    return news.slice(start, end);
  }, [newsPage, newsPerPage, news]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[70vh] bg-cover bg-center" style={{ backgroundImage: 'url(https://t4.ftcdn.net/jpg/02/35/49/01/360_F_235490181_DsgRd2Yrwx9fy2KLmfYgCkzX0W9xQEIU.jpg)' }}>
        <h1 className="max-w-4/5 my-5 text-center text-white text-4xl font-bold">Vui từng chuyến bay</h1>
        <div className="lg:w-4/5 rounded-lg my-5">
          {/* <Button
            onClick={() => router.push('/booking')}
          >
            Đặt vé ngay
          </Button> */}
          <Card className="w-full" shadow="md">
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row gap-4">
                {/* Departure Airport */}
                <Autocomplete
                  name='departure'
                  label="Điểm đi"
                  placeholder="Chọn điểm đi"
                  items={getAirportOptions()}
                  startContent={<FaPlaneDeparture className="text-default-400 text-xl" />}
                  onSelectionChange={(key) => {
                    const selected = airports.find((a) => a.id === Number(key));
                    handleAirportSelect("departure", selected?.city || "");
                  }}
                  className="w-full"
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                {/* Destination Airport */}
                <Autocomplete
                  name='destination'
                  label="Điểm đến"
                  placeholder="Chọn điểm đến"
                  items={getAirportOptions()}
                  startContent={<FaPlaneArrival className="text-default-400 text-xl" />}
                  onSelectionChange={(key) => {
                    const selected = airports.find((a) => a.id === Number(key));
                    handleAirportSelect("destination", selected?.city || "");
                  }}
                  className="w-full"
                >
                  {(item) => (
                    <AutocompleteItem key={item.key}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                {/* Trip Type */}
                <Select
                  name='tripType'
                  label="Loại chuyến bay"
                  value={searchForm.tripType}
                  onChange={handleInputChange}
                  className="w-full"
                >
                  <SelectItem key="mot-chieu" value="mot-chieu">
                    Một chiều
                  </SelectItem>
                  <SelectItem key="khu-hoi" value="khu-hoi">
                    Khứ hồi
                  </SelectItem>
                </Select>

                {/* Departure Date */}
                <Input
                  name="departureDate"
                  type="date"
                  label="Ngày đi"
                  placeholder="Chọn ngày đi"
                  value={searchForm.departureDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full"
                />

                {/* Return Date (conditional) */}
                {searchForm.tripType === 'khu-hoi' && (
                  <Input
                    name="returnDate"
                    type="date"
                    label="Ngày về"
                    placeholder="Chọn ngày về"
                    value={searchForm.returnDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full"
                  />
                )}

                {/* Passengers */}
                <Input
                  name="passengers"
                  type="number"
                  label="Số hành khách"
                  placeholder="Nhập số hành khách"
                  startContent={<Users className="text-default-400" />}
                  min={1}
                  max={10}
                  value={searchForm.passengers.toString()}
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <Button
                color="primary"
                className="mt-6"
                size="lg"
                onClick={handleSearch}
              >
                Tìm kiếm chuyến bay
              </Button>
            </CardBody>
          </Card>
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
          <div className="">
            {/* {destinations.map((destination, index) => (
              <LocationCard key={index} {...destination} />
            ))} */}
            <Carousel destinations={destinations} />
        </div>
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
            {newsItems.map((news, index) => (
              <NewsCard key={index} {...news} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
