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
    HiOutlineChevronDown,
    HiOutlineChevronRight,
    HiOutlinePlus,
    HiOutlineSearch
} from "react-icons/hi";
import Link from "next/link";
import { User, UserGender, UserRole, UserStatus } from "@/interfaces/user";

const columns = [
  { name: "Id", uid: "id", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Tên người dùng", uid: "username", sortable: true }, // change into fullname
//   { name: "Tên họ", uid: "firstName", sortable: true },
//   { name: "Tên", uid: "lastName", sortable: true },
  { name: "Vai trò", uid: "role", sortable: true },
  { name: "Chi tiết", uid: "actions" },
];

const roleOptions = [
  {name: "Quản trị", uid: "Admin"},
  {name: "Người dùng", uid: "User"}
];

const INITIAL_VISIBLE_COLUMNS = ["email", "username", "role", "actions"];

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

interface TableProps {
  data: User[];
}

export default function UserTable({ data }: TableProps) {
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [roleFilter, setRoleFilter] = React.useState<Selection>("all");
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
            data.email.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (roleFilter !== "all" && Array.from(roleFilter).length !== roleOptions.length) {
        filteredData = filteredData.filter((newData) =>
          Array.from(roleFilter).includes(newData.role),
        );
    }
  
      return filteredData;
    }, [data, filterValue, roleFilter]);
  
    const pages = Math.ceil(filteredItems.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
      return [...items].sort((a: User, b: User) => {
        const first = a[sortDescriptor.column as keyof User];
        const second = b[sortDescriptor.column as keyof User];
    
        if (first === undefined || second === undefined) {
          return 0;
        }
    
        let cmp = 0;
    
        if (sortDescriptor.column === "role") {
          const roleA = a.role;
          const roleB = b.role;
          cmp = roleA < roleB ? -1 : roleA > roleB ? 1 : 0;
        } else {
          cmp = first < second ? -1 : first > second ? 1 : 0;
        }
    
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }, [items, sortDescriptor]);
  
    const renderCell = React.useCallback((data: User, columnKey: React.Key) => {
      const cellValue = data[columnKey as keyof User];
    
      switch (columnKey) {
        case "role":
          const roleOption = roleOptions.find(option => option.uid === data.role);
          return roleOption ? roleOption.name : "Không rõ";
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
                <Link href={`/admin/${data.id}`} className="hover:scale-500 transition-all">
                    <HiOutlineChevronRight className="hover:scale-500 transition-all"/>
                </Link>
            </div>
          );
        default:
          return cellValue !== undefined ? cellValue.toString() : "";
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
              placeholder="Tra bằng email..."
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
                  selectedKeys={roleFilter}
                  selectionMode="multiple"
                  onSelectionChange={setRoleFilter}
                >
                  {roleOptions.map((role) => (
                    <DropdownItem key={role.uid} className="capitalize">
                      {capitalize(role.name)}
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
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-small">Tổng cộng {data.length} người dùng</span>
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
      roleFilter,
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
        aria-label="User table"
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
        <TableBody emptyContent={"Không tìm thấy người dùng nào"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
}