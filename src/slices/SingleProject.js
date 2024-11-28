import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    single_project:null,
    loading :true,
    error:false
}
const URL = import.meta.env.VITE_APP_URL;

export const fetchSingleProject = createAsyncThunk("singleProduct/fetchSingleProject",(id)=>{
    return axios.get(`${URL}/projects/${id}`).then((res)=>{
      return res.data;
    }).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const createReveiw =  createAsyncThunk("singleProduct/createReview",({id,data})=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.post(`${URL}/projects/reviews/${id}`,data,{headers:{Authorization: `Bearer ${token}`}}).then((res)=>{
      return res.data;
    }).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

const SingleProjectSlice = createSlice({
    name:"singleProduct",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleProject.pending, (state) => {
                state.loading = true;
                state.single_project = null;
                state.error = false;
            })
            .addCase(fetchSingleProject.fulfilled, (state, action) => {
                state.loading = false;
                state.single_project = action.payload;
                state.error = false;
            })
            .addCase(fetchSingleProject.rejected, (state, action) => {
                state.loading = false;
                state.single_project = null;
                state.error = action.error.message;
            })
            .addCase(createReveiw.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(createReveiw.fulfilled, (state, action) => {
                state.loading = false;
                state.single_project = action.payload;
                state.error = false;
            })
            .addCase(createReveiw.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
    
})

export default SingleProjectSlice.reducer;