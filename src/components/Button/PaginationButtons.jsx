import React, { useState } from 'react';

function PaginationButtons({ onPrevious, onNext, isPreviousDisabled, isNextDisabled }) {
  const [pressedPrev, setPressedPrev] = useState(false);
  const [pressedNext, setPressedNext] = useState(false);

  const handleMouseDownPrev = (e) => {
    e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)';
    e.currentTarget.style.transform = 'scale(0.98)';
  };

  const handleMouseUpPrev = (e) => {
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleMouseLeavePrev = (e) => {
    if (pressedPrev) {
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1)';
    } else {
      // Si no está presionado, aplicar sombra normal al alejar el cursor
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra normal
    }
  };

  const handleMouseDownNext = (e) => {
    e.currentTarget.style.boxShadow = 'inset 0px 4px 8px rgba(0, 0, 0, 0.3)';
    e.currentTarget.style.transform = 'scale(0.98)';
  };

  const handleMouseUpNext = (e) => {
    e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
    e.currentTarget.style.transform = 'scale(1)';
  };

  const handleMouseLeaveNext = (e) => {
    if (pressedNext) {
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.transform = 'scale(1)';
    } else {
      // Si no está presionado, aplicar sombra normal al alejar el cursor
      e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.2)'; // Sombra normal
    }
  };

  return (
    <div className="col d-flex align-items-center justify-content-center mt-4 pt-2">
      <div className="d-flex justify-content-between">
        <div className='row px-4'>
          <button
            className="btn"
            style={{
              backgroundColor: '#EFCA45',
              color: '#4F3F05',
              borderRadius: '20px',
              border: 'none',
              transition: 'box-shadow 0.2s, transform 0.2s',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={handleMouseLeavePrev}
            onMouseDown={handleMouseDownPrev}
            onMouseUp={handleMouseUpPrev}
            onClick={onPrevious}
            disabled={isPreviousDisabled}
          >
            Anterior
          </button>
        </div>
        <div className='row px-4'>
          <button
            className="btn"
            style={{
              backgroundColor: '#EFCA45',
              color: '#4F3F05',
              borderRadius: '20px',
              border: 'none',
              transition: 'box-shadow 0.2s, transform 0.2s',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.5)';
            }}
            onMouseLeave={handleMouseLeaveNext}
            onMouseDown={handleMouseDownNext}
            onMouseUp={handleMouseUpNext}
            onClick={onNext}
            disabled={isNextDisabled}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginationButtons;
