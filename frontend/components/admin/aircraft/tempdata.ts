const columns = [
    {name: "Id", uid: "id", sortable: true},
    {name: "Mã tàu bay", uid: "code", sortable: true},
    {name: "Model", uid: "model", sortable: true},
    {name: "Nhà sản xuất", uid: "manufacturer", sortable: true},
    {name: "Sức chứa", uid: "capacity", sortable: true},
    {name: "Trạng thái", uid: "status", sortable: true},
    {name: "Thêm", uid: "actions"},
];
  
const statusOptions = [
    {name: "Hoạt động", uid: "active"},
    {name: "Vứt bỏ", uid: "retired"},
    {name: "Bảo trì", uid: "maintenance"},
];
  
const aircrafts = [
    {
        id: 1,
        code: "1234",
        model: "Boeing 747",
        manufacturer: "Boeing",
        capacity: 416,
        status: "active"
    },
    {
        id: 2,
        code: "12345",
        model: "Airbus A380",
        manufacturer: "Airbus",
        capacity: 853,
        status: "active"
    },
    {
        id: 3,
        code: "123456",
        model: "Airbus A350",
        manufacturer: "Airbus",
        capacity: 440,
        status: "maintenance"
    },
    {
        id: 4,
        code: "abc123",
        model: "Airbus A330",
        manufacturer: "Airbus",
        capacity: 335,
        status: "retired"
    },
    {
        id: 5,
        code: "xyz123",
        model: "Airbus A340",
        manufacturer: "Airbus",
        capacity: 375,
        status: "active"
    },
    {
        id: 6,
        code: "123abc",
        model: "Boeing 787",
        manufacturer: "Boeing",
        capacity: 335,
        status: "active"
    },
    {
        id: 7,
        code: "456abc",
        model: "Boeing 777",
        manufacturer: "Boeing",
        capacity: 396,
        status: "active"
    },
    {
        id: 8,
        code: "789abc",
        model: "Boeing 737",
        manufacturer: "Boeing",
        capacity: 215,
        status: "active"
    },
    {
        id: 9,
        code: "abc123",
        model: "Boeing 767",
        manufacturer: "Boeing",
        capacity: 375,
        status: "active"
    },
    {
        id: 10,
        code: "xyz123",
        model: "Boeing 757",
        manufacturer: "Boeing",
        capacity: 239,
        status: "active"
    },
    {
        id: 11,
        code: "123abc",
        model: "Boeing 747",
        manufacturer: "Boeing",
        capacity: 416,
        status: "active"        
    },
    {
        id: 12,
        code: "456abc",
        model: "Boeing 777",
        manufacturer: "Boeing",
        capacity: 396,
        status: "active"
    },
    {
        id: 13,
        code: "789abc",
        model: "Boeing 737",
        manufacturer: "Boeing",
        capacity: 215,
        status: "active"
    },
    {
        id: 14,
        code: "abc123",
        model: "Boeing 767",
        manufacturer: "Boeing",
        capacity: 375,
        status: "active"
    },
    {
        id: 15,
        code: "xyz123",
        model: "Boeing 757",
        manufacturer: "Boeing",
        capacity: 239,
        status: "active"
    },
    {
        id: 16,
        code: "123abc",
        model: "Boeing 747",
        manufacturer: "Boeing",
        capacity: 416,
        status: "active"        
    },
    {
        id: 17,
        code: "456abc",
        model: "Boeing 777",
        manufacturer: "Boeing",
        capacity: 396,
        status: "active"
    },
    {
        id: 18,
        code: "789abc",
        model: "Boeing 737",
        manufacturer: "Boeing",
        capacity: 215,
        status: "active"
    },
    {
        id: 19,
        code: "abc123",
        model: "Boeing 767",
        manufacturer: "Boeing",
        capacity: 375,
        status: "active"
    },
    {
        id: 20,
        code: "xyz123",
        model: "Boeing 757",
        manufacturer: "Boeing",
        capacity: 239,
        status: "active"
    },
    {
        id: 21,
        code: "123abc",
        model: "Boeing 747",
        manufacturer: "Boeing",
        capacity: 416,
        status: "active"        
    },
    {
        id: 22,
        code: "456abc",
        model: "Boeing 777",
        manufacturer: "Boeing",
        capacity: 396,
        status: "active"
    },
    {
        id: 23,
        code: "789abc",
        model: "Boeing 737",
        manufacturer: "Boeing",
        capacity: 215,
        status: "active"
    },
];

export {columns, aircrafts, statusOptions};

