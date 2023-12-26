'use client'
import React from 'react'
import Image from 'next/image'
import { Button, Typography } from 'antd';
import Link from 'next/link';
const { Title, Paragraph, Text } = Typography;

const Home = () => {
  return (
    <div className="home">
      <div className="home-left">
        <Image src="/images/hero.jpg" alt="hero" width={768} height={768} />
      </div>
      <div className="home-right">
        <div level={1} className="hero-title">EASY BOOKING</div>
        <Text type='secondary' className="hero-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry.
        </Text>
        <Link href={'/venues'}>
            <Button style={{width:"200px", marginLeft:"10px",marginTop:10}} type='primary' size='large'>Book Now</Button>
        </Link>

      </div>
    </div>
  );
}

export default Home