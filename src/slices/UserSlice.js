import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getUser= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const URL = import.meta.env.VITE_APP_URL;

const initialState = {
    userInfo: getUser,
    error : false
}

export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers",()=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.get(`${URL}/user/`,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

 

export const registerUser = createAsyncThunk("user/registerUser",(data)=>{
    console.log(data);
    return axios.post(`${URL}/user/register`,data).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

export const loginUser= createAsyncThunk("user/loginUser", (data)=>{
    return axios.post(`${URL}/user/login`,data).then((res) =>res.data).catch((err)=>{
        throw new Error(err.response.data.message);
});
});

export const updateUser = createAsyncThunk("user/updateUser", (data)=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    console.log("toke",token,data);
    return axios.put(`${URL}/user/${data?._id}`,data,{headers:{Authorization: `Bearer ${token}`}}).then((res) =>res.data).catch((err)=>{
        throw new Error(err.response.data.message);
});
});

export const updateUserAdmin = createAsyncThunk("user/updateUserAdmin",({_id,data})=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.put(`${URL}/user/admin/${_id}`,data,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

export const deleteUser = createAsyncThunk("user/deleteUser",(_id)=>{
    console.log("od",_id);
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.delete(`${URL}/user/${_id}`,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            state.error = false;
            localStorage.removeItem("userInfo");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.users = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.error = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.userInfo = null;
                state.error = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.error = false;
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.userInfo = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.error = false;
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUser.pending, (state) => {
                state.userInfo = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                console.log("accepted",action.payload);
                state.userInfo = action.payload;
                state.error = false;
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(updateUserAdmin.fulfilled, (state, action) => {
                let { _id } = action.payload;
                let index = state.users.findIndex(user => user._id === _id);
                state.users[index] = action.payload;
                state.error = false;
            })
            .addCase(updateUserAdmin.rejected, (state, action) => {
                state.error = action.error.message;
            })
            .addCase(deleteUser.pending, (state) => {
                // Optional: Add any logic if needed for pending
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                const { _id } = action.payload;
                let index = state.users.findIndex((user) => user._id === _id);
                state.users.splice(index, 1);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;