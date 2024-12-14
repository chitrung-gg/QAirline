"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  ChipProps,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Selection,
  Pagination,
  Input,
  SortDescriptor,
} from "@nextui-org/react";
import { HiOutlineSearch, HiOutlineDotsVertical, HiOutlineChevronDown, HiOutlinePlus } from "react-icons/hi";
import { Flight, FlightStatus } from "@/interfaces/flight";
import { Aircraft, AircraftStatus } from "@/interfaces/aircraft";
import { Airport } from "@/interfaces/airport";
import Link from "next/link";

const columns = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Số hiệu chuyến bay", uid: "flightNumber", sortable: true },
    { name: "Tàu bay", uid: "aircraft", sortable: true },
    { name: "Sân bay khởi hành", uid: "departureAirport", sortable: true },
    { name: "Sân bay đến", uid: "arrivalAirport", sortable: true },
    { name: "Thời gian khởi hành", uid: "departureTime", sortable: true },
    { name: "Thời gian đến", uid: "arrivalTime", sortable: true },
    { name: "Trạng thái", uid: "status", sortable: true },
    { name: "Số ghế trống", uid: "availableSeats", sortable: true },
    { name: "Thời gian bay", uid: "duration", sortable: true },
    { name: "Chi tiết", uid: "actions" },
  ];

const statusColorMap: Record<string, ChipProps["color"]> = {
  [FlightStatus.SCHEDULED]: "primary",
  [FlightStatus.ARRIVED]: "success",
  [FlightStatus.DELAYED]: "warning",
  [FlightStatus.CANCELLED]: "danger",
};

const statusOptions = [
    { name: "Đã lên lịch", uid: FlightStatus.SCHEDULED },
    { name: "Đã đến", uid: FlightStatus.ARRIVED },
    { name: "Chậm", uid: FlightStatus.DELAYED },
    { name: "Hủy", uid: FlightStatus.CANCELLED }
];

const INITIAL_VISIBLE_COLUMNS = ["flightNumber", "departureAirport", "arrivalAirport", "departureTime", "arrivalTime", "status", "availableSeats", "actions"];

type FlightWithAircraftAndAirport = Flight & {
  aircraft: Aircraft;
  departureAirport: Airport;
  arrivalAirport: Airport;
};

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface FlightTableProps {
    flights: FlightWithAircraftAndAirport[];
}

