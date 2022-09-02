import React from 'react';
import { useDispatch } from 'react-redux';
import { reactPost } from './postsSlice';

const emoji = [
    {
        name: 'good',
        emoji: '👍🏼',
    },
    {
        name: 'bad',
        emoji: '👎🏻',
    },
];

const Reaction = ({ post }) => {
    const dispatch = useDispatch();

    const handleReact = (name, post) => {
        dispatch(reactPost({ name, post }));
    };

    return (
        <div style={{ margin: '20px 0px' }}>
            {emoji.map((x) => (
                <span
                    key={x.name}
                    style={{
                        margin: '0px 8px',
                        padding: '10px',
                        backgroundColor: '#cccccc5a',
                        borderRadius: '10px',
                        height: '100px',
                        width: '100px',
                        cursor: 'pointer',
                    }}
                    onClick={() => handleReact(x.name, post)}
                >
                    {x.emoji} {post.reactions[x.name]}
                </span>
            ))}
        </div>
    );
};

export default Reaction;
