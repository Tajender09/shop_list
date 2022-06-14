const initialState = [
    {
        name: "Fantasy Stationery & Xerox",
        category: "Stationery",
        area: "Thane",
        opening: "2022-06-13",
        closing: "2022-11-01"
    },
    {
        name: "The Butcher",
        category: "Butcher",
        area: "Pune",
        opening: "2021-07-16",
        closing: "2022-11-16"
    },
    {
        name: "Baker's Bounty",
        category: "Baker",
        area: "Nashik",
        opening: "2019-06-12",
        closing: "2022-05-22"
    },
    {
        name: "Eden Super Bazar",
        category: "Grocery",
        area: "Thane",
        opening: "2021-03-14",
        closing: "2022-12-10"
    },
    {
        name: "Ashoka Chemist",
        category: "Chemist",
        area: "Nashik",
        opening: "2019-02-19",
        closing: "2023-04-10"
    },
    {
        name: "Mayur Stationers",
        category: "Stationery",
        area: "Nagpur",
        opening: "2018-05-31",
        closing: "2021-09-07"
    }
];

const shopList = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SHOP": return [...state, action.payload];
        case "EDIT_SHOP": return [...state.slice(0, action.id), action.payload, ...state.slice(action.id + 1)];
        case "DELETE_SHOP": return [...state.slice(0, action.id), ...state.slice(action.id + 1)];
        case "FILTER_AREA": {
            let temp = state;
            return [...temp.filter(item => item.area === action.data)];
        };
        case "FILTER_CATEGORY": {
            let temp = state;
            return [...temp.filter(item => item.category === action.data)];
        };
        case "FILTER_STATUS": {
            if (action.status === "Open") {
                let temp = state;
                return [...temp.filter((item) => new Date() >= new Date(item.opening) && new Date() <= new Date(item.closing))];
            }
            else {
                let temp = state;
                return [...temp.filter((item) => new Date() >= new Date(item.closing))];
            }
        };
        default: return state;
    }
}

export default shopList;