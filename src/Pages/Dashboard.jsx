import {Box, Button, FormControl, FormControlLabel, FormLabel, Modal, Paper,Radio,RadioGroup,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, TextField,} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cell from "../components/Cell";
import { useDispatch } from "react-redux";
import { createProject } from "../slices/ProjectSlice";
// import { crea } from "../../slices/ProductSlice";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { all_Projects } = useSelector((state) => state.project);
  const navigate = useNavigate();
  const [filterProjects, setFilterProjects] = useState(all_Projects);
  useEffect(() => {
    !userInfo && navigate("/");
    const filteredProjects =  // If no filter is selected, return the entire array
       all_Projects.filter(project =>
          (userInfo ? project.projectOwner === userInfo._id : true)
      );
      setFilterProjects(filteredProjects);
    // !userInfo?.isAdmin && navigate("/");
  }, [all_Projects]);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Access the selected file
    setImage(file); // Save the file in state
  };

  const handleCreate = () => {
    if (!image) {
        alert("Please select an image first.");
        return;
      }
      const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("projectOwner", userInfo._id);
    formData.append("domain", domain);


    // let data = {
    //   name,
    //   domain,
    //   image,
    //   description,
    //   category,
    //   price: parseInt(price),
    // };
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
    
    dispatch(createProject(formData));
    handleClose();
    setName("");
    setDomain("");
    setCategory("");
    setDescription("");
    setImage("");
    setPrice("");
  };
  return (
    <>
      <Stack alignItems={"end"}>
        <Button
          sx={{ width: 100, margin: "1rem 0" }}
          onClick={handleOpen}
          variant="contained"
        >
          Create
        </Button>
      </Stack>
      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Image</TableCell>
                <TableCell align={"center"}>Name</TableCell>
                <TableCell align={"center"}>Domain</TableCell>
                <TableCell align={"center"}>Category</TableCell>
                <TableCell align={"center"}>Price</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterProjects?.map((product) => (
                <Cell key={product._id} product={product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={2}>
            <Box>
              <label>Name: </label>
              <TextField
                fullWidth
                value={name}
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <label>Image: </label>
              <TextField
                fullWidth
                type="file"
                variant="standard"
                onChange={handleFileChange}
              />
            </Box>
            <Box>
              <label>Domain: </label>
              <TextField
                fullWidth
                value={domain}
                variant="standard"
                onChange={(e) => setDomain(e.target.value)}
              />
            </Box>
            <Box>
              <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
              <RadioGroup
              row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setCategory(e.target.value)}
              >
                <FormControlLabel value="School Student" control={<Radio />} label="School Student" />
                <FormControlLabel value="Collegeate" control={<Radio />} label="Collegeate" />
                <FormControlLabel value="Working Professional" control={<Radio />} label="Working Professional" />
              </RadioGroup>
            </FormControl>
            </Box>
            <Box>
              <label>Description: </label>
              <TextField
                // inputProps={{ type: "textarea" }}
                // sx={{ overflowY: "scroll" }}
                fullWidth
                multiline
                value={description}
                variant="standard"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box>
              <label>Price: </label>
              <TextField
                fullWidth
                value={price}
                variant="standard"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            {/* <Box>
              <label>Count in stock: </label>
              <TextField
                fullWidth
                value={countInStock}
                variant="standard"
                onChange={(e) => setStock(e.target.value)}
              />
            </Box> */}
            <Button onClick={handleCreate} variant="contained">
              Create
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default Dashboard;