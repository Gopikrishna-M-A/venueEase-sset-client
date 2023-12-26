import React from "react";
import VenueListing from "../../components/VenueListing";
const baseURL = process.env.BASE_URL;

const page = () => {
  return (
    <div className="page venue-listing">
      <VenueListing baseURL={baseURL} />
    </div>
  );
};

export default page;
