import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { HomeOutlined, ClockCircleOutlined, FileOutlined, LogoutOutlined } from "@ant-design/icons";
import Home from "./pages/Home";
import OpenTime from "./pages/OpenTime";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Login from "./pages/Login";
import "antd/dist/reset.css";

const { Header, Sider, Content } = Layout;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            style={{
              background: "linear-gradient(180deg, #001529, #003a8c)", // 现代渐变蓝色背景
              color: "white",
            }}
          >
            {/* Logo 区域 */}
            <div className="logo" style={{ color: "white", textAlign: "center", padding: "16px", fontSize: "18px" }}>
              Allcare Health Care
            </div>

            {/* 导航菜单 */}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ background: "transparent" }}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<ClockCircleOutlined />}>
                <Link to="/opentime">Open Time</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FileOutlined />}>
                <Link to="/page2">Page 2</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<FileOutlined />}>
                <Link to="/page3">Page 3</Link>
              </Menu.Item>
            </Menu>

            {/* 退出登录按钮（固定到底部） */}
            <div style={{ position: "absolute", bottom: "70px", width: "100%", textAlign: "center" }}>
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                onClick={() => setIsAuthenticated(false)}
                style={{
                  width: "80%",
                  backgroundColor: "#ff4d4f",
                  borderColor: "#ff4d4f",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                }}
                hover={{
                  backgroundColor: "#d9363e",
                  borderColor: "#d9363e",
                }}
              >
                退出登录
              </Button>
            </div>
          </Sider>

          <Layout>
            <Header style={{ background: "#fff", padding: 0, textAlign: "center", fontSize: "20px" }}>
              Welcome to Allcare Health Care
            </Header>
            <Content style={{ margin: "16px" }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/opentime" element={<OpenTime />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </Router>
  );
}

export default App;
