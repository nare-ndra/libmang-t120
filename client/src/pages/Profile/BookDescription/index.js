import { Card, Col, Row, message } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetBookById } from "../../../apicalls/books";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function BookDescription() {
  const [bookData, setBookData] = React.useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookById(id);
      dispatch(HideLoading());
      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    bookData && (
      <div className="container mx-auto mt-8">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={24} md={18} lg={16} xl={14}>
            <Card className="rounded-lg shadow-md">
              <div className="flex justify-center">
                <img
                  src={bookData.image}
                  alt={bookData.title}
                  className="rounded-lg"
                  style={{ maxHeight: "400px" }}
                />
              </div>
              <div className="text-center">
                <h1 className="text-3xl text-secondary uppercase font-bold mt-4">
                  {bookData.title}
                </h1>
                <p className="text-md text-gray-600">
                  Author: {bookData.author} | Publisher: {bookData.publisher}
                </p>
                <p className="text-md text-gray-600">
                  Published On: {moment(bookData.publishedDate).format("MMMM YYYY")}
                </p>
                <p className="text-md text-gray-600">
                  Available Copies: {bookData.availableCopies}
                </p>
                <hr className="my-4" />
                <p className="text-lg text-justify">{bookData.description}</p>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  );
}

export default BookDescription;
