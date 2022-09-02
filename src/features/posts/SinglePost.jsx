import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { selectPostById } from './postsSlice';
import Reaction from './Reaction';
import TimeAgo from './TimeAgo';
import Users from './Users';

const SinglePost = () => {
    const { postId } = useParams();
    //const post = useSelector((state) => selectPostById(state, postId));
    const post = useSelector((state) =>
        state.posts.posts.find((p) => p.id === postId)
    );

    if (!post) {
        return (
            <section>
                <h2>No se encontró el Post!</h2>
            </section>
        );
    }

    return (
        <section
            style={{
                minHeight: '81vh',
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px 0px',
            }}
        >
            <div
                className="post"
                key={post.id}
                style={{
                    boxShadow: '3px 3px 10px 1px #ebe5ed',
                    borderRadius: '10px',
                    margin: '10px',
                    padding: '10px',
                    maxWidth: '50%',
                }}
            >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <Link className="link" to={`/post/edit/${post.id}`}>
                    Edit Post
                </Link>
                <Users userId={post.author} />
                <TimeAgo timestamp={post.date} />
                <Reaction post={post} />
            </div>
        </section>
    );
};

export default SinglePost;
