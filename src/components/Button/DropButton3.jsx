import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*
Botón para mostrar 3 opciones
*/

function DropButton3({ text1, link1, dropOnClick1, text2, dropOnClick2, text3, dropOnClick3 }) {
    const [pressed, setPressed] = useState(false);
    const [linkPressed, setLinkPressed] = useState(false);
    const [btn2Pressed, setBtn2Pressed] = useState(false);
    const [btn3Pressed, setBtn3Pressed] = useState(false);

    const handleMouseDown = (e) => {
        setPressed(true);
        e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.transform = 'scale(0.98)';
    };

    const handleMouseUp = (e) => {
        setPressed(false);
        e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)';
        e.currentTarget.style.transform = 'scale(1)';
    };

    const handleMouseLeave = (e) => {
        if (pressed) {
            e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)';
            e.currentTarget.style.transform = 'scale(1)';
        }
    };

    const handleLinkMouseDown = (e) => {
        setLinkPressed(true);
        e.currentTarget.style.backgroundColor = '#EFEFEF';
    };

    const handleLinkMouseUp = (e) => {
        setLinkPressed(false);
        e.currentTarget.style.backgroundColor = 'white';
    };

    const handleLinkMouseLeave = (e) => {
        if (linkPressed) {
            e.currentTarget.style.backgroundColor = 'white';
            setLinkPressed(false);
        }
    };

    const handleBtn2MouseDown = (e) => {
        setBtn2Pressed(true);
        e.currentTarget.style.backgroundColor = '#EFEFEF';
    };

    const handleBtn2MouseUp = (e) => {
        setBtn2Pressed(false);
        e.currentTarget.style.backgroundColor = 'white';
    };

    const handleBtn2MouseLeave = (e) => {
        if (btn2Pressed) {
            e.currentTarget.style.backgroundColor = 'white';
            setBtn2Pressed(false);
        }
    };

    const handleBtn3MouseDown = (e) => {
        setBtn3Pressed(true);
        e.currentTarget.style.backgroundColor = '#EFEFEF';
    };

    const handleBtn3MouseUp = (e) => {
        setBtn3Pressed(false);
        e.currentTarget.style.backgroundColor = 'white';
    };

    const handleBtn3MouseLeave = (e) => {
        if (btn3Pressed) {
            e.currentTarget.style.backgroundColor = 'white';
            setBtn3Pressed(false);
        }
    };

    return (
        <div className="dropdown">
            <button
                className="btn btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                    color: '#4F3F05',
                    borderRadius: '20px',
                    border: 'none',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0)';
                }}
                onMouseLeave={handleMouseLeave}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                    <Link
                        className="dropdown-item"
                        to={link1}
                        onClick={dropOnClick1}
                        style={{
                            backgroundColor: linkPressed ? '#EFEFEF' : 'white',
                            color: '#4F3F05',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseDown={handleLinkMouseDown}
                        onMouseUp={handleLinkMouseUp}
                        onMouseLeave={handleLinkMouseLeave}
                    >
                        {text1}
                    </Link>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={dropOnClick2}
                        style={{
                            backgroundColor: btn2Pressed ? '#EFEFEF' : 'white',
                            color: '#4F3F05',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseDown={handleBtn2MouseDown}
                        onMouseUp={handleBtn2MouseUp}
                        onMouseLeave={handleBtn2MouseLeave}
                    >
                        {text2}
                    </button>
                </li>
                <li>
                    <button
                        className="dropdown-item"
                        onClick={dropOnClick3}
                        style={{
                            backgroundColor: btn3Pressed ? '#EFEFEF' : 'white',
                            color: '#4F3F05',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseDown={handleBtn3MouseDown}
                        onMouseUp={handleBtn3MouseUp}
                        onMouseLeave={handleBtn3MouseLeave}
                    >
                        {text3}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default DropButton3;
