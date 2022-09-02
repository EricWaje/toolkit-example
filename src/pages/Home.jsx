import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <footer
                style={{ backgroundColor: '#181818', minHeight: '6vh' }}
            ></footer>
        </>
    );
};

export default Layout;
