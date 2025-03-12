import React from "react";
import { Tag } from "antd";

// 星期缩写
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeekAvailability = ({ preferredDays }) => {
  return (
    <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
      {daysOfWeek.map((day) => (
        <Tag
          key={day}
          color={preferredDays.includes(day) ? "blue" : "default"} // 高亮有效天数
          style={{
            width: "32px",
            height: "32px",
            textAlign: "center",
            lineHeight: "32px",
            fontSize: "14px",
            fontWeight: preferredDays.includes(day) ? "bold" : "normal",
            borderRadius: "4px",
          }}
        >
          {day.charAt(0)}
        </Tag>
      ))}
    </div>
  );
};

export default WeekAvailability;
