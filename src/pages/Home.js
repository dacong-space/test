import React from "react";
import { Container, Typography, Card } from "@mui/material";

function Home() {
  return (
    <Container style={styles.container}>
      {/* 公司信息展示 */}
      <Card style={styles.card}>
        <img
          src="/path/to/your/banner-image.jpg" // ✅ 替换为你的公司 Banner 图片路径
          alt="Company Banner"
          style={styles.banner}
        />
        <Typography variant="h4" gutterBottom>
          Welcome to Allcare Health Care
        </Typography>
        <Typography variant="body1" style={{ marginBottom: "20px" }}>
          我们致力于提供优质的家庭护理服务，帮助每一位客户享受舒适的生活。
        </Typography>

        <Typography variant="h6">📢 最新公告：</Typography>
        <ul style={styles.announcementList}>
          <li>🎉 公司将在 4 月 10 日举办健康护理讲座，欢迎报名！</li>
          <li>🏆 荣获 2024 年度最佳居家护理服务奖</li>
          <li>📅 记得定期更新您的护理计划，我们的护理专家将为您提供专业支持</li>
        </ul>
      </Card>
    </Container>
  );
}

const styles = {
  container: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    borderRadius: "10px",
  },
  banner: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  announcementList: {
    textAlign: "left",
    paddingLeft: "20px",
  },
};

export default Home;
