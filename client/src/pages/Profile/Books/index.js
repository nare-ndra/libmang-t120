import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import BookForm from "./BookForm";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loadersSlice";
import { DeleteBook, GetAllBooks } from "../../../apicalls/books";
import { message, Table } from "antd";
import moment from 'moment';
import Issues from './Issues';
import IssueForm from "./IssueForm";

function Books() {
  const [openBookForm, setOpenBookForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [formType, setFormType] = useState(false);
  const [openIssues, setOpenIssues] = useState(false);
  const [openIssuesForm, setOpenIssuesForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();

  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteBook = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBook(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );

  const columns = [
    {
      title: "Book",
      dataIndex: "image",
      render: (image) => <img src={image} alt="book" width="60" height="60" />,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
    },
    {
      title: "Total Copies",
      dataIndex: "totalCopies",
    },
    {
      title: "Available Copies",
      dataIndex: "availableCopies",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (date) => moment(date).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Actions",
      dataIndex: 'action',
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-edit-box-line"
            onClick={() => {
              setFormType('edit');
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          ></i>
          <i
            className="ri-delete-bin-7-line"
            onClick={() => deleteBook(record._id)}
          ></i>
          <span
            className="underline"
            onClick={() => {
              setOpenIssues(true);
              setSelectedBook(record);
            }}
          >
            Issues
          </span>
          <span
            className="underline"
            onClick={() => {
              setOpenIssuesForm(true);
              setSelectedBook(record);
            }}
          >
            Issue Book
          </span>
        </div>
      ),
    },
  ];

  const tableHeaderStyle = {
    background: " #E84545", // Set the background color to orange
    fontWeight: "bold",
    color: "white", // Optionally, set other styles for the header
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="custom-search-container" style={{ marginLeft: "10px" }}>
          <input
            type="text"
            placeholder="Search books..."
            onChange={(e) => handleSearch(e.target.value)}
            className="custom-search-input"
          />
          <button className="custom-search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <Button
          title="Add Book"
          onClick={() => {
            setFormType('add');
            setSelectedBook(null);
            setOpenBookForm(true);
          }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredBooks}
        className="mt-1 custom-table"
        components={{
          header: {
            cell: (props) => <th style={tableHeaderStyle}>{props.children}</th>,
          },
        }}
        scroll={{ x: true }}
        responsive
      />

      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
      {openIssues && (
        <Issues
          open={openIssues}
          setOpen={setOpenIssues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          reloadBooks={getBooks}
        />
      )}
      {openIssuesForm && (
        <IssueForm
          open={openIssuesForm}
          setOpen={setOpenIssuesForm}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          getData={getBooks}
          type="add"
        />
      )}
    </div>
  );
}

export default Books;
