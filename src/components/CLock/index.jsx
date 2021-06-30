import React, { useEffect, useState } from 'react';

const formatDate = (date) => {
    if (!date) return '';

    const h = `0${date.getHours()}`.slice(-2)
    const m = `0${date.getMinutes()}`.slice(-2)
    const s = `0${date.getSeconds()}`.slice(-2)

    return `${h}:${m}:${s}`
}

function Clock() {
    const [timeString, setTimeString] = useState('');
    useEffect(() => {
        const clockInterval = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);

            setTimeString(newTimeString);
        }, 1000);

        return () => {
            console.log('Clock clean');
            clearInterval(clockInterval);
        }
    }, []);
    return (
        <p style={{ fontSize: '42px' }}>{timeString}</p>
    );
}

export default Clock;