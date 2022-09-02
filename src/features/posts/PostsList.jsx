import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//import { fetchPosts } from './postsSlice';
import Reaction from './Reaction';
import TimeAgo from './TimeAgo';
import Users from './Users';

const PostsList = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.posts);

    const orderedPost = posts
        .map((p) => p)
        .sort((a, b) => b.date.localeCompare(a.date));

    /*   useEffect(() => {
        dispatch(fetchPosts());
    }, []); */

    if (loading) {
        return 'Cargando...';
    }

    return (
        <main>
            <article>
                {orderedPost.map((post) => (
                    <div className="post" key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <div>
                            <Link className="link" to={`/post/${post.id}`}>
                                View Post
                            </Link>
                            <Users userId={post.author} />
                            <TimeAgo timestamp={post.date} />
                            <Reaction post={post} />
                        </div>
                    </div>
                ))}
            </article>
        </main>
    );
};

export default PostsList;
