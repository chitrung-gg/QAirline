--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--



--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--


--
-- Name: aboutus_category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.aboutus_category_enum AS ENUM (
    'Achievement',
    'Intro',
    'OurValue',
    'OurVision'
);


ALTER TYPE public.aboutus_category_enum OWNER TO postgres;

--
-- Name: aircraft_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.aircraft_status_enum AS ENUM (
    'Active',
    'Maintenance',
    'Retired'
);


ALTER TYPE public.aircraft_status_enum OWNER TO postgres;

--
-- Name: booking_bookingstatus_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.booking_bookingstatus_enum AS ENUM (
    'Confirmed',
    'Pending',
    'Cancelled'
);


ALTER TYPE public.booking_bookingstatus_enum OWNER TO postgres;

--
-- Name: booking_paymentstatus_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.booking_paymentstatus_enum AS ENUM (
    'Paid',
    'Pending',
    'Unpaid'
);


ALTER TYPE public.booking_paymentstatus_enum OWNER TO postgres;

--
-- Name: flight_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.flight_status_enum AS ENUM (
    'Scheduled',
    'Arrived',
    'Delayed',
    'Cancelled'
);


ALTER TYPE public.flight_status_enum OWNER TO postgres;

--
-- Name: news_category_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.news_category_enum AS ENUM (
    'Updates',
    'Announcements',
    'Tips'
);


ALTER TYPE public.news_category_enum OWNER TO postgres;

--
-- Name: payment_paymentstatus_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_paymentstatus_enum AS ENUM (
    'Paid',
    'Refunded',
    'Failed',
    'Pending'
);


ALTER TYPE public.payment_paymentstatus_enum OWNER TO postgres;

--
-- Name: promotion_discounttype_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.promotion_discounttype_enum AS ENUM (
    'Percentage',
    'FixedAmount'
);


ALTER TYPE public.promotion_discounttype_enum OWNER TO postgres;

--
-- Name: user_gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_gender_enum AS ENUM (
    'Male',
    'Female',
    'Other'
);


ALTER TYPE public.user_gender_enum OWNER TO postgres;

--
-- Name: user_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role_enum AS ENUM (
    'Admin',
    'User'
);


