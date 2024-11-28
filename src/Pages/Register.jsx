import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/UserSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//   import { createUserCart } from "../slices/CartSlice";
import { Signup } from "../assets";
import { createUserCart } from "../slices/CartSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password_err, setPasswordErr] = useState(null);
  const [email_err, setEmailErr] = useState(null);
  const [confirm_err, setConfirmErr] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    userInfo?.role=='Buyer' && dispatch(createUserCart(userInfo._id));
    userInfo && navigate("/");
  }, [userInfo]);

  const handlePassword = (value) => {
    setPassword(value);
    if (!value.match(/[A-Z]/)) {
      setPasswordErr("must contain capital letter");
    } else if (!value.match(/[0-9]/)) {
      setPasswordErr("must contain a number");
    } else if (!value.match(/[@#$%*]/)) {
      setPasswordErr("must contain ne of these(@,#,$,%,*)");
    } else if (value.length < 8) {
      setPasswordErr("should have atleast 8 character");
    } else {
      setPasswordErr(null);
      return true;
    }
    return false;
  };

  const handleEmail = (email) => {
    setEmail(email);
    const emailMatchRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email.match(emailMatchRegex)) {
      setEmailErr("Please enter a valid Email ID");
    } else {
      setEmailErr(null);
      return true;
    }
    return false;
  };

  const handleConfirm = (value) => {
    setConfirm(value);
    if (!(value === password)) {
      setConfirmErr("Password should mach");
    } else {
      setConfirmErr(null);
      return true;
    }
    return false;
  };

  const handleRoleChange = (event) => {
    setRole((event.target).value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      handleEmail(email) &&
      handlePassword(password) &&
      handleConfirm(confirm)
    ) {
      console.log("data logg",name,email,password,role)
      dispatch(registerUser({ name, email, password,role }));
      setError(null);
    } else {
      setError("Invalid Data");
    }
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={4}
          sx={{
            minWidth: "60vw",
            minHeight: "70vh",
            margin: 2,
            padding: {
              xs: 4,
              sm: 8,
            },
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: 5,
          }}
        >
          <Box
            sx={{
              height: {
                xs: "300px",
                md: "380px",
                lg: "450px",
              },
              width: {
                xs: "100%",
                lg: "50%",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={Signup} alt="" style={{ height: "100%" }} />
          </Box>

          {/*  */}


          <Box
            sx={{
              height: "100%",
              width: {
                xs: "100%",
                lg: "50%",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h5">
              Register
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Username"
              variant="standard"
              fullWidth
            />
            <TextField
              error={email_err}
              value={email}
              onChange={(e) => handleEmail(e.target.value)}
              label="Email"
              type={"email"}
              variant="standard"
              helperText={email_err && email_err}
              fullWidth
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
              <RadioGroup
              row
                aria-labelledby="demo-row-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={handleRoleChange}
              >
                <FormControlLabel value="Buyer" control={<Radio />} label="Buyer" />
                <FormControlLabel value="Seller" control={<Radio />} label="Seller" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ display: "flex", position: "relative" }}>
              <TextField
                error={password_err}
                value={password}
                onChange={(e) => handlePassword(e.target.value)}
                label="Password"
                type={show ? "text" : "password"}
                variant="standard"
                helperText={password_err && password_err}
                fullWidth
              />
              {show ? (
                <VisibilityOffIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              )}
            </Box>
            <Box sx={{ display: "flex", position: "relative" }}>
              <TextField
                error={confirm_err}
                value={confirm}
                onChange={(e) => handleConfirm(e.target.value)}
                label="Confirm Password"
                type={show2 ? "text" : "password"}
                variant="standard"
                fullWidth
                helperText={confirm_err && confirm_err}
              />
              {show2 ? (
                <VisibilityOffIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow2(!show2)}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow2(!show2)}
                />
              )}
            </Box>

            <Button type="submit" variant="contained" fullWidth>
              Submit
            </Button>
            <Typography>
              Have an account?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
                underline="always"
              >
                {" "}
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </form>
    </Stack>
  );
};
export default Register;