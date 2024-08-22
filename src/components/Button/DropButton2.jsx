import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/*
Botón para mostrar 2 opciones
*/

function DropButton2({ text1, link1, dropOnClick1, text2, dropOnClick2 }) {
    const [pressed, setPressed] = useState(false);
    const [linkPressed, setLinkPressed] = useState(false);
    const [btnPressed, setBtnPressed] = useState(false);

    // Manejadores de eventos para el botón desplegable principal
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

    // Manejadores de eventos para el enlace
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

    // Manejadores de eventos para el botón adicional
    const handleBtnMouseDown = (e) => {
        setBtnPressed(true);
        e.currentTarget.style.backgroundColor = '#EFEFEF';
    };

    const handleBtnMouseUp = (e) => {
        setBtnPressed(false);
        e.currentTarget.style.backgroundColor = 'white';
    };

    const handleBtnMouseLeave = (e) => {
        if (btnPressed) {
            e.currentTarget.style.backgroundColor = 'white';
            setBtnPressed(false);
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
                            backgroundColor: btnPressed ? '#EFEFEF' : 'white',
                            color: '#4F3F05',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseDown={handleBtnMouseDown}
                        onMouseUp={handleBtnMouseUp}
                        onMouseLeave={handleBtnMouseLeave}
                    >
                        {text2}
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default DropButton2;
