'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import axios from "axios";
import {
  Typography,
  Carousel,
  Button,
  Select,
  Form,
  Input,
  DatePicker,
  message
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";



dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const { Text, Title } = Typography;
const { TextArea } = Input;
const contentStyle = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#d9d9d9",
  borderRadius: "4px",
};

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const VenueDetails = ({ baseURL, user }) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [form] = Form.useForm();
  const [venue, setVenue] = useState([]);
  useEffect(() => {
    const fetchVenue = async () => {
      axios
        .get(`${baseURL}/api/venues/${id}`)
        .then((response) => {
          setVenue(response.data);
        })
        .catch((error) => {
          console.error("Error fetching venue data:", error);
        });
    };
    fetchVenue();
  }, [id]);

  const onChange = (currentSlide) => {
    
  };

  const onFinish = async (values) => {
    const updatedValues = {
      ...values,
      venueId: id,
    };

    try {
      const response = await axios.post(
        `${baseURL}/api/reservations/${user._id}`,
        updatedValues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        message.success("reservation successful.");
        form.resetFields();
      } else {
        message.error("try again");
      }
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      // setLoading(false)
    }
  };
  const onFinishFailed = (errorInfo) => {
  };
  return (
    <>
      <div className="venue-left-section">
        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <div className="desc Row Vertical">
          <Title className="card-title" level={4}>
            {venue.venueName}
          </Title>
          <Text className="card-location" >
            {venue.location}
          </Text>
          <Text className="card-location" type="secondary">
            {venue.venueDescription}
          </Text>
          <div className="ametities">
            {/* {venue.amenities.map((amenity) => (
              <Tag key={amenity} bordered={false}> {amenity}</Tag>
            ))} */}
          </div>
        </div>
      </div>
      <div className="venue-right-section">
        <Form form={form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            name="eventName"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="event name" />
          </Form.Item>

          <Form.Item
            name="eventType"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="type of event"
              onChange={onChange}
              options={[
                {
                  value: "Meeting",
                  label: "Meeting",
                },
                {
                  value: "Hackathon",
                  label: "Hackathon",
                },
                {
                  value: "Other",
                  label: "Other",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="eventDesc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={4} placeholder="event desc" />
          </Form.Item>

          <Form.Item
            name="reservationDate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <RangePicker
              disabledDate={disabledDate}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs("00:00:00", "HH:mm"),
                  dayjs("11:59:59", "HH:mm"),
                ],
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>

          <Form.Item
          >
            <Button block type="primary" htmlType="submit">
              Reserve
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default VenueDetails;
