import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = import.meta.env.VITE_APP_URL;

const initialState = {
    items:null,
    loading:true,
    error:false,
    amount:0,
    subQty:0
}

const totalQty = (arr)=>{
    let result = arr?.reduce((acc,v)=>acc + 1,0)
    return result;
}

const totalAmount= (arr)=>{
    let result = arr?.reduce((acc,v)=>
        acc + v.price,0)
    return result;
}

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',(user)=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.get(`${URL}/cart/${user}`,{headers:{Authorization: `Bearer ${token}`}}).then((res)=>res.data).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const createUserCart = createAsyncThunk("cart/createUserCart",(user)=>{
    return axios.post(`${URL}/cart/${user}`).then((res)=>res.data).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const updateUserCart = createAsyncThunk("cart/updateUserCart",({user,item})=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.put(`${URL}/cart/${user}`,item,{headers:{Authorization: `Bearer ${token}`}}).then((res)=>{console.log(res.data);
    res.data})
    .catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const deleteCartItem = createAsyncThunk("cart/removeCartItem",({user,_id})=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.delete(`${URL}/cart/${user}/${_id}`,{headers:{Authorization: `Bearer ${token}`}}).then((res)=>res.data)
    .catch((err)=>{
        throw new Error(err.response.data.message)
    })
})


  export const clearCart= createAsyncThunk("cart/clearCart",(user)=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
    .put(`${URL}/cart/clear/${user}`,{headers:{Authorization: `Bearer ${token}`}})
    .then((res) => 
        res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  }
  );

const CartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = false;
                state.items = null;
                state.error = false;
                state.amount = 0;
                state.subQty = 0;
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.error = false;
                state.amount = action.payload && totalAmount(action.payload.items);
                state.subQty = action.payload && totalQty(action.payload.items);
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.items = null;
                state.amount = 0;
                state.subQty = 0;
                state.error = action.error.message;
            })
            .addCase(createUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUserCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateUserCart.pending, (state) => {
                state.loading = true;
                state.amount = 0;
                state.subQty = 0;
            })
            .addCase(updateUserCart.fulfilled, (state, action) => {
                console.log(action.payload);
                state.loading = false;
            })
            .addCase(updateUserCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCartItem.pending, (state) => {
                state.loading = true;
                state.items = null;
                state.error = false;
            })
            .addCase(deleteCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.items;
                state.amount = action.payload && totalAmount(action.payload.items);
                state.subQty = action.payload && totalQty(action.payload.items);
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.items = null;
                state.error = false;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.loading = false;
                state.amount = 0;
                state.subQty = 0;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
});
export default CartSlice.reducer;