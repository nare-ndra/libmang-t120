import { message, Table, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import moment from "moment";
import { GetAllUsers } from "../../../apicalls/users";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";

const { Search } = Input;

function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [users, setUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    role === "patron" && {
      title: "Actions",
      dataIndex: "actions",
      render: (actions, record) => (
        <div>
          <Button
            title="Books"
            variant="contained"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
          />
        </div>
      ),
    },
  ].filter(Boolean);

  const tableHeaderStyle = {
    background: " #E84545", // Set the background color to orange
    fontWeight: "bold",
    color: "white", // Optionally, set other styles for the header
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
      <div className="custom-search-container" style={{marginLeft:"10px"}}>

        <input
        type="text"
          placeholder="Search users by name"
          onChange={(e) => handleSearch(e.target.value)}
          className="custom-search-input"    style={{"width":"200px"}}    />
          <button className="custom-search-button">
            Search
          </button>
      </div></div>
      <Table
        dataSource={filteredUsers}
        columns={columns}
        components={{
          header: {
            cell: (props) => <th style={tableHeaderStyle}>{props.children}</th>,
          },
        }}
      />

      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
}

export default Users;
