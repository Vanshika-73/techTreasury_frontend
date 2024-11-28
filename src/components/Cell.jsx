import {
    Box,
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    Modal,
    Paper,
    Radio,
    RadioGroup,
    TableCell,
    TableRow,
    TextField,
    Typography,
  } from "@mui/material";
  import React from "react";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { useState } from "react";
  import { Stack } from "@mui/material";
  import { useDispatch } from "react-redux";
//   import { deleteProduct, updateProduct } from "../slices/ProductSlice";
  import { useNavigate } from "react-router-dom";
import { deleteProject, updateProject } from "../slices/ProjectSlice";
  
  const Cell = ({ product }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(product.name);
    const [domain, setDomain] = useState(product.domain);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    };
    const handleUpdate = () => {
      let data = {
        _id: product._id,
        data: {
          name,
          domain,
          category,
          price: parseInt(price),
        },
      };
      dispatch(updateProject(data));
      handleClose();
    };
    return (
      <>
        <TableRow>
          <TableCell align={"center"}>
            <Box sx={{ height: "10vh" }}>
              <img
                style={{ height: "100%" }}
                src={`https://tech-treasury-backend.vercel.app/${product.image}`}
                alt={product.name}
              />
            </Box>
          </TableCell>
          <TableCell onClick={()=>(navigate(`/Product/${product._id}`))} sx={{cursor:"pointer"}} align={"center"}>{product.name}</TableCell>
          <TableCell align={"center"}>{product.domain}</TableCell>
          <TableCell align={"center"}>{product.category}</TableCell>
          <TableCell align={"center"}>{product.price}</TableCell>
          <TableCell align={"center"}>
            <ButtonGroup>
              <Button onClick={handleOpen} size="small">
                <EditIcon />
              </Button>
              <Button
                 onClick={() => dispatch(deleteProject(product._id))}
                size="small"
              >
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          </TableCell>
        </TableRow>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <Stack spacing={3}>
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
              <Button onClick={handleUpdate} variant="contained">
                UPDATE
              </Button>
            </Stack>
          </Paper>
        </Modal>
      </>
    );
  };
  
  export default Cell;