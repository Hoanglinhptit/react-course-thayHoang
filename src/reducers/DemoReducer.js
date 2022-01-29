import { actionTypes } from "./actionTypes"
const dataArrDefault = ["lehoanglinh", "EmiFukada", "abc", '2222']// {id: 1, name: "sasdas"}
const state1 = {
    id: 0,
    mang: dataArrDefault,
    mangKQ: dataArrDefault,
    selectedItem: {
        idx: -1,
        value: ""
    },
    activePage: 1,
    limit: 2,
    totalPage: 1,
    keySearch :""
}

const handlePaginationCase = (state, action) => {
    let newMangKQ = []
    if (action.payload.key) {
        newMangKQ = state.mang.filter((item, idx) => item.includes(action.payload.key))
    }
    else {newMangKQ = [...state.mang]}
    let newMang2 = []
    const sumPage = Math.ceil(newMangKQ.length / state.limit)
    const skipElement = (action.payload.activePage - 1) * state.limit
        newMang2 = newMangKQ.filter((item, idx) => {
        if (idx >= skipElement && (idx < skipElement + state.limit)) {
            return item;
        }
    })
    
    return {
        ...state,
        mang: newMangKQ,
        mangKQ: newMang2,
        totalPage: sumPage,
        activePage: action.payload.activePage,
        keySearch: action.payload.key
    }
}

export default (state = state1, action) => {
    switch (action.type) {
        case actionTypes.Add:
            let mangThem = [...state.mang, action.payload]
            let sumPageAdd = Math.ceil(mangThem.length / state.limit)
            // return { ...state, mang: [...state.mang, action.payload] }
            let skipElement2 = (sumPageAdd - 1) * state.limit
            let mangChon = []
            mangChon = mangThem.filter((item, idx) => {
                if (idx >= skipElement2 && (idx <= skipElement2 + state.limit))
                    return item;
            })
            return { ...state, mang: mangThem, totalPage: sumPageAdd, mangKQ: mangChon, activePage: sumPageAdd }
        case actionTypes.Update:
            // const arrEl = action.payload.arrEl
            // const savedValue = action.payload.savedValue
            // dong 28 vs 29 tương đương với cấu trúc dòng 31
            let { arrEl, savedValue } = action.payload,
                { idx, value } = arrEl;
            // return {
            //     ...state,
            //     mang: state.mang.map((item, index) => {
            //         if (savedValue === item) {
            //             return value
            //         }
            //         return item
            //     }),
            //     mangKQ: state.mangKQ.map((item, index) => idx === index ? value : item),

            // }
            let indexMangCu = (state.activePage > 1) ? (state.activePage + idx) : (state.activePage - 1 + idx);
            console.log("check", indexMangCu)
            return {
                ...state,
                mang: state.mang.map((item, index) => {
                    if (index === indexMangCu) {
                        return value
                    }
                    return item
                }),
                mangKQ: state.mangKQ.map((item, index) => idx === index ? value : item)
            }

        case actionTypes.Delete:
            sessionStorage.setItem("beforeDelete", JSON.stringify(state))
            const existedItem = state.mangKQ[action.payload],
                mang = state.mang.filter((item) => item !== existedItem)
            let objMerge = {}
            if (state.activePage === state.totalPage && state.mangKQ.length === 1) {
                objMerge = handlePaginationCase({...state, mang}, { payload: state.totalPage - 1 })
            }
            return {
                ...state,
                mang,
                mangKQ: state.mangKQ.filter((item) => item !== existedItem),
                ...objMerge
            }
        // let { arrEl1, savedValue1 } = action.payload
        // { idx1, value1 } = arrEl1;

        // let indexMangCanxoa = (state.activePage > 1) ? (state.activePage + action.payload) : (state.activePage - 1 + action.payload);
        // let array1 = state.mang.filter((item, index) =>
        //     index !== indexMangCanxoa);
        // let array2 = state.mangKQ.filter((item, index) => action.payload !== index);
        // let sumPageDel = Math.ceil(array1.length / state.limit)
        // let skipElement3 = (sumPageDel - 1) * state.limit
        // if (state.mangKQ.length < 1) {
        //     state.activePage -= 1
        //     let arraySaved = mang
        // }

        // return {
        //     ...state
        // }

        // case actionTypes.Search:
        //     let mangKQ = [...state.mang]
          
        //     console.log(" what?"+ action.payload)
       
        //     if (action.payload) {
        //         mangKQ = state.mang.filter((item, idx) => item.includes(action.payload))
        //     }
        //     const sumPage1 = Math.ceil(mangKQ.length / state.limit)
        //     const skipElement3 = (sumPage1 - 1) * state.limit
        //     let newMangKQ1  = state.mangKQ.filter((item, idx) => {
        //         if (idx >= skipElement3 && (idx < skipElement3 + state.limit)) {
        //             return item;
        //         }
        //     })
        //     return {
        //         ...state, mangKQ, totalPage:sumPage1,
               
        //     }
        case actionTypes.setItem:
            return { ...state, selectedItem: action.payload }
        case actionTypes.pagiNation:
            return handlePaginationCase(state, action)
        case actionTypes.Undo: 
            return JSON.parse(sessionStorage.getItem("beforeDelete"))
        default: return state
    }
}