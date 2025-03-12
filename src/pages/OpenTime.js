import React, { useEffect, useState } from "react";
import { Table, Tag, Pagination, Select, Card, Input, Row, Col } from "antd";
import { Container, Typography } from "@mui/material";
import { SearchOutlined, CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import WeekAvailability from "../components/WeekAvailability";  // ✅ 引入新组件

const { Option } = Select;

function OpenTime() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("/time.txt")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredData = data.filter(item => 
    item.id.includes(searchText) || 
    item.language.toLowerCase().includes(searchText.toLowerCase()) || 
    item.state.toLowerCase().includes(searchText.toLowerCase()) || 
    item.location.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const columns = [
    { title: "ID", dataIndex: "id", sorter: (a, b) => a.id.localeCompare(b.id) },
    { title: "Hours", dataIndex: "hours", sorter: (a, b) => parseInt(a.hours) - parseInt(b.hours) },
    { title: "Language", dataIndex: "language", sorter: (a, b) => a.language.localeCompare(b.language) },
    { title: "Location", dataIndex: "location", sorter: (a, b) => a.location.localeCompare(b.location) },
    {
      title: "State",
      dataIndex: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
      render: (state) => {
        let color = state === "Active" ? "green" : state === "Pending" ? "orange" : "red";
        return <Tag color={color}>{state}</Tag>;
      },
    }
  ];

  return (
    <Container>
      <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
        <Col>
          <Typography variant="h4">Open Time Status</Typography>
        </Col>
        <Col>
          <Input 
            placeholder="Search by ID, Language, State, or Location" 
            prefix={<SearchOutlined />} 
            onChange={(e) => setSearchText(e.target.value)} 
            style={{ width: "300px" }}
          />
        </Col>
      </Row>
      
      <Card style={{ borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)" }}>
        <Table 
          columns={columns} 
          dataSource={paginatedData} 
          loading={loading} 
          pagination={false} // 关闭 Table 内建的分页功能
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: "10px 20px" }}>
                <p><strong>ID:</strong> {record.id}</p>
                <p><strong>Hours:</strong> {record.hours}</p>
                <p><strong>Language:</strong> {record.language}</p>
                <p><strong>Location:</strong> {record.location}</p>
                <p><strong>State:</strong> {record.state}</p>
                <WeekAvailability preferredDays={record.preferred_date || []} />
              </div>
            ),
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <CaretDownOutlined
                  style={{ fontSize: 16 }}
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <CaretRightOutlined
                  style={{ fontSize: 16 }}
                  onClick={(e) => onExpand(record, e)}
                />
              )
          }}
          style={{ borderRadius: "8px" }}
        />
      </Card>

      {/* 修改后的分页器 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Pagination 
          current={page} 
          pageSize={pageSize} 
          total={filteredData.length} 
          onChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }} 
          showSizeChanger
          pageSizeOptions={['10', '20', '30', '50']}
          style={{ display: 'inline-block' }}
        />
      </div>
    </Container>
  );
}

export default OpenTime;
