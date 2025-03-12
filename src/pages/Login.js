import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import axios from "axios";

export default function SignIn({ setIsAuthenticated }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setLoading(true);
  
    try {
      const response = await axios.post("https://your-api.onrender.com/login", { 
        username: data.get("username"),
        password: data.get("password"),
      });
  
      console.log("Server response:", response.data); // ✅ 添加调试信息，检查服务器返回内容
  
      if (response.data.success) {
        setIsAuthenticated(true);  // ✅ 登录成功后更新状态
        navigate("/");  // ✅ 跳转到首页
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error); // ✅ 检查是否请求失败
      alert("Login failed. Please try again.");
    }
    setLoading(false);
  };
  

  return (
    // <Grid container component="main" sx={{ height: "100vh" }}>
    //修改背景颜色
    <Grid container component="main" sx={{ height: "100vh", backgroundColor: "#F8FBFF" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={10}
        square
        sx={styles.cardContainer}
      >
        <Box sx={styles.cardContent}>
          {/* Logo + Sign in 标题 */}
          <Typography variant="h6" sx={styles.logo}>
            <span style={{ color: "#1976d2", fontWeight: "bold" }}>Allcare Health</span>
          </Typography>
          <Typography component="h1" variant="h5" sx={styles.title}>
            Sign in
          </Typography>

          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 2 }}>
            {/* 用户名输入框 */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              sx={styles.inputField}
            />
            {/* 密码输入框 */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={styles.inputField}
            />
            {/* 记住我 + 忘记密码（不可点击） */}
            <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
            <Link variant="body2" sx={styles.link}>
              Forgot your password?
            </Link>

            {/* 登录按钮 */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.signInButton}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            {/* 分割线 */}
            <Divider sx={{ my: 3 }}>or</Divider>

            {/* Google 和 Facebook 登录按钮（仅 UI，不可点击） */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  sx={styles.googleButton}
                >
                  Sign in with Google
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  sx={styles.facebookButton}
                >
                  Sign in with Facebook
                </Button>
              </Grid>
            </Grid>

            {/* 注册提示（仅 UI，不可点击） */}
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Link variant="body2" sx={styles.link}>
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const styles = {
  cardContainer: {
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    maxWidth: "400px",
  },
  cardContent: {
    width: "100%",
  },
  logo: {
    textAlign: "left",
    width: "100%",
    mb: 1,
  },
  title: {
    textAlign: "left",
    fontWeight: "bold",
  },
  inputField: {
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
  },
  link: {
    display: "block",
    textAlign: "right",
    cursor: "default",
    textDecoration: "none",
    mt: 1,
  },
  signInButton: {
    mt: 3,
    mb: 2,
    backgroundColor: "black",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
  googleButton: {
    borderColor: "#4285F4",
    color: "#4285F4",
    borderRadius: "8px",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#E8F0FE",
    },
  },
  facebookButton: {
    borderColor: "#1877F2",
    color: "#1877F2",
    borderRadius: "8px",
    padding: "12px",
    "&:hover": {
      backgroundColor: "#E8F0FE",
    },
  },
};

