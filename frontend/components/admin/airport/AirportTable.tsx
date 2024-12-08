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
    HiOutlineChevronRight,
    HiOutlinePlus,
    HiOutlineSearch
} from "react-icons/hi";
import Link from "next/link";
import { Airport } from "@/interfaces/airport";

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Tên sân bay", uid: "name", sortable: true },
  { name: "Thành phố", uid: "city", sortable: true },
  { name: "Quốc gia", uid: "country", sortable: true },
  { name: "Mã IATA", uid: "iataCode", sortable: true },
  { name: "Chi tiết", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = ["name", "city", "country", "iataCode", "actions"];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface TableProps {
  data: Airport[];
}

export default function AirportTable({ data }: TableProps) {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
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
      let filteredData = [...data];
  
      if (hasSearchFilter) {
        filteredData = filteredData.filter((data) =>
            data.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
  
      return filteredData;
    }, [data, filterValue]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: Airport, b: Airport) => {
        const first = a[sortDescriptor.column as keyof Airport];
        const second = b[sortDescriptor.column as keyof Airport];
    
        if (first === undefined || second === undefined) {
          return 0;
        }
    
        let cmp = 0;
        cmp = first < second ? -1 : first > second ? 1 : 0;
    
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [items, sortDescriptor]);
  
    const renderCell = React.useCallback((data: Airport, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof Airport];
  
      switch (columnKey) {
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
                <Link href={`/admin/airport/${data.id}`} className="hover:scale-500 transition-all">
                    <HiOutlineChevronRight className="hover:scale-500 transition-all"/>
                </Link>
            </div>
          );
        default:
          return cellValue?.toString();
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
              placeholder="Tra bằng tên..."
              startContent={<HiOutlineSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
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
              <Button as={Link} href="/admin/airport/create" className="bg-blue-normal text-white" endContent={<HiOutlinePlus />}>
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-small">Tổng cộng {data.length} sân bay</span>
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
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      data.length,
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
        aria-label="News general table"
        //isHeaderSticky
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
        <TableBody emptyContent={"Không tìm thấy sân bay nào"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}