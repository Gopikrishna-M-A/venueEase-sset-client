import React from 'react'
import Link from 'next/link';
import { Button } from 'antd';

import { options } from '../app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next';

const Navbar = async() => {
  const session = await getServerSession(options)  
  const admin = session ? session.user.admin : false;

  return (
    <div className='navbar page'>

        <Link href='/' className="nav-logo-wrapper">
            {/* <div className="nav-logo-img"></div> */}
            <div className="nav-logo-text">VenueEase</div>

        </Link>
        <div className="nav-links-wrapper">
            <Link className="nav-link" href='/reservation'><div >Reservations</div></Link>
            <Link className="nav-link" href='/admin'><div >Admin</div></Link>
            
            
            
           
            
        </div>

        <div className="nav-button-wrapper">
            {session ? <Link href='/api/auth/signout'><Button className="nav-button">Sign out</Button></Link> : <Link href='/api/auth/signin'><Button className="nav-button">Sign in</Button></Link>}
            { admin ? <Link href='/admin'>{session && <img src={session.user.image} className="nav-logo-img"></img>}</Link> : <Link href='/'>{session && <img src={session.user.image} className="nav-logo-img"></img>}</Link>}
          
        </div>

    </div>
  )
}

export default Navbar