"use client";
import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor
  } from "@nextui-org/react";
import { 
    HiOutlineDotsVertical, 
    HiOutlineChevronDown,
    HiOutlinePlus,
    HiOutlineSearch
} from "react-icons/hi";
import Link from "next/link";
import { Aircraft } from "@/interfaces/aircraft";
import axios from "axios";

const columns = [
  {name: "Id", uid: "id", sortable: true},
  {name: "Mã tàu bay", uid: "aircraftCode", sortable: true},
  {name: "Model", uid: "model", sortable: true},
  {name: "Nhà sản xuất", uid: "manufacturer", sortable: true},
  {name: "Sức chứa", uid: "capacity", sortable: true},
  {name: "Trạng thái", uid: "status", sortable: true},
  {name: "Thêm", uid: "actions"},
];

const statusOptions = [
  {name: "Hoạt động", uid: "Active"},
  {name: "Vứt bỏ", uid: "Retired"},
  {name: "Bảo trì", uid: "Maintenance"},
];


const statusColorMap: Record<string, ChipProps["color"]> = {
    Active: "success",
    Retired: "danger",
    Maintenance: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["model", "manufacturer", "status", "capacity", "actions"];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface TableProps {
  aircrafts: Aircraft[];
}

export default function AircraftTable({ aircrafts }: TableProps) {
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
  
    const filteredItems = React.useMemo(() => {
      let filteredAircrafts = [...aircrafts];
  
      if (hasSearchFilter) {
        filteredAircrafts = filteredAircrafts.filter((aircraft) =>
          aircraft.model.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredAircrafts = filteredAircrafts.filter((aircraft) =>
          Array.from(statusFilter).includes(aircraft.status),
        );
      }
  
      return filteredAircrafts;
    }, [aircrafts, filterValue, statusFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);
  
    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: Aircraft, b: Aircraft) => {
        const first = a[sortDescriptor.column as keyof Aircraft] as number;
        const second = b[sortDescriptor.column as keyof Aircraft] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((aircraft: Aircraft, columnKey: React.Key) => {
      const cellValue = aircraft[columnKey as keyof Aircraft];
  
      const statusNameMap = Object.fromEntries(
        statusOptions.map(option => [option.uid, option.name])
      );
      const statusName = statusNameMap[aircraft.status] || "Không rõ";
      switch (columnKey) {
        case "status":
          return (
            <Chip className="capitalize" color={statusColorMap[aircraft.status]} size="sm" variant="flat">
              {statusName}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <HiOutlineDotsVertical />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem as={Link} href={`aircraft/${aircraft.id}`}>Chi tiết</DropdownItem>
                  <DropdownItem as={Link} href={`aircraft/${aircraft.id}/edit`}>Chỉnh sửa</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue;
      }
    }, []);
  
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
              placeholder="Tra bằng model..."
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
              <Button as={Link} href="/admin/aircraft/create" className="bg-blue-normal text-white" endContent={<HiOutlinePlus />}>
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-small">Tổng cộng {aircrafts.length} tàu bay</span>
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
      aircrafts.length,
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
        aria-label="Aircraft table"
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
        <TableBody emptyContent={"No aircrafts found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}