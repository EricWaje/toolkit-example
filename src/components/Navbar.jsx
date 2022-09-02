import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h1>Redux-toolkit</h1>
            <ul>
                <Link to="/">Home</Link>
                <Link to="post">Post</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