export default function FlightTable({ flights }: FlightTableProps ) {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
      column: "id",
      direction: "ascending",
    });

    const [page, setPage] = React.useState(1);
  
    const hasSearchFilter = Boolean(filterValue);
  
    const headerColumns = React.useMemo(() => {
      if (visibleColumns === "all") return columns;
  
      return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

  const filteredFlights = React.useMemo(() => {
    let filteredFlights = [...flights];

    if (hasSearchFilter) {
        filteredFlights = filteredFlights.filter((flightData) =>
            flightData.flightNumber.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredFlights = filteredFlights.filter((flightData) =>
          Array.from(statusFilter).includes(flightData.status ?? FlightStatus.SCHEDULED),
        );
      }

    return filteredFlights;
  }, [flights, filterValue, statusFilter]);

  const pages = Math.ceil(filteredFlights.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredFlights.slice(start, end);
  }, [page, filteredFlights, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Flight, b: Flight) => {
      const first = a[sortDescriptor.column as keyof Flight];
      const second = b[sortDescriptor.column as keyof Flight];
  
      if (first === undefined || second === undefined) {
        return 0;
      }
  
      let cmp = 0;
  
        if (sortDescriptor.column === "aircraft") {
            const aircraftA = a.aircraft?.aircraftCode; 
            const aircraftB = b.aircraft?.aircraftCode;
            if (aircraftA && aircraftB) {
                cmp = aircraftA < aircraftB ? -1 : aircraftA > aircraftB ? 1 : 0;
            } else {
                cmp = 0;
            } 
        } else if (sortDescriptor.column === "departureAirport") {
            const airportA = a.departureAirport?.name;
            const airportB = b.departureAirport?.name;
            if (airportA && airportB) {
                cmp = airportA < airportB ? -1 : airportA > airportB ? 1 : 0;
            } else {
                cmp = 0;
            }
        } else if (sortDescriptor.column === "arrivalAirport") {
            const airportA = a.arrivalAirport?.name;
            const airportB = b.arrivalAirport?.name;
            if (airportA && airportB) {
                cmp = airportA < airportB ? -1 : airportA > airportB ? 1 : 0;
            } else {
                cmp = 0;
            }
        } else if (sortDescriptor.column === "status") {
            const statusA = a.status;
            const statusB = b.status;
            if (statusA !== undefined && statusB !== undefined) {
                cmp = statusA < statusB ? -1 : statusA > statusB ? 1 : 0;
            } else {
                cmp = 0;
            }
        } else {
            cmp = first < second ? -1 : first > second ? 1 : 0;
        }
  
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [items, sortDescriptor]);

    const renderCell = (flight: FlightWithAircraftAndAirport, columnKey: React.Key): React.ReactNode => {
      const cellValue = flight[columnKey as keyof FlightWithAircraftAndAirport];

      const statusNameMap = Object.fromEntries(
        statusOptions.map(option => [option.uid, option.name])
      );
      const statusName = statusNameMap[flight.status] || "Không rõ";
    switch (columnKey) {
      case "status":
        return <Chip color={statusColorMap[flight.status]}>{statusName}</Chip>;
      case "departureAirport":
        //return <Link href={`/admin/airport/${flight.departureAirport?.id}`}>{flight.departureAirport?.name}</Link>;
        return flight.departureAirport?.name;
      case "arrivalAirport":
        //return <Link href={`/admin/airport/${flight.arrivalAirport?.id}`}>{flight.arrivalAirport?.name}</Link>;
        return flight.arrivalAirport?.name;
      case "aircraft":
        return <Link href={`/admin/aircraft/${flight.aircraft?.id}`}>{flight.aircraft?.model}</Link>;
      case "departureTime":
        return new Date(flight.departureTime).toUTCString();
      case "arrivalTime":
        return new Date(flight.arrivalTime).toUTCString();
      case "duration":
        //return `${flight.duration} phút`;
        if (flight.duration !== undefined) {
          const hours = Math.floor(flight.duration / 60);
          const minutes = flight.duration % 60;
          return `${hours > 0 ? `${hours} giờ ` : ""}${minutes} phút`;
        }
        return "N/A";
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <HiOutlineDotsVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem href={`/admin/flight/${flight.id}`}>Chi tiết</DropdownItem>
              <DropdownItem href={`/admin/flight/${flight.id}/edit`}>Chỉnh sửa</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
    }
  };

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full"
            placeholder="Tra bằng số hiệu máy bay..."
            startContent={<HiOutlineSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex text-black">
                <Button endContent={<HiOutlineChevronDown className="text-small" />} variant="flat">
                  Trạng thái
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex text-black">
                <Button endContent={<HiOutlineChevronDown className="text-small" />} variant="flat">
                  Cột
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button as={Link} href="/admin/flight/create" className="bg-blue-normal text-white" endContent={<HiOutlinePlus />}>
              Thêm mới
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-small">Tổng cộng {flights.length} chuyến bay</span>
          <label className="flex items-center text-small">
            Số hàng mỗi trang:
            <select
              className="bg-transparent outline-none text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    flights.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
            Trước
          </Button>
          <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
            Sau
          </Button>
        </div>
      </div>
    );
  }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table 
        aria-label="Flight table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[30vh] md:max-h-[70vh]",
          th: ["bg-blue-normal", "text-white", "border-b", "border-divider"],
          td: [],
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
            <TableColumn 
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                aria-sort={sortDescriptor.direction}
            >
                {column.name}
            </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Không tìm thấy chuyến bay nào"} items={sortedItems}>
        {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item as FlightWithAircraftAndAirport, columnKey) as React.ReactNode}</TableCell>}
            </TableRow>
          )}
      </TableBody>
    </Table>
  );
}
