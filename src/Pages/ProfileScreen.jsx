import { Alert, Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../slices/UserSlice";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
function ProfileScreen() {
  useEffect(() => {
    let user = localStorage.getItem("userInfo")
    if(!user){navigate('/login')}
  }, []);
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  const { name, email,role,_id } = useSelector((state) => state?.user?.userInfo);
  const [username, setUsername] = useState(name);
  const [roles, setRoles] = React.useState(role);

  const handleRoleChange = (event) => {
    setRoles(event.target.value);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log("name",username);
    dispatch(updateUser({_id, name:username,role:roles }));
    Swal.fire({
      title: "Updated!",
      text: "User got Updated",
      icon: "success"
    });
    navigate('/');
  }
  return (
    // 13th dec 13.22
    <div>
      <Grid container>
        <Grid item md={8} alignContent={"center"}>
          <Box sx={{ display: "flex",mt:5 }}>
            <Stack width={"60%"} spacing={5}>
              <Typography variant="h4" color={"grey"}>
                Profile
              </Typography>
              <TextField
                label="Name"
                value={username}
                onChange={(e) => !checked && setUsername(e.target.value)}
                variant="standard"
                readOnly={checked}
              />
              <TextField
                label="Email"
                value={email}
                readOnly={checked}
                variant="standard"
              />
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                <RadioGroup
                row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Buyer"
                  name="radio-buttons-group"
                  value={roles}
                  onChange={!checked && handleRoleChange}
                >
                  <FormControlLabel value="Seller" control={<Radio />} label="Seller" />
                  <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                </RadioGroup>
              </FormControl>
              <Box>
                <Checkbox onChange={() => setChecked(!checked)} />
                Check here to Update!
              </Box>
              <Button
                variant="contained"
                disabled={checked}
                onClick={handleSubmit}
                sx={{ padding: "0.5rem p" }}
              >
                UPDATE
              </Button>
            </Stack>
          </Box>
        </Grid>
       {(role=='Buyer') &&  <Grid item md={4}>
          <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
            <Typography variant="h5" color={"grey"} fontSize={"1.8"}>
              Order History
            </Typography>
            <Alert sx={{ mt: 2 }} severity="info">
              No Order
            </Alert>
          </Paper>
        </Grid>}
      </Grid>
    </div>
  );
}

export default ProfileScreen;