ALTER TYPE public.user_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: aboutus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aboutus (
    id integer NOT NULL,
    category public.aboutus_category_enum NOT NULL,
    title character varying(255) NOT NULL,
    content text[] NOT NULL,
    image text[],
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.aboutus OWNER TO postgres;

--
-- Name: aboutus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aboutus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aboutus_id_seq OWNER TO postgres;

--
-- Name: aboutus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aboutus_id_seq OWNED BY public.aboutus.id;


--
-- Name: aircraft; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aircraft (
    id integer NOT NULL,
    "aircraftCode" character varying(50) NOT NULL,
    model character varying(100) NOT NULL,
    manufacturer character varying(100) NOT NULL,
    capacity integer NOT NULL,
    "seatClasses" jsonb NOT NULL,
    status public.aircraft_status_enum DEFAULT 'Active'::public.aircraft_status_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.aircraft OWNER TO postgres;

--
-- Name: aircraft_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aircraft_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aircraft_id_seq OWNER TO postgres;

--
-- Name: aircraft_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aircraft_id_seq OWNED BY public.aircraft.id;


--
-- Name: airport; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.airport (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    "iataCode" character varying(10) NOT NULL
);


ALTER TABLE public.airport OWNER TO postgres;

--
-- Name: airport_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.airport_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.airport_id_seq OWNER TO postgres;

--
-- Name: airport_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.airport_id_seq OWNED BY public.airport.id;


--
-- Name: booking; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.booking (
    id integer NOT NULL,
    "passengerName" character varying(255) NOT NULL,
    "passengerEmail" character varying(100) NOT NULL,
    "passengerDob" timestamp without time zone NOT NULL,
    "passportNumber" character varying(50) NOT NULL,
    "bookingCode" character varying(50),
    "ticketPrice" jsonb NOT NULL,
    "totalPrice" double precision,
    "passengerNumber" integer,
    "seatClass" character varying(50) NOT NULL,
    "bookingDate" timestamp without time zone DEFAULT now(),
    "bookingStatus" public.booking_bookingstatus_enum DEFAULT 'Pending'::public.booking_bookingstatus_enum NOT NULL,
    "paymentStatus" public.booking_paymentstatus_enum DEFAULT 'Pending'::public.booking_paymentstatus_enum NOT NULL,
    "userId" integer,
    "flightId" integer,
    "promotionId" integer
);


ALTER TABLE public.booking OWNER TO postgres;

--
-- Name: booking_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.booking_id_seq OWNER TO postgres;

--
-- Name: booking_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.booking_id_seq OWNED BY public.booking.id;


--
-- Name: destination; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.destination (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    image character varying(255),
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL
);


ALTER TABLE public.destination OWNER TO postgres;

--
-- Name: destination_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.destination_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.destination_id_seq OWNER TO postgres;

--
-- Name: destination_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.destination_id_seq OWNED BY public.destination.id;


--
-- Name: faq; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.faq (
    id integer NOT NULL,
    question character varying(255) NOT NULL,
    answer text NOT NULL,
    category character varying(100),
    "sortOrder" integer DEFAULT 0 NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    language character varying(10) DEFAULT 'vi'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.faq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.faq_id_seq OWNER TO postgres;

--
-- Name: faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.faq_id_seq OWNED BY public.faq.id;


--
-- Name: flight; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flight (
    id integer NOT NULL,
    "flightNumber" character varying NOT NULL,
    "departureTime" timestamp without time zone NOT NULL,
    "arrivalTime" timestamp without time zone NOT NULL,
    status public.flight_status_enum DEFAULT 'Scheduled'::public.flight_status_enum NOT NULL,
    "availableSeats" integer NOT NULL,
    "seatClasses" jsonb NOT NULL,
    duration double precision,
    "baseClassPrice" jsonb,
    "aircraftId" integer,
    "departureAirportId" integer,
    "arrivalAirportId" integer
);


ALTER TABLE public.flight OWNER TO postgres;

--
-- Name: flight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.flight_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.flight_id_seq OWNER TO postgres;

--
-- Name: flight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.flight_id_seq OWNED BY public.flight.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    category public.news_category_enum DEFAULT 'Announcements'::public.news_category_enum NOT NULL,
    "coverImage" character varying(255),
    "isPublished" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    amount double precision NOT NULL,
    "paymentStatus" public.payment_paymentstatus_enum NOT NULL,
    "paymentMethod" character varying(50) NOT NULL,
    "transactionId" character varying(100),
    "paymentDate" timestamp without time zone NOT NULL,
    "isRefunded" boolean DEFAULT false NOT NULL,
    "refundAmount" double precision,
    "refundDate" timestamp without time zone,
    "bookingId" integer
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.payment_id_seq OWNER TO postgres;

--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: policy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.policy (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    "treeContent" jsonb,
    category character varying(100),
    "isActive" boolean DEFAULT true NOT NULL,
    language character varying(10) DEFAULT 'vi'::character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.policy OWNER TO postgres;

--
-- Name: policy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.policy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.policy_id_seq OWNER TO postgres;

--
-- Name: policy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.policy_id_seq OWNED BY public.policy.id;


--
-- Name: promotion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotion (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    description text NOT NULL,
    "coverImage" character varying(255),
    "startDate" timestamp without time zone NOT NULL,
    "endDate" timestamp without time zone NOT NULL,
    discount integer NOT NULL,
    "discountType" public.promotion_discounttype_enum NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.promotion OWNER TO postgres;

--
-- Name: promotion_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotion_id_seq OWNER TO postgres;

--
-- Name: promotion_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotion_id_seq OWNED BY public.promotion.id;


--
-- Name: refresh_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_token (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    token character varying NOT NULL,
    "userId" integer NOT NULL,
    "expiryDate" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.refresh_token OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    "phoneNumber" character varying(20),
    "firstName" character varying(50),
    "lastName" character varying(50),
    dob timestamp without time zone,
    gender public.user_gender_enum,
    address character varying(255),
    "passportNumber" character varying(20),
    role public.user_role_enum DEFAULT 'User'::public.user_role_enum NOT NULL,
    "accessToken" character varying(255),
    "refreshToken" character varying(255)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: verification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification (
    id integer NOT NULL,
    token character varying NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now(),
    "updatedAt" timestamp without time zone DEFAULT now(),
    "userId" integer
);


ALTER TABLE public.verification OWNER TO postgres;

--
-- Name: verification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.verification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verification_id_seq OWNER TO postgres;

--
-- Name: verification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.verification_id_seq OWNED BY public.verification.id;


--
-- Name: aboutus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aboutus ALTER COLUMN id SET DEFAULT nextval('public.aboutus_id_seq'::regclass);


--
-- Name: aircraft id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aircraft ALTER COLUMN id SET DEFAULT nextval('public.aircraft_id_seq'::regclass);


--
-- Name: airport id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airport ALTER COLUMN id SET DEFAULT nextval('public.airport_id_seq'::regclass);


--
-- Name: booking id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking ALTER COLUMN id SET DEFAULT nextval('public.booking_id_seq'::regclass);


--
-- Name: destination id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destination ALTER COLUMN id SET DEFAULT nextval('public.destination_id_seq'::regclass);


--
-- Name: faq id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq ALTER COLUMN id SET DEFAULT nextval('public.faq_id_seq'::regclass);


--
-- Name: flight id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight ALTER COLUMN id SET DEFAULT nextval('public.flight_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: policy id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.policy ALTER COLUMN id SET DEFAULT nextval('public.policy_id_seq'::regclass);


--
-- Name: promotion id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion ALTER COLUMN id SET DEFAULT nextval('public.promotion_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: verification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification ALTER COLUMN id SET DEFAULT nextval('public.verification_id_seq'::regclass);


--
-- Data for Name: aboutus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aboutus (id, category, title, content, image, "isActive", "createdAt", "updatedAt") FROM stdin;
1	Intro	Chào mừng đến với QAirline	{"QAirline là một hãng hàng không mới, sáng tạo, cam kết cung cấp các chuyến bay giá cả phải chăng và thoải mái trên toàn thế giới."}	{https://media.istockphoto.com/id/155380716/photo/commercial-jet-flying-over-clouds.jpg?s=612x612&w=0&k=20&c=idhnJ7ZdrLA1Dv5GO2R28A8WCx1SXCFVLu5_2cfdvXw=}	t	2024-01-01 07:00:00	2024-12-21 00:06:31.315732
2	Achievement	Những cột mốc của chúng tôi	{"Trong năm hoạt động đầu tiên, chúng tôi đã thành công khai thác 10 tuyến bay nội địa và 5 tuyến bay quốc tế.","Chúng tôi đã giành được sự tin tưởng của khách hàng nhờ vào độ chính xác giờ bay và dịch vụ tuyệt vời trên chuyến bay.","Đội ngũ của chúng tôi đã làm việc chăm chỉ để đảm bảo rằng mọi chuyến bay đều diễn ra suôn sẻ và đúng giờ.","Chúng tôi luôn đặt chất lượng dịch vụ lên hàng đầu và sẽ tiếp tục phát triển để mang đến những giá trị tốt nhất cho hành khách."}	{https://nmgprod.s3.amazonaws.com/media/files/60/6d/606d1f5063c95e0252650d864029ea93/cover_image_1682513560.jpeg.760x400_q85_crop_upscale.jpg,https://www.revechat.com/wp-content/uploads/2023/01/customer-service-examples-in-airline-industry-jpg.webp,https://www.workvivo.com/uploads/WV_Airline_Employee_Blog_Header_1_1fffe629cd.png,https://media.cntraveler.com/photos/53da98b16dec627b149f5608/master/pass/flight-attendant-good-looking.jpg}	t	2024-01-01 07:00:00	2024-12-21 00:30:59.580469
3	OurValue	Khách hàng là trọng tâm	{"Chúng tôi coi trọng khách hàng và cam kết mang đến trải nghiệm bay đẳng cấp thế giới."}	{https://engineservicedesign.com/hubfs/Six%20ways%20to%20improve%20customer%20experience%20in%20aviation.jpg}	t	2024-01-01 07:00:00	2024-12-21 00:31:18.780709
4	OurVision	Kết nối toàn cầu	{"Chúng tôi hình dung một thế giới mà việc đi lại bằng máy bay trở nên dễ dàng, thuận tiện và phải chăng đối với tất cả mọi người."}	{https://liveandletsfly.com/wp-content/uploads/2024/01/United-AIrlines-Flight-Attendants-Compliments.jpg}	t	2024-01-01 07:00:00	2024-12-21 00:31:33.663832
\.


--
-- Data for Name: aircraft; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aircraft (id, "aircraftCode", model, manufacturer, capacity, "seatClasses", status, "createdAt", "updatedAt") FROM stdin;
1	A320-200	Airbus A320	Airbus	200	{"Economy": 100, "Business": 70, "First Class": 30}	Active	2024-12-20 15:48:57.411	2024-12-20 15:48:57.411
2	B737-800	Boeing 737-800	Boeing	300	{"Economy": 150, "Business": 90, "First Class": 60}	Active	2024-12-20 15:50:30.973	2024-12-20 15:50:30.973
\.


--
-- Data for Name: airport; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.airport (id, name, city, country, "iataCode") FROM stdin;
1	Sân bay quốc tế Nội Bài	Hà Nội	Việt Nam	HAN
2	Sân bay quốc tế Tân Sơn Nhất	Hồ Chí Minh	Việt Nam	SGN
3	Sân bay quốc tế Đà Nẵng	Đà Nẵng	Việt Nam	DAD
4	Sân bay quốc tế Cam Ranh	Nha Trang	Việt Nam	CXR
\.


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.booking (id, "passengerName", "passengerEmail", "passengerDob", "passportNumber", "bookingCode", "ticketPrice", "totalPrice", "passengerNumber", "seatClass", "bookingDate", "bookingStatus", "paymentStatus", "userId", "flightId", "promotionId") FROM stdin;
1	Vương Thị Thu Trang	trangvuong2810@gmail.com	2004-10-28 07:00:00	A123456	A320-200-KZOK	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	1600000	1	Economy	2024-12-20 16:02:59.044	Confirmed	Paid	1	1	1
2	Vương Thị Thu Trang	trangvuong2810@gmail.com	2004-10-28 07:00:00	A123456	B737-800-FHUU	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	1600000	2	Economy	2024-12-20 16:37:48.676	Cancelled	Paid	1	2	1
3	Nguyễn Chí Trung	22028075@vnu.edu.vn	2004-01-31 07:00:00	A1234567	B737-800-GND6	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	4000000	1	Business	2024-12-20 16:45:19.238	Cancelled	Paid	1	2	1
4	Nguyễn Chí Trung	22028075@vnu.edu.vn	2004-01-31 07:00:00	A1234567	B737-800-I6ZF	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	1600000	2	Economy	2024-12-20 17:05:25.243	Confirmed	Paid	1	2	1
5	Nguyễn Chí Trung	22028075@vnu.edu.vn	2004-01-31 07:00:00	A1234567	A320-200-AYUI	{"Economy": 1500000, "Business": 2500000, "First Class": 3000000}	1200000	2	Economy	2024-12-20 17:05:25.574	Confirmed	Paid	1	3	1
\.


--
-- Data for Name: destination; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.destination (id, name, description, image, city, country) FROM stdin;
1	Chùa Một Cột	Chùa Một Cột, một trong những công trình kiến trúc độc đáo của Hà Nội, nổi bật với hình dáng giống như một đóa hoa sen đang nở.	https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/30/chua-mot-cot-1-0936.jpg	Hà Nội	Việt Nam
4	Nhà thờ Đức Bà	Nhà thờ Đức Bà là một công trình kiến trúc đẹp mắt tại trung tâm thành phố Hồ Chí Minh, với kiến trúc Pháp cổ điển và tháp chuông cao.	https://vcdn1-vnexpress.vnecdn.net/2024/12/06/z6103334811324-c5f6c245f9dd410-7002-6970-1733468324.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=q9afzAM4qB5WYN1_TNJywg	Hồ Chí Minh	Việt Nam
3	Đà Nẵng	Đà Nẵng, thành phố miền Trung Việt Nam, nổi tiếng với bãi biển Mỹ Khê tuyệt đẹp, cầu Rồng và các khu nghỉ dưỡng cao cấp.	https://cdn1.tuoitre.vn/thumb_w/1200/471584752817336320/2023/8/24/photo-1692872954009-1692872954520285942304-40-0-789-1430-crop-16928741174752051082914.jpg	Đà Nẵng	Việt Nam
2	Nha Trang	Nha Trang là một thành phố biển nổi tiếng với bãi biển đẹp, các khu nghỉ dưỡng sang trọng và các điểm tham quan hấp dẫn như Vinpearl Land.	https://nhatrang-tourist.com/image/cache/catalog/tour-1-ngay/review%20vinpearl%202%20ng%C3%A0y%201%20%C4%91i%C3%AAm/kinh-nghiem-di-vinpearl-nha-trang-2-ngay-1-dem%20(1)-1400x875.jpg	Nha Trang	Việt Nam
\.


--
-- Data for Name: faq; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.faq (id, question, answer, category, "sortOrder", "isActive", language, "createdAt", "updatedAt") FROM stdin;
2	Tôi có thể tra cứu lịch bay ở đâu?	Quý khách có thể tra cứu thông tin lịch bay tại tính năng "Thông tin hành trình" trên website của QAirline.	\N	0	t	vi	2024-12-20 16:55:46.573285	2024-12-20 16:55:46.573285
3	Tôi được mang bao nhiêu kg/kiện hành lý xách tay?	Quý khách được mang Hành lý xách tay theo tiêu chuẩn như sau:\n\n            1. Về trọng lượng:\n            Đối với hạng Phổ thông: 12kg/ 26lb bao gồm 01 kiện xách tay không quá 10kg / 22lb và 01 phụ kiện;\n            Đối với hạng Phổ thông đặc biệt / hạng Thương gia: 18kg / 40lb gồm 02 kiện(mỗi kiện không quá 10kg / 22lb) và 01 phụ kiện.\n\n            2. Về kích thước: tổng kích thước tối đa 3 chiều(dài, rộng, cao) cần đảm bảo:\n            Đối với 01 kiện xách tay: 115cm(56cm x 36cm x 23cm);\n            Đối với 01 phụ kiện: 40cm x 30cm x 15cm.\n\n            Ngoài tiêu chuẩn hành lý xách tay nêu trên, hành khách được phép mang đồ dùng cá nhân lên máy bay miễn phí.	\N	0	t	vi	2024-12-20 16:56:12.952627	2024-12-20 16:57:20.365686
4	Quy định về trọng lượng và kích thước của một kiện hành lý ký gửi khi đi máy bay như thế nào?	Kích thước tiêu chuẩn của một kiện hành lý ký gửi như sau:\n\n            1. Về trọng lượng:\n            - Hạng thương gia: trọng lượng 32kg/70lb\n            - Hạng phổ thông đặc biệt/phổ thông: trọng lượng 23kg/50lb\n\n            2. Về kích thước: tổng kích thước 3 chiều (dài, rộng, cao) không được vượt quá 158cm/62in\n\n            Nếu mỗi kiện hành lý vượt quá tiêu chuẩn nêu trên, hành khách sẽ được yêu cầu đóng gói lại hành lý và trả phí theo hành lý tính cước tại sân bay hoặc được yêu cầu gửi theo đường hàng hóa.	\N	0	t	vi	2024-12-20 16:57:34.179204	2024-12-20 16:58:11.453392
5	Làm thế nào để chọn được giá tốt nhất khi mua vé máy bay trên website của QAirline?	Khi tìm kiếm chuyến bay trên website hoặc ứng dụng di động của QAirline, hệ thống luôn hiển thị thông tin mức giá thấp nhất còn chỗ giúp Quý khách dễ dàng lựa chọn.\n                Bên cạnh đó, Quý khách nên có kế hoạch mua vé máy bay sớm đặc biệt đặt vé máy bay vào các chuyến sáng sớm hoặc tối muộn.	\N	0	t	vi	2024-12-20 16:58:37.823119	2024-12-20 16:58:37.823119
1	Sau khi nhận được hành lý, tôi phát hiện dấu hiệu bị hư hỏng hoặc mất mát, thất lạc thì tôi phải làm gì?	Ngay khi phát hiện hành lý của mình bị hư hỏng, mất mát hoặc không nhận được hành lý, Quý khách vui lòng liên hệ với nhân viên tại quầy hành lý thất lạc tại sân bay để được hỗ trợ.	\N	0	t	vi	2024-12-20 16:55:19.986831	2024-12-20 16:59:12.63634
\.


--
-- Data for Name: flight; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flight (id, "flightNumber", "departureTime", "arrivalTime", status, "availableSeats", "seatClasses", duration, "baseClassPrice", "aircraftId", "departureAirportId", "arrivalAirportId") FROM stdin;
1	QA001	2024-12-20 13:05:00	2024-12-20 15:10:00	Scheduled	199	{"Economy": 99, "Business": 70, "First Class": 30}	125	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	1	1	2
2	QA002	2024-12-24 13:15:00	2024-12-24 14:40:00	Scheduled	296	{"Economy": 146, "Business": 90, "First Class": 60}	85	{"Economy": 2000000, "Business": 5000000, "First Class": 7000000}	2	3	1
3	QA003	2024-12-27 15:00:00	2024-12-27 16:25:00	Scheduled	198	{"Economy": 98, "Business": 70, "First Class": 30}	85	{"Economy": 1500000, "Business": 2500000, "First Class": 3000000}	1	1	3
4	QA004	2024-12-28 23:05:00	2024-12-29 00:10:00	Scheduled	200	{"Economy": 100, "Business": 70, "First Class": 30}	65	{"Economy": 1500000, "Business": 3000000, "First Class": 4000000}	1	2	4
5	QA005	2024-12-31 21:25:00	2024-12-31 22:30:00	Scheduled	300	{"Economy": 150, "Business": 90, "First Class": 60}	65	{"Economy": 1500000, "Business": 3000000, "First Class": 4000000}	2	4	2
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, title, content, category, "coverImage", "isPublished", "createdAt", "updatedAt") FROM stdin;
3	Thông điệp từ QAirline	Chúng tôi rất vui mừng thông báo về sự ra mắt của website QAirline. Đây là một bước tiến quan trọng trong hành trình phát triển của hãng, mang đến cho khách hàng một nền tảng đặt vé máy bay trực tuyến nhanh chóng, tiện lợi và dễ sử dụng.\n\nDù mới chỉ vừa bắt đầu hành trình, QAirline cam kết sẽ nỗ lực hết mình để cung cấp dịch vụ hàng không chất lượng cao, với các chuyến bay trong nước và quốc tế, cùng với hệ thống đặt vé an toàn, bảo mật và dễ dàng. Chúng tôi mong muốn giúp khách hàng có thể tiếp cận dịch vụ của mình một cách đơn giản nhất, đồng thời cải thiện trải nghiệm của bạn từ những bước đầu tiên cho đến khi kết thúc chuyến bay.\n\nWebsite QAirline không chỉ cung cấp thông tin đầy đủ về các chuyến bay, mà còn cho phép khách hàng dễ dàng so sánh giá vé, đặt vé trực tuyến và thanh toán nhanh chóng. Chúng tôi hy vọng sẽ đồng hành cùng bạn trong những chuyến đi sắp tới, mang lại sự tiện lợi và tiết kiệm tối đa.\n\nVới sự tập trung vào dịch vụ khách hàng, chúng tôi cam kết sẽ tiếp tục cải tiến và cập nhật những tính năng mới, giúp tối ưu hóa lợi ích cho khách hàng. Mặc dù là một hãng hàng không trẻ, nhưng chúng tôi luôn tin tưởng vào khả năng mang lại những trải nghiệm tốt nhất cho hành khách.\n\nQAirline xin chân thành cảm ơn và rất mong được đồng hành cùng bạn trong những chuyến bay sắp tới!	Announcements	https://static.tuoitre.vn/tto/i/s626/2014/11/28/l02zBGnn.jpg	t	2024-12-20 21:56:05.56008	2024-12-20 21:56:47.809222
2	Cảnh giác với thủ đoạn giả mạo Cục Hàng không Việt Nam thông báo hủy chuyến bay để lừa đảo	Bằng thủ đoạn mạo danh Cục Hàng không Việt Nam và thông báo chuyến bay bị hủy, các đối tượng lừa đảo sẽ yêu cầu người dân truy cập vào website giả mạo để đặt lại vé, nhằm thu thập dữ liệu cá nhân và lừa đảo chiếm đoạt tài sản...\n\nNgày 29/10/2024, Công an TP. Đà Nẵng đưa thông tin cảnh báo đến người dân về những chiêu lừa đảo mới và khuyến cáo nguyên tắc “3 không” để phòng tránh. Đơn cử, trên không gian mạng đã xuất hiện hình thức lừa đảo trực tuyến mới giả mạo Cục Hàng không Việt Nam thông báo chuyến bay bị hủy.\n\nTheo đó, các đối tượng lừa đảo thu thập dữ liệu thông tin chuyến bay của khách hàng sau đó tạo lập các tài khoản Facebook giả mạo Cục Hàng không Việt Nam để gọi điện, nhắn tin cho khách hàng. Sau đó thông báo chuyến bay bị hủy và yêu cầu người dân truy cập vào trang website giả mạo https://cuchangkhongvietnam.com/ để đặt lại vé, nhằm thu thập dữ liệu cá nhân và lừa đảo chiếm đoạt tài sản.\n\nThực tế website chính thức của Cục Hàng không Việt Nam có địa chỉ là: https://caa.gov.vn/\n\nTrước tình hình này, Phòng An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao – Công an TP.Đà Nẵng khuyến cáo người dân cần nâng cao cảnh giác hơn nữa khi sử dụng các nền tảng mạng xã hội. Người dân cần tuân thủ theo nguyên tắc “3 KHÔNG”: Không cung cấp thông tin cá nhân, tài khoản ngân hàng, số thẻ tín dụng qua điện thoại, tin nhắn hay email - Không truy cập đường link thanh toán từ tin nhắn hoặc email không rõ nguồn gốc - Không tải về những app không rõ nguồn gốc để tránh bị đánh cắp thông tin cá nhân. Khi thực hiện thanh toán hóa đơn trực tuyến, người dân cần truy cập trực tiếp vào website hoặc ứng dụng chính thức của đơn vị cung cấp dịch vụ.\n\nQAirline trân trọng khuyến nghị hành khách luôn nâng cao cảnh giác với các thủ đoạn lừa đảo công nghệ cao. Nếu nhận thấy có dấu hiệu đáng ngờ hoặc phát hiện bị lừa đảo, hành khách cần ngay lập tức trình báo cho cơ quan Công an gần nhất để được hỗ trợ. 	Announcements	https://www.bambooairways.com/documents/d/global/canh-giac-voi-thu-oan-gia-mao-cuc-hang-khong-viet-nam-jpg	t	2024-12-20 16:49:20.791	2024-12-21 00:19:03.843
1	Ra mắt Website QAirline: Đặt vé máy bay trực tuyến dễ dàng và tiện lợi	[Hà Nội, Tháng 12] – Chúng tôi rất vui mừng thông báo về sự ra mắt của website QAirline, một nền tảng đặt vé máy bay trực tuyến hoàn toàn mới, mang đến trải nghiệm nhanh chóng, tiện lợi và tiết kiệm cho tất cả khách hàng.\n\nWebsite QAirline được thiết kế hiện đại với giao diện thân thiện, giúp người dùng dễ dàng tìm kiếm và đặt vé máy bay cho chuyến đi trong nước và quốc tế. Với các tính năng tiên tiến và quy trình đặt vé đơn giản, chúng tôi cam kết mang lại sự hài lòng tuyệt đối cho mọi hành khách.\n\nNhững Tính Năng Mới\nGiao Diện Thân Thiện: Giao diện website được tối ưu hóa để bạn có thể tìm vé máy bay một cách nhanh chóng và dễ dàng. Chỉ cần nhập điểm đi, điểm đến và ngày bay, bạn sẽ nhận được các lựa chọn vé phù hợp nhất.\n\nSo Sánh Giá Vé: Bạn có thể so sánh giá vé giữa các hãng hàng không khác nhau để tìm được lựa chọn phù hợp với ngân sách và lịch trình của mình.\n\nĐặt Vé Nhanh Chóng: Quy trình đặt vé nhanh chóng, cho phép bạn hoàn tất việc đặt vé trong vài phút mà không cần phải đi qua quá nhiều bước.\n\nThanh Toán An Toàn: Chúng tôi cung cấp các phương thức thanh toán đa dạng, từ thẻ tín dụng đến chuyển khoản ngân hàng, với hệ thống bảo mật cao để đảm bảo an toàn cho mọi giao dịch.\n\nHỗ Trợ 24/7: Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ bạn bất cứ lúc nào, từ việc giải đáp thắc mắc cho đến hỗ trợ trong việc thay đổi lịch bay hoặc hoàn vé.\n\nLý Do Bạn Nên Chọn QAirline?\nTiện Lợi và Tiết Kiệm Thời Gian: Không cần phải đến tận đại lý hoặc gọi điện thoại. Chỉ cần vài thao tác đơn giản trên website, bạn có thể tìm kiếm và đặt vé ngay lập tức.\n\nLựa Chọn Hãng Hàng Không Đa Dạng: Website của chúng tôi cung cấp vé máy bay từ nhiều hãng hàng không lớn trong nước và quốc tế, giúp bạn dễ dàng lựa chọn chuyến bay phù hợp với lịch trình và ngân sách của mình.\n\nGiá Cả Cạnh Tranh: Chúng tôi cam kết cung cấp giá vé máy bay tốt nhất với các ưu đãi hấp dẫn, giúp bạn tiết kiệm chi phí cho mỗi chuyến đi.\n\nCập Nhật Thông Tin Mới Nhất: Chúng tôi cung cấp thông tin chi tiết về các chuyến bay, lịch bay và tình trạng vé để bạn có thể đưa ra quyết định đặt vé nhanh chóng và chính xác.\n\nKhuyến Mãi Đặc Biệt\nĐể kỷ niệm sự ra mắt của website mới, chúng tôi đang có chương trình khuyến mãi hấp dẫn dành riêng cho khách hàng đặt vé trong thời gian giới hạn. Đừng bỏ lỡ cơ hội sở hữu vé máy bay giá rẻ cùng những ưu đãi đặc biệt!\n\nTruy Cập Ngay Website QAirline tại [URL Website] để tìm vé máy bay tốt nhất cho chuyến đi của bạn!\n\n---\n\nVề QAirline\nQAirline là một trong những đơn vị cung cấp dịch vụ đặt vé máy bay trực tuyến uy tín, giúp khách hàng dễ dàng tìm kiếm và đặt vé từ hàng ngàn chuyến bay trong nước và quốc tế. Chúng tôi luôn đặt chất lượng dịch vụ và sự hài lòng của khách hàng lên hàng đầu, đồng thời cam kết cung cấp các giải pháp tiện ích và tiết kiệm cho người sử dụng.\n\nĐể biết thêm thông tin chi tiết, vui lòng liên hệ: 1900 3101	Announcements	https://assets.fta.cirium.com/wp-content/uploads/2021/12/03211704/ASir-image-3.jpg	t	2024-12-20 15:18:35.16	2024-12-21 00:19:41.757
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, amount, "paymentStatus", "paymentMethod", "transactionId", "paymentDate", "isRefunded", "refundAmount", "refundDate", "bookingId") FROM stdin;
\.


--
-- Data for Name: policy; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.policy (id, title, "treeContent", category, "isActive", language, "createdAt", "updatedAt") FROM stdin;
1	Chính sách bảo vệ hành khách của QAirLine	{"sections": [{"title": "1. Trường hợp số lượng hành khách làm thủ tục lên tàu nhiều hơn so với số ghế thực tế của máy bay", "content": "Trong một số trường hợp, chúng tôi không thể cung cấp chỗ ngồi cho hành khách mặc dù hành khách đã có vé và làm thủ tục lên máy bay. Trường hợp này xảy ra nếu số lượng hành khách làm thủ tục vượt quá số ghế thực tế của máy bay.", "subsections": [{"title": "Thông báo khi bị từ chối lên máy bay", "content": "Nếu hành khách chủ động nhường chỗ cho hành khách khác hoặc bị từ chối lên máy bay, chúng tôi sẽ đền bù và thu xếp chuyến bay thay thế. Chúng tôi sẽ thông báo đến hành khách giải thích các quyền lợi và đền bù theo chính sách của QAirline trừ các trường hợp được miễn trừ bồi thường theo quy định của pháp luật.", "subsections": []}]}, {"title": "2. Các trách nhiệm đối với hành lý bị hỏng hóc", "content": "Nếu hành lý kí gửi của hành khách bị hư hỏng hoặc thất lạc, hãy điền các thông tin cần thiết vào bản khai báo tại Quầy hành lý bị thất lạc trong thời gian sớm nhất.", "subsections": []}, {"title": "3. Cung cấp thông tin về Hoàn/Hủy đổi vé/thay đổi hành trình", "content": "Trường hợp muốn hoàn vé, hành khách vui lòng liên lạc với nơi xuất vé để được hỗ trợ. Nếu hành khách gửi yêu cầu hoàn vé qua thư điện tử, yêu cầu hoàn vé phải được gửi từ địa chỉ thư điện tử mà hành khách đã đăng ký trong quá trình đặt chỗ, mua vé, nếu không yêu cầu hoàn vé của hành khách sẽ không được chấp nhận.", "subsections": []}, {"title": "4. QAirline đáp ứng các yêu cầu cần thiết trong các trường hợp chuyến bay bất thường", "content": "Trong thời gian chờ đợi thực hiện chuyến bay tại sân bay, đối với những hành khách có vé đã được xác nhận chỗ nhưng việc vận chuyển bị gián đoạn, bị chậm, huỷ chuyến, chúng tôi sẽ phục vụ hành khách một số dịch vụ như sau:", "subsections": [{"title": "4.1. Các dịch vụ cung cấp tại sân bay", "content": "Phục vụ đồ uống và các dịch vụ hỗ trợ khác nếu chuyến bay bị chậm hoặc huỷ.", "subsections": []}, {"title": "4.2. Bồi thường cho hành khách", "content": "Đối với các chuyến bay ngoài lãnh thổ Việt Nam, sẽ theo quy định của nước sở tại hoặc quy định của chúng tôi. Việc bồi thường sẽ được thực hiện tại sân bay hoặc các chi nhánh của QAirline tùy từng trường hợp cụ thể.", "subsections": []}, {"title": "4.3. Các trường hợp miễn trừ trách nhiệm", "content": "Chuyến bay bị chậm, hủy vì lý do bất khả kháng như ảnh hưởng của thời tiết, theo yêu cầu của nhà chức trách, an ninh hàng không, xung đột vũ trang...", "subsections": []}, {"title": "4.4. Hoàn vé cho khách", "content": "Hành khách sẽ được miễn trừ các điều kiện hạn chế và phí hoàn vé (nếu có) nếu QAirline thay đổi lịch bay ít nhất 1 ngày trước ngày khởi hành dự kiến và chuyến bay bị ảnh hưởng như sau: chuyến bay bị chậm/khởi hành sớm làm mất nối chuyến đến điểm dừng tiếp theo trong hành trình và không có phương án thay thế.", "subsections": []}]}, {"title": "5. Thông báo kịp thời về các thay đổi trong hành trình của hành khách", "content": "Chúng tôi sẽ thông báo kịp thời về các thay đổi liên quan đến chuyến bay của hành khách. Chúng tôi sẽ thông báo cho hành khách về các thay đổi của chuyến bay dựa trên các thông tin liên lạc hành khách đã cung cấp khi đặt chỗ.", "subsections": []}]}	Bảo vệ hành khách	t	vi	2024-12-20 07:00:00	2024-12-20 07:00:00
\.


--
-- Data for Name: promotion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotion (id, code, description, "coverImage", "startDate", "endDate", discount, "discountType", "isActive") FROM stdin;
1	HELLOQAIRLINE	Nhân dịp ra mắt Website, giảm trực tiếp 20% vào giá vé.	https://img.freepik.com/premium-vector/coupon-mockup-with-20-percent-off-discount-voucher-gift-coupon-coupon-promotion-sale-vector_662353-252.jpg	2024-12-20 15:28:16	2024-12-27 15:28:16	20	Percentage	t
\.


--
-- Data for Name: refresh_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_token (id, token, "userId", "expiryDate") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, username, password, "phoneNumber", "firstName", "lastName", dob, gender, address, "passportNumber", role, "accessToken", "refreshToken") FROM stdin;
2	22028075@vnu.edu.vn	chitrung	$2b$10$Lvajyc9XQHjRDHCnWX54q.tuHVJHuUYuzDyOQTFeXUbok5BXeBdia	0986187722	\N	\N	\N	\N	\N	\N	User	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJjaGl0cnVuZyIsImVtYWlsIjoiMjIwMjgwNzVAdm51LmVkdS52biIsImlhdCI6MTczNDcwODUxOSwiZXhwIjoxNzM0NzIyOTE5fQ.0ll4Nasq6YWtMbKUJvzuUJjw23sfQmvhRyIEC1LMfg0
1	admin@qairline.com	admin	$2b$10$iolDkaolwn0D3KGj.SfSCeuKyhwinoU3YqPum5SBHJeiXQKaMf8Ea	0982621500	Admin	QAirline	\N	\N	\N	\N	Admin	\N	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AcWFpcmxpbmUuY29tIiwiaWF0IjoxNzM0NzE1MTE0LCJleHAiOjE3MzQ3Mjk1MTR9.gKe-TgPY7DdWLME5_Zxi2uOBCybai-p7QykC6O0UFw8
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification (id, token, "expiresAt", "createdAt", "updatedAt", "userId") FROM stdin;
\.


--
-- Name: aboutus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aboutus_id_seq', 4, true);


--
-- Name: aircraft_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aircraft_id_seq', 2, true);


--
-- Name: airport_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.airport_id_seq', 4, true);


--
-- Name: booking_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booking_id_seq', 5, true);


--
-- Name: destination_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.destination_id_seq', 4, true);


--
-- Name: faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.faq_id_seq', 5, true);


--
-- Name: flight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.flight_id_seq', 5, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 3, true);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: policy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.policy_id_seq', 1, true);


--
-- Name: promotion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotion_id_seq', 2, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: verification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verification_id_seq', 1, false);


--
-- Name: news PK_39a43dfcb6007180f04aff2357e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY (id);


--
-- Name: aircraft PK_46f8c680e9ff88a752b7834bba4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aircraft
    ADD CONSTRAINT "PK_46f8c680e9ff88a752b7834bba4" PRIMARY KEY (id);


--
-- Name: booking PK_49171efc69702ed84c812f33540; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY (id);


--
-- Name: policy PK_9917b0c5e4286703cc656b1d39f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.policy
    ADD CONSTRAINT "PK_9917b0c5e4286703cc656b1d39f" PRIMARY KEY (id);


--
-- Name: refresh_token PK_b575dd3c21fb0831013c909e7fe; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_token
    ADD CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY (id);


--
-- Name: flight PK_bf571ce6731cf071fc51b94df03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: faq PK_d6f5a52b1a96dd8d0591f9fbc47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.faq
    ADD CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY (id);


--
-- Name: aboutus PK_dcb4312481d4da3caf80364246a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aboutus
    ADD CONSTRAINT "PK_dcb4312481d4da3caf80364246a" PRIMARY KEY (id);


--
-- Name: destination PK_e45b5ee5788eb3c7f0ae41746e7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.destination
    ADD CONSTRAINT "PK_e45b5ee5788eb3c7f0ae41746e7" PRIMARY KEY (id);


--
-- Name: airport PK_ea1ecba8dec9bee0cb60194e788; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.airport
    ADD CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY (id);


--
-- Name: verification PK_f7e3a90ca384e71d6e2e93bb340; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT "PK_f7e3a90ca384e71d6e2e93bb340" PRIMARY KEY (id);


--
-- Name: promotion PK_fab3630e0789a2002f1cadb7d38; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT "PK_fab3630e0789a2002f1cadb7d38" PRIMARY KEY (id);


--
-- Name: payment PK_fcaec7df5adf9cac408c686b2ab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY (id);


--
-- Name: aircraft UQ_12a15a51f405ab178834d2c30f4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aircraft
    ADD CONSTRAINT "UQ_12a15a51f405ab178834d2c30f4" UNIQUE ("aircraftCode");


--
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- Name: promotion UQ_969359329a22440d2b8f7d491d4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotion
    ADD CONSTRAINT "UQ_969359329a22440d2b8f7d491d4" UNIQUE (code);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: flight UQ_f3e21c00ba40ed321afed8dc1e1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT "UQ_f3e21c00ba40ed321afed8dc1e1" UNIQUE ("flightNumber");


--
-- Name: aircraftIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "aircraftIndex" ON public.flight USING btree ("aircraftId");


--
-- Name: arrivalAirportIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "arrivalAirportIndex" ON public.flight USING btree ("arrivalAirportId");


--
-- Name: bookingIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "bookingIndex" ON public.payment USING btree ("bookingId");


--
-- Name: departureAirportIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "departureAirportIndex" ON public.flight USING btree ("departureAirportId");


--
-- Name: flightIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "flightIndex" ON public.booking USING btree ("flightId");


--
-- Name: promotionIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "promotionIndex" ON public.booking USING btree ("promotionId");


--
-- Name: userIndex; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "userIndex" ON public.booking USING btree ("userId");


--
-- Name: booking FK_336b3f4a235460dc93645fbf222; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_336b3f4a235460dc93645fbf222" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight FK_3a0c5e1517f31f39132ab8ed209; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT "FK_3a0c5e1517f31f39132ab8ed209" FOREIGN KEY ("departureAirportId") REFERENCES public.airport(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight FK_3a5f8316023020b144289e80e4a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT "FK_3a5f8316023020b144289e80e4a" FOREIGN KEY ("arrivalAirportId") REFERENCES public.airport(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payment FK_5738278c92c15e1ec9d27e3a098; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "FK_5738278c92c15e1ec9d27e3a098" FOREIGN KEY ("bookingId") REFERENCES public.booking(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking FK_671b622f13b29bd20135a0fb130; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_671b622f13b29bd20135a0fb130" FOREIGN KEY ("promotionId") REFERENCES public.promotion(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: verification FK_8300048608d8721aea27747b07a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT "FK_8300048608d8721aea27747b07a" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: booking FK_cc8ec8fa07ca411f70625d36f87; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.booking
    ADD CONSTRAINT "FK_cc8ec8fa07ca411f70625d36f87" FOREIGN KEY ("flightId") REFERENCES public.flight(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: flight FK_df523f694abea3ed793a8aef725; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flight
    ADD CONSTRAINT "FK_df523f694abea3ed793a8aef725" FOREIGN KEY ("aircraftId") REFERENCES public.aircraft(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

