import React, { useState } from 'react';
import { Typography, Tag, Modal, Button } from "antd";
import { InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;




const AdminCard = ({ id, name, timing, description, status, type, owner, email, phone, venue, onStatusChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
  const startTime = formatDate(timing[0]);  
  const endTime = formatDate(timing[1]);
  
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleStatusChange = (newStatus) => {
    onStatusChange(id, newStatus);
  };

  return (
    <div className='admin-card-wrapper'>
        <div className="card-head Row JC-SB">
        <Tag className="card-item card-Owner" bordered={false}>
            {owner}
        </Tag>
        <Button type="link" onClick={showModal}>More</Button>
        </div>
        <Title level={4} className="admin-card-title">{name}</Title>
        <Text className="card-item card-type">
            {type}
        </Text>
        <Text className="card-item card-timing" >
            {startTime} - {endTime}
        </Text>
        <div className="card-item card-actions">

        <InfoCircleOutlined   
        onClick={() => handleStatusChange('Pending')}
        className='admin-action-icon pending-icon'/>

        <CheckCircleOutlined  
        onClick={() => handleStatusChange('Accepted')}
        className='admin-action-icon accept-icon'/>
        
        <CloseCircleOutlined  
        onClick={() => handleStatusChange('Rejected')}
        className='admin-action-icon reject-icon'/>

        </div>
        <Modal
        title="Event Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <p><strong>Event Name:</strong> {name}</p>
        <p><strong>Booked By:</strong> {owner}</p>
        <p><strong>Event Description:</strong> {description}</p>
        <p><strong>Number of Attendees:</strong> 100</p>
        <p><strong>Venue:</strong> {venue}</p>
        {/* <p><strong>Timing:</strong> {timing}</p> */}
        {/* <p><strong>Contact Number:</strong>{phone}</p> */}
        <p><strong>Email:</strong> {email}</p>
      </Modal>
    </div>
  )
}

export default AdminCard