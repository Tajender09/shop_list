export const addShop = (data) => {
    return {
        type: "ADD_SHOP",
        payload: data
    }
}

export const editShop = (id, data) => {
    return {
        type: "EDIT_SHOP",
        id,
        payload: data
    }
}

export const deleteShop = (id) => {
    return {
        type: "DELETE_SHOP",
        id
    }
}

export const filterArea = (data) => {
    return {
        type: "FILTER_AREA",
        data
    }
}

export const filterCategory = (data) => {
    return {
        type: "FILTER_CATEGORY",
        data
    }
}

export const filterStatus = (status) => {
    return {
        type: "FILTER_STATUS",
        status
    }
}