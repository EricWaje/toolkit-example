import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { allUsers, getUsers } from '../users/usersSlice';
import { editPost } from './postsSlice';

const EditPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const { users } = useSelector(allUsers);

    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id === postId)
    );

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    //console.log(post);
    //console.log(users);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            editPost({
                title,
                id: post.id,
                body: content,
                author: userId,
                date: new Date().toISOString(),
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
            <h2>Edit Post 📝</h2>
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
                    placeholder={post.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    type="text"
                    placeholder={post.body}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button>Edit</button>
            </form>
        </div>
    );
};

export default EditPost;
