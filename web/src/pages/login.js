import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authAction";

const initialState = { email: "", password: "" };
const Login = () => {
  const { auth } = useSelector((state) => state);

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const onChangeUserData = (e) => {
    console.log(e.target.name, e.target.value, email, password);
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (auth.token) {
      navigate("/");
    }
  }, [auth.token, navigate]);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        ログイン
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="メールアドレス"
          autoComplete="email"
          autoFocus
          name="email"
          value={email}
          onChange={onChangeUserData}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="パスワード"
          type="password"
          id="password"
          autoComplete="current-password"
          name="password"
          value={password}
          onChange={onChangeUserData}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={email && password ? false : true}
        >
          ログイン
        </Button>
      </Box>
    </Box>
  );
};

export default Login;