"use client";
import React, { useState, useEffect } from "react";
import AdminCard from "../components/AdminCard";
import { Tabs, Typography, Modal, message } from "antd";
import axios from "axios";

const { Text, Title } = Typography;
const { TabPane } = Tabs;

const AdminPage = ({ baseURL, user }) => {
  const [reservations, setReservations] = useState({
    pendingReservations: [],
    acceptedReservations: [],
    rejectedReservations: [],
  });
  const [status, setStatus] = useState("Pending");

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/reservations/`);
      setReservations(response.data);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [status]);

  const showConfirm = (reservationId, newStatus) => {
    Modal.confirm({
      title: "Confirm Status Change",
      content: `Are you sure you want to change the status to '${newStatus}'?`,
      onOk() {
        axios.patch(`${baseURL}/api/reservations/${reservationId}`, {
          status: newStatus,
        });
        setStatus(newStatus);
        fetchReservations();
      },
      onCancel() {},
    });
  };

  const handleStatusChange = (reservationId, newStatus) => {
    showConfirm(reservationId, newStatus);
  };

  const tabContent = [
    {
      key: "1",
      label: "Pending",
      reservations: reservations.pendingReservations,
    },
    {
      key: "2",
      label: "Accepted",
      reservations: reservations.acceptedReservations,
    },
    {
      key: "3",
      label: "Rejected",
      reservations: reservations.rejectedReservations,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={setStatus} type="card">
        {tabContent.map((tab) => (
          <TabPane key={tab.key} tab={tab.label}>
            <div className={`${tab.label} Row Vertical AI-C P-10`}>
              {tab.reservations.map((reservation) => (
                <AdminCard
                  key={reservation._id}
                  name={reservation.venueId.venueName}
                  timing={reservation.reservationDate}
                  description={reservation.eventDesc}
                  status={reservation.status}
                  type={reservation.eventType}
                  owner={reservation.userId.name}
                  email={reservation.userId.email}
                  phone={reservation.userId.phone}
                  venue={reservation.venueId.venueName}
                  id={reservation._id}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </>
  );
};

export default AdminPage;
