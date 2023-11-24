'use client'
import React, { useState, useEffect } from 'react';
import Card from "../components/Card";
import Link from "next/link";
import axios from "axios";

const HomePage = ({ baseURL }) => {
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
      {venues.map((venue) => (
        <Link key={venue._id} href={`/venue/?id=${venue._id}`}>
          <Card title={venue.venueName} location={venue.location} />
        </Link>
      ))}
    </>
  );
};

export default HomePage;
