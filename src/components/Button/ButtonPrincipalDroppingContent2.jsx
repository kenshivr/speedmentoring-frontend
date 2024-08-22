import React, { useState } from 'react';

function ButtonPrincipalDroppingContent2({ onClick1, show1, text1, onClick2, text2, text3 }) {
  const [pressed, setPressed] = useState(false);

  const handleMouseDown = (e) => {
    setPressed(true);
    e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)';
    e.currentTarget.style.transform = 'scale(0.98)';
  };

  const handleMouseUp = (e) => {
    setPressed(false);
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleMouseLeave = (e) => {
    if (pressed) {
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1)';
    }
  };

  return (
    <div className="container d-flex justify-content-center flex-column flex-md-row align-items-center gap-3">
      {show1 && (
        <button
          type="button"
          className="btn w-100"
          style={{
            backgroundColor: '#EFCA45',
            color: '#4F3F05',
            borderRadius: '20px',
            border: 'none',
            maxWidth:'200px',
            transition: 'box-shadow 0.2s, transform 0.2s',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)';
          }}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={onClick1}
        >
          {text1}
        </button>
      )}
      <button
        type="button"
        className="btn w-100"
        style={{
          backgroundColor: '#EFCA45',
          color: '#4F3F05',
          borderRadius: '20px',
          border: 'none',
          maxWidth:'200px',
          transition: 'box-shadow 0.2s, transform 0.2s',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)';
        }}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick2}
      >
        {show1 ? text2 : text3}
      </button>
    </div>
  );
}

export default ButtonPrincipalDroppingContent2;
