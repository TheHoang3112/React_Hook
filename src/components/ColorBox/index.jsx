import React, { useState } from 'react';
import '../ColorBox/ColorBox.scss';

function ColorBox() {
    const [color, setColor] = useState(() => {
        const initColor = localStorage.getItem('remmember_color') || 'red';
        return initColor;
    });

    const randomColor = () => {
        const color = ['red', 'yellow', 'blue', 'black', 'deeppink'];
        const indexColor = Math.floor(Math.random() * 5);
        return color[indexColor];
    }
    const handleColor = () => {
        const newColor = randomColor();
        setColor(newColor);
        localStorage.setItem('remmember_color', newColor);
    }

    return (
        <div className='color-box'
            style={{ backgroundColor: color }}
            onClick={handleColor}
        >
            Color Box
        </div>
    );
}

export default ColorBox;