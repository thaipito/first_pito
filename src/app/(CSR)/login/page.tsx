"use client";

import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormHTMLAttributes, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type DataLogin = {
  email: string;
  password: string;
};

const LayoutPage = () => {

  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: (data: DataLogin) => {
      return fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    onSuccess: async (data) => {
      const res = await data.json();
      if(res.status === 200){
        router.push('/home')
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center">
          Đăng nhập
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Vui lòng nhập email"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="outlined-adornment-password">
            Mật khẩu
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mật khẩu"
            placeholder="Vui lòng nhập mật khẩu"
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Đăng nhập
        </Button>
      </form>
    </Container>
  );
};

export default LayoutPage;
