'use client'
import React, { useState, useEffect } from "react";
import AdminLarge from './AdminLarge'
import AdminSmall from './AdminSmall'

const AdminPage = ({ baseURL, user }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
      
      useEffect(() => {
        // Attach event listener when the component mounts
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); 

     
  
  return (
    <>
    {windowWidth < 500 ? <AdminSmall baseURL={baseURL} user={user} /> : <AdminLarge baseURL={baseURL} user={user} /> }
    </>
  );
};

export default AdminPage;
