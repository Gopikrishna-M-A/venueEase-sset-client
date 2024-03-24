"use client";
import React, { useState, useEffect } from "react";
import AdminCard from "../components/AdminCard";
import { Typography, Modal, Input } from "antd";
import axios from "axios";

const { Text, Title } = Typography;

const AdminPage = ({ baseURL, user }) => {
  const [reservations, setReservations] = useState({
    pendingReservations: [],
    acceptedReservations: [],
    rejectedReservations: [],
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Pending");
  const [newStatus,setNewStatus] = useState('')
  const [reservationId,setReservationId] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const response = axios.patch(
      `${baseURL}/api/reservations/${reservationId}`,
      { status: newStatus }
    );
    setStatus(newStatus);
    fetchReservations();
    const reserv1 = reservations["pendingReservations"].filter(
      (reservation) => reservation._id === reservationId
    );
    const reserv2 = reservations["acceptedReservations"].filter(
      (reservation) => reservation._id === reservationId
    );
    const reserv3 = reservations["rejectedReservations"].filter(
      (reservation) => reservation._id === reservationId
    );
    const reservation = reserv1[0] || reserv2[0] || reserv3[0];
    axios.post("/api/send", { user,status:newStatus,reservation,message}).then((res)=>console.log("res",res))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/reservations/`);
      setReservations(response.data);
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [status]);

  // const showConfirm = (reservationId, newStatus) => {
  //   Modal.confirm({
  //     title: "Confirm Status Change",
  //     content: `Are you sure you want to change the status to '${newStatus}'?`,

  //     onOk() {
  //       const response = axios.patch(
  //         `${baseURL}/api/reservations/${reservationId}`,
  //         { status: newStatus }
  //       );
  //       setStatus(newStatus);
  //       fetchReservations();
  //       const reserv1 = reservations["pendingReservations"].filter(
  //         (reservation) => reservation._id === reservationId
  //       );
  //       const reserv2 = reservations["acceptedReservations"].filter(
  //         (reservation) => reservation._id === reservationId
  //       );
  //       const reserv3 = reservations["rejectedReservations"].filter(
  //         (reservation) => reservation._id === reservationId
  //       );
  //       const reservation = reserv1[0] || reserv2[0] || reserv3[0];
  //       // axios.post("/api/send", { user,status:newStatus,reservation}).then((res)=>console.log("res",res))
  //     },
  //     onCancel() {},
  //   });
  // };

  const handleStatusChange = (reservationId, newStatus) => {
    // showConfirm(reservationId, newStatus);
    setNewStatus(newStatus)
    setReservationId(reservationId)
    showModal()
  };

  return (
    <>
      <div className="Pending Row Vertical AI-C P-10">
        <Title level={3} className="admin-page-title">
          Pending
        </Title>
        {reservations.pendingReservations.map((reservation) => {
          return (
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
          );
        })}
      </div>
      <div className="Accepted Row Vertical AI-C P-10">
        <Title level={3} className="admin-page-title">
          Accepted
        </Title>
        {reservations.acceptedReservations.map((reservation) => {
          return (
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
          );
        })}
      </div>
      <div className="Rejected Row Vertical AI-C P-10">
        <Title level={3} className="admin-page-title">
          Rejected
        </Title>
        {reservations.rejectedReservations.map((reservation) => {
          return (
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
          );
        })}
      </div>
      <Modal title="Confirm Status Change" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
            <p>Are you sure you want to change the status to '{newStatus}'?</p>
            <Input.TextArea
              value={message}
              placeholder="Enter additional information"
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
      </Modal>
    </>
  );
};

export default AdminPage;
