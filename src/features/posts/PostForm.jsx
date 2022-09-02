import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { allUsers, getUsers } from '../users/usersSlice';
import { addPost } from './postsSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const { users } = useSelector(allUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPost({
                title,
                body: content,
                author: userId,
                id: nanoid(),
                date: new Date().toISOString(),
                reactions: {
                    good: 0,
                    bad: 0,
                },
            })
        );
        setTitle('');
        setContent('');
        navigate('/');
    };

    return (
        <div
            style={{
                minHeight: '81vh',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px 0px',
            }}
        >
            <h2>Add Post 😎</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '50%',
                }}
            >
                <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value="Unknow Artist">Author</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button>Send</button>
            </form>
        </div>
    );
};

export default PostForm;
