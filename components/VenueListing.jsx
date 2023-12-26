'use client'
import React, { useState, useEffect } from 'react';
import Card from "./Card";
import Link from "next/link";
import axios from "axios";
import { InputNumber } from "antd";

const VenueListing = ({ baseURL }) => {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
      axios.get(`${baseURL}/api/venues/`)
        .then((response) => {
          setVenues(response.data);
        })
        .catch((error) => {
          console.error('Error fetching venue data:', error);
        });
    }, []);
  return (
    <>
      <div className='venue-filters'>
        Capacity : &nbsp;
        <InputNumber min={1} max={100} placeholder='Capacity' />
      </div>
      {venues.map((venue) => (
        <Link key={venue._id} href={`/venue/?id=${venue._id}`}>
          <Card venue={venue} />
        </Link>
      ))}
    </>
  );
};

export default VenueListing;
