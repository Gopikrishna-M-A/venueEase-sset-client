'use client'
import React, { useState, useEffect } from "react";
import AdminCard from '../components/AdminCard'
import { Typography, Modal } from "antd";
import axios from "axios";

const { Text, Title } = Typography;


const AdminPage = ({ baseURL, user }) => {

    const [reservations, setReservations] = useState({
        pendingReservations: [],
        acceptedReservations: [],
        rejectedReservations: [],
      });
      const [status, setStatus] = useState('Pending');
    
     
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
    
    
      
    
    
      const showConfirm = (reservationId,newStatus) => {
        Modal.confirm({
          title: 'Confirm Status Change',
          content: `Are you sure you want to change the status to '${newStatus}'?`,
          onOk() {
            const response = axios.patch(`${baseURL}/api/reservations/${reservationId}`, { status: newStatus })
            setStatus(newStatus)
            fetchReservations();
          },
          onCancel() {
    
          },
        });
      };
      
    
      const handleStatusChange = (reservationId, newStatus) => {
        showConfirm(reservationId,newStatus);
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
    </>
  );
};

export default AdminPage;
