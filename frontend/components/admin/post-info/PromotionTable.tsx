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
    SortDescriptor,
    Tab
  } from "@nextui-org/react";
import { 
    HiOutlineDotsVertical, 
    HiOutlineChevronDown,
    HiOutlineChevronRight,
    HiOutlinePlus,
    HiOutlineSearch
} from "react-icons/hi";
import Link from "next/link";
import { Promotion, discountType } from "@/interfaces/promotion";

const columns = [
    { name: "Id", uid: "id", sortable: true },
    { name: "Mã", uid: "code", sortable: true },
    { name: "Mô tả", uid: "description", sortable: true },
    { name: "Ngày bắt đầu", uid: "startDate", sortable: true },
    { name: "Ngày kết thúc", uid: "endDate", sortable: true },
    { name: "Giảm giá", uid: "discount", sortable: true },
    { name: "Loại giảm giá", uid: "discountType", sortable: true },
    { name: "Trạng thái", uid: "isActive", sortable: true },
    { name: "Thêm", uid: "actions" },
];

const activeOptions = [
    {name: "Đang hiệu lực", uid: "active"},
    {name: "Hết hiệu lực", uid: "inactive"},
  ];

const discountTypeOptions = [
    {name: "Phần trăm", uid: "Percentage"},
    {name: "Cố định", uid: "FixedAmount"},
  ];

  const activeColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["code", "discount", "discountType", "isActive", "actions"];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface TableData {
    data: Promotion[];
}

export default function PromotionTable({ data }: TableData) {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [categoryFilter, setCategoryFilter] = React.useState<Selection>("all");
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
      let filteredPromotions = [...data];
  
      if (hasSearchFilter) {
        filteredPromotions = filteredPromotions.filter((data) =>
            data.code.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== activeOptions.length) {
        filteredPromotions = filteredPromotions.filter((data) =>
          Array.from(statusFilter).includes(data.isActive ? "active" : "inactive"),
        );
      }

      if (categoryFilter !== "all" && Array.from(categoryFilter).length !== discountTypeOptions.length) {
        filteredPromotions = filteredPromotions.filter((data) =>
          Array.from(categoryFilter).includes(data.discountType),
        );
      }
  
      return filteredPromotions;
    }, [data, filterValue, statusFilter, categoryFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: Promotion, b: Promotion) => {
          const first = a[sortDescriptor.column as keyof Promotion];
          const second = b[sortDescriptor.column as keyof Promotion];
  
          if (first === undefined || second === undefined) {
            return 0;
          }
      
          let cmp = 0;
  
          if (sortDescriptor.column === "isActive") {
            const statusA = a.isActive ? 1 : 0; 
            const statusB = b.isActive ? 1 : 0;
            cmp = statusA - statusB; 
          } else if (sortDescriptor.column === "discountType") {
            const categoryA = a.discountType;
            const categoryB = b.discountType;
            cmp = categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
          } else {
            cmp = first < second ? -1 : first > second ? 1 : 0;
          }
  
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
  }, [sortDescriptor, items]);
  
    const renderCell = React.useCallback((data: Promotion, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof Promotion];
  
      const activeNameMap = Object.fromEntries(
        activeOptions.map(option => [option.uid, option.name])
      );
      const activeName = activeNameMap[data.isActive ? "active" : "inactive"] || "Không rõ";
      switch (columnKey) {
        case "isActive":
          return (
            <Chip className="capitalize" color={activeColorMap[data.isActive ? "active" : "inactive"]} size="sm" variant="flat">
              {activeName}
            </Chip>
          );
        case "discountType":
          const categoryOption = discountTypeOptions.find(option => option.uid === data.discountType);
          return categoryOption ? categoryOption.name : "Không rõ";
        case "description":
            return (
                <div
                    style={{
                        maxWidth: '200px',  
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',  
                    }}
                >
                    {typeof cellValue === 'object' ? JSON.stringify(cellValue) : cellValue}
                </div>
            );
        case "startDate":
            return new Date(data.startDate).toUTCString();
        case "endDate":
            return new Date(data.endDate).toUTCString();
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
                    <DropdownItem as={Link} href={`/admin/post-info/promotion/${data.id}`}>Chi tiết</DropdownItem>
                    <DropdownItem as={Link} href={`/admin/post-info/promotion/${data.id}/edit`}>Chỉnh sửa</DropdownItem>
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
              placeholder="Tra bằng mã..."
              startContent={<HiOutlineSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
                <Dropdown>
                <DropdownTrigger className="hidden sm:flex text-black">
                  <Button endContent={<HiOutlineChevronDown className="text-small" />} variant="flat">
                    Hiệu lực
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
                  {activeOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

              <Dropdown>
                <DropdownTrigger className="hidden sm:flex text-black">
                  <Button endContent={<HiOutlineChevronDown className="text-small" />} variant="flat">
                    Loại giảm giá
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Table Columns"
                  closeOnSelect={false}
                  selectedKeys={categoryFilter}
                  selectionMode="multiple"
                  onSelectionChange={setCategoryFilter}
                >
                  {discountTypeOptions.map((type) => (
                    <DropdownItem key={type.uid} className="capitalize">
                      {capitalize(type.name)}
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
              <Button as={Link} href="/admin/post-info/promotion/create" className="bg-blue-normal text-white" endContent={<HiOutlinePlus />}>
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-small">Tổng cộng {data.length} khuyến mãi</span>
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
      categoryFilter,
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
        aria-label="Promotion table"
        isHeaderSticky
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
        <TableBody emptyContent={"Không tìm thấy khuyến mại nào"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}