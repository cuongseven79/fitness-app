import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import HeaderImage from "../../images/header_bg_5.jpg";
import { AiFillStar, AiOutlineTwitter } from "react-icons/ai";
import { FaCrown, FaLinkedinIn } from "react-icons/fa";
import { database } from "../../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import SectionHead from "../../components/SectionHead";
import Card from "../../components/Card";
import { Button, ConfigProvider, Row, Space, Table } from "antd";
import { useAuth } from "../../context/AuthContext";
import './manage_user.css';

const userListColumn = [
  {
    title: "DisplayName",
    dataIndex: "displayName",
  },
  {
    title: "Gender",
    dataIndex: "gender",
  },
  {
    title: "Birthday",
    dataIndex: "birthday",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
  },
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "Start-time",
    dataIndex: "startTime",
  },
  {
    title: "End-time",
    dataIndex: "endTime",
  },
];

const ManageUsers = () => {
  const [userList, setUserList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const { fetchUsersData } = useAuth();

  const fetchData = async () => {
    try {
      const usersData = await fetchUsersData();
      setUserList(usersData);
      setFilteredList(usersData);
      console.log("this is user", usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [fetchUsersData]);

  const filterAll = () => {
    setFilteredList(userList);
    setSelectedFilter("all");
  }

  const filterPT = () => {
    setFilteredList(userList.filter((user) => user.role === "pt"));
    setSelectedFilter("pt");
  }

  const filterCustomer = () => {
    setFilteredList(userList.filter((user) => user.role === "customer"));
    setSelectedFilter("customer");
  }

  return (
    <>
      <Header image={HeaderImage} title="Our Trainers">
        Adipisicing labore laboris ea sunt cillum ea velit.Adipisicing labore la
        boris ea sunt cillum ea velit. sunt cillum ea velit.
      </Header>
      <section className="trainers">
        <div className="container">
        <SectionHead icon={<FaCrown />} title="Manage User" />
        <Space></Space>

          <Row style={{ justifyContent: "space-evenly", width: "50%"}}>
            
            <Space></Space>
            <Button
              onClick={filterAll}
              type="primary"
              style={{ backgroundColor: selectedFilter === "all" ? "blue" : "inherit" }}
            >
              All
            </Button>
            <Space></Space>
            <Button
              onClick={filterPT}
              type="primary"
              style={{ backgroundColor: selectedFilter === "pt" ? "blue" : "inherit" }}
            >
              PT
            </Button>
            <Space></Space>
            <Button
              onClick={filterCustomer}
              type="primary"
              style={{ backgroundColor: selectedFilter === "customer" ? "blue" : "inherit" }}
            >
              Customer
            </Button>
          </Row>

          <ConfigProvider
            theme={{
              token: {
                borderColor: "#000",
                colorText: "#000",
                lineWidth: "2px",
              },
            }}
          >
            <Table
              rowKey={"id"}
              // rowSelection={rowSelection}
              columns={userListColumn}
              dataSource={filteredList}
              bordered={true}
              pagination={{
                showTotal: (total) => `Total ${total} Items`,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
                total: filteredList.length,
                style: { color: "#fff" },
              }}
                style={{
                  marginTop: "10px",
                  border: "2px solid #000",
                  borderRadius: "10px",
                }}
            />
          </ConfigProvider>
        </div>
      </section>
    </>
  );
};

export default ManageUsers;
