import React from 'react';
import { useSelector } from 'react-redux';
import { allUsers } from '../users/usersSlice';

const Users = ({ userId }) => {
    const { users } = useSelector(allUsers);
    const user = users.find((u) => u.id === parseInt(userId));
    return (
        <span
            style={{ fontSize: '14px', fontStyle: 'italic', color: '#2f2f2f' }}
        >
            by {user ? user.name : 'Unknow Artist'}
        </span>
    );
};

export default Users;
