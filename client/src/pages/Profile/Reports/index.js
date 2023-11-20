import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetReports } from "../../../apicalls/reports";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function Reports() {
  const [reports, setReports] = React.useState(null);

  const dispatch = useDispatch();
  const getReports = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReports();
      dispatch(HideLoading());
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {/* Books */}
        <Col span={6}>
          <div className="shadow p-2 bg-white rounded-md">
            <h1 className="text-secondary text-xl font-bold uppercase mb-4">
              Books
            </h1>
            <div className="border-b-2 mb-2"></div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Total Books</h1>
              <h1 className="font-semibold">{reports?.books?.booksCount}</h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Total Copies</h1>
              <h1 className="font-semibold">
                {reports?.books?.totalBooksCopiesCount}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Available Copies</h1>
              <h1 className="font-semibold">
                {reports?.books?.availableBooksCopiesCount}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Issued Copies</h1>
              <h1 className="font-semibold">
                {reports?.books?.issuesBooksCopiesCount}
              </h1>
            </div>
          </div>
        </Col>

        {/* Users */}
        <Col span={6}>
          <div className="shadow p-2 bg-white rounded-md">
            <h1 className="text-secondary text-xl font-bold uppercase mb-4">
              Users
            </h1>
            <div className="border-b-2 mb-2"></div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Total Users</h1>
              <h1 className="font-semibold">{reports?.users?.usersCount}</h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Patrons</h1>
              <h1 className="font-semibold">{reports?.users?.patronsCount}</h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Librarians</h1>
              <h1 className="font-semibold">
                {reports?.users?.librariansCount}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Admins</h1>
              <h1 className="font-semibold">{reports?.users?.adminsCount}</h1>
            </div>
          </div>
        </Col>

        {/* Issues */}
        <Col span={6}>
          <div className="shadow p-2 bg-white rounded-md">
            <h1 className="text-secondary text-xl font-bold uppercase mb-4">
              Issues
            </h1>
            <div className="border-b-2 mb-2"></div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Total Issues</h1>
              <h1 className="font-semibold">{reports?.issues?.issuesCount}</h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Returned Issues</h1>
              <h1 className="font-semibold">
                {reports?.issues?.returnedIssuesCount}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Pending Issues</h1>
              <h1 className="font-semibold">
                {reports?.issues?.pendingIssuesCount}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Overdue Issues</h1>
              <h1 className="font-semibold">
                {reports?.issues?.overdueIssuesCount || 0}
              </h1>
            </div>
          </div>
        </Col>

        {/* Revenue */}
        <Col span={6}>
          <div className="shadow p-2 bg-white rounded-md">
            <h1 className="text-secondary text-xl font-bold uppercase mb-4">
              Revenue
            </h1>
            <div className="border-b-2 mb-2"></div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Total Revenue</h1>
              <h1 className="font-semibold">
                {reports?.revenue?.totalCollected}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Rent Collected</h1>
              <h1 className="font-semibold">
                {reports?.revenue?.rentCollected}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Penalty Collected</h1>
              <h1 className="font-semibold">
                {reports?.revenue?.fineCollected}
              </h1>
            </div>
            <div className="flex justify-between mt-2">
              <h1 className="text-md">Rent Pending</h1>
              <h1 className="font-semibold">
                {reports?.revenue?.rentPending}
              </h1>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Reports;
