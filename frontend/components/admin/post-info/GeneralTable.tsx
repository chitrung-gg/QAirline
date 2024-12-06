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
import { News } from "@/interfaces/news";

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Tiêu đề", uid: "title", sortable: true },
  { name: "Nội dung", uid: "content", sortable: true },
  { name: "Trạng thái", uid: "isPublished", sortable: true },
  { name: "Danh mục", uid: "category", sortable: true },
  { name: "Ngày tạo", uid: "createdAt", sortable: true },
  { name: "Ngày cập nhật", uid: "updatedAt", sortable: true },
  { name: "Chi tiết", uid: "actions" },
];

const statusOptions = [
  {name: "Đã công bố", uid: "published"},
  {name: "Chưa công bố", uid: "nonpublished"},
];

const categoryOptions = [
  {name: "Mẹo", uid: "Tips"},
  {name: "Thông báo", uid: "Announcements"},
  {name: "Cập nhật", uid: "Updates"},
];

const statusColorMap: Record<string, ChipProps["color"]> = {
    published: "success",
    nonpublished: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["title", "isPublished", "category", "createdAt", "updatedAt", "actions"];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface TableProps {
  newsData: News[];
}

export default function GeneralNewsTable({ newsData }: TableProps) {
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
      let filteredNews = [...newsData];
  
      if (hasSearchFilter) {
        filteredNews = filteredNews.filter((newData) =>
            newData.title.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredNews = filteredNews.filter((newData) =>
          Array.from(statusFilter).includes(newData.isPublished ? "published" : "nonpublished"),
        );
      }
      if (categoryFilter !== "all" && Array.from(categoryFilter).length !== categoryOptions.length) {
        filteredNews = filteredNews.filter((newData) =>
          Array.from(categoryFilter).includes(newData.category),
        );
      }
  
      return filteredNews;
    }, [newsData, filterValue, statusFilter, categoryFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: News, b: News) => {
        const first = a[sortDescriptor.column as keyof News];
        const second = b[sortDescriptor.column as keyof News];
    
        if (first === undefined || second === undefined) {
          return 0;
        }
    
        let cmp = 0;
    
        if (sortDescriptor.column === "isPublished") {
          const statusA = a.isPublished ? 1 : 0; 
          const statusB = b.isPublished ? 1 : 0;
          cmp = statusA - statusB; 
        } else if (sortDescriptor.column === "category") {
          const categoryA = a.category;
          const categoryB = b.category;
          cmp = categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
        } else {
          cmp = first < second ? -1 : first > second ? 1 : 0;
        }
    
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [items, sortDescriptor]);
  
    const renderCell = React.useCallback((newsData: News, columnKey: React.Key) => {
      const cellValue = newsData[columnKey as keyof News];
  
      const statusNameMap = Object.fromEntries(
        statusOptions.map(option => [option.uid, option.name])
      );
      const statusName = statusNameMap[newsData.isPublished ? "published" : "nonpublished"] || "Không rõ";
      switch (columnKey) {
        case "isPublished":
          return (
            <Chip className="capitalize" color={statusColorMap[newsData.isPublished ? "published" : "nonpublished"]} size="sm" variant="flat">
              {statusName}
            </Chip>
          );
        case "category":
          const categoryOption = categoryOptions.find(option => option.uid === newsData.category);
          return categoryOption ? categoryOption.name : "Không rõ";
        case "content":
            return (
                <div
                    style={{
                        maxWidth: '200px',  
                        whiteSpace: 'nowrap', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',  
                    }}
                >
                    {cellValue}
                </div>
            );
        case "createdAt":
        case "updatedAt":
          if (typeof cellValue === "string" || typeof cellValue === "number") {
            return new Date(cellValue).toLocaleString();
          }
          return "Không rõ";
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
                <Link href={`/admin/post-info/general/${newsData.id}`} className="hover:scale-500 transition-all">
                    <HiOutlineChevronRight className="hover:scale-500 transition-all"/>
                </Link>
            </div>
          );
        default:
          return cellValue;
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
              placeholder="Tra bằng tiêu đề..."
              startContent={<HiOutlineSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-3">
              <Dropdown>
                <DropdownTrigger className="hidden sm:flex text-black">
                  <Button endContent={<HiOutlineChevronDown className="text-small" />} variant="flat">
                    Danh mục
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
                  {categoryOptions.map((category) => (
                    <DropdownItem key={category.uid} className="capitalize">
                      {capitalize(category.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>

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
              <Button as={Link} href="/admin/post-info/general/create" className="bg-blue-normal text-white" endContent={<HiOutlinePlus />}>
                Thêm mới
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-small">Tổng cộng {newsData.length} tin tức</span>
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
      newsData.length,
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
        <TableBody emptyContent={"Không tìm thấy thông tin nào"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}