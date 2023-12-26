'use client'
import React, { useState, useEffect } from "react";
import { Space, Button, Modal, Table, Tag, message } from "antd";
import axios from "axios";

const ReservationsTable = ({ baseURL, user }) => {
    const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/reservations/${user._id}`);
        setReservations( response.data);
      } catch (error) {
        message.error(error.response.data.message);
      } finally {
        // setLoading(false)
      }
    };
    fetchReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    showConfirm(reservationId)
  }

  const showConfirm = (reservationId) => {
    Modal.confirm({
      title: 'Confirm Status Change',
      content: `Are you sure you want to delete the reservation ?`,
      onOk() {
        axios.delete(`${baseURL}/api/reservations/${reservationId}`).then((response) => {
          message.success("reservation deleted successfully");
          setReservations(reservations.filter((reservation) => reservation._id !== reservationId));
        }).catch((error) => {
          message.error(error.response.data.message);
        });
      },
      onCancel() {

      },
    });
  };

  const formatDate = (date) => {
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Date(date).toLocaleString(undefined, options);
};


  const data = reservations.map((reservation) => {
    const startTime = formatDate(reservation.reservationDate[0]);
    const endTime = formatDate(reservation.reservationDate[1]);
    return {
      key: reservation._id, // Use a unique key, like the reservation ID
      name: reservation.eventName,
      timing: `${startTime} - ${endTime}`,
      description: reservation.eventDesc,
      status: reservation.status.toLowerCase(), // Ensure it's in lowercase
    };
  });

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Timing",
      dataIndex: "timing",
      key: "age",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "address",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => {
        let color;
        switch (status) {
          case "pending":
            color = "geekblue";
            break;
          case "accepted":
            color = "green";
            break;
          default:
            color = "volcano";
        }
  
        return (
          <>
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button 
          onClick={() => handleDelete(record.key)}
          type="text" 
          danger >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} dataSource={data} />

  )
}

export default ReservationsTable