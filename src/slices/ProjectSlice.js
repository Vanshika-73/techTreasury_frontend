import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_APP_URL;

const initialState = {
  all_Projects: null,
  loading: true,
  error: false,
};

export const fetchAllProjects = createAsyncThunk(
  "projects/fetchProjects",
  () => {
    return axios(`${URL}/projects`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);
  export const createProject = createAsyncThunk(
    "Projects/createProject",
    (data) => {
      return axios
        .post(`${URL}/projects/createProject`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new Error(err.response.data.message);
        });
    }
  );

export const updateProject = createAsyncThunk(
  "Projects/updateProject",
  ({ _id, data }) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
      .put(`${URL}/Projects/${_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);
export const deleteProject = createAsyncThunk(
  "Projects/deleteProject",
  (_id) => {
    console.log("dl",_id);
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
      .delete(`${URL}/projects/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

const ProjectSlice = createSlice({
  name: "Projects",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchAllProjects.pending, (state) => {
        state.loading = true;
        state.all_Projects = null;
        state.error = false;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.all_Projects = action.payload;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create project
      .addCase(createProject.pending, (state) => {
        // state.loading = true;
        // state.all_Projects = null;
        // state.error = false;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.all_Projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update project
      .addCase(updateProject.pending, (state) => {
        console.log("worked");
        // state.loading = true;
        // state.all_Projects = null;
        // state.error = false;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.all_Projects.findIndex(
          (project) => project._id === _id
        );
        state.loading = false;
        state.all_Projects[index] = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete project
      .addCase(deleteProject.pending, (state) => {
        // state.loading = true;
        // state.all_Projects = null;
        // state.error = false;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        const { _id } = action.payload;
        const index = state.all_Projects.findIndex(
          (project) => project._id === _id
        );
        state.all_Projects.splice(index, 1);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ProjectSlice.reducer;