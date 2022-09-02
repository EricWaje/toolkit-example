import { formatDistanceToNow, parseISO } from 'date-fns';
import React from 'react';

const TimeAgo = ({ timestamp }) => {
    let timeAgo = '';
    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }
    return (
        <span
            style={{
                fontSize: '14px',
                fontStyle: 'italic',
                color: '#2f2f2f',
                margin: '0px 5px',
                marginBottom: '10px',
            }}
        >
            {timeAgo}
        </span>
    );
};

export default TimeAgo;
