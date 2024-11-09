import React from 'react';

function SearchBarNoButton({ legendText, searchPlaceholder, searchValue, onSearchChange }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="row g-0 text-center mb-3">
      <div className="row g-0 text-center mb-3 p-3" style={{ backgroundColor: 'white', borderRadius: '25px' }}>
        <div className='col-sm-4 px-2'>
          <legend className='mt-1'>{legendText}</legend>
        </div>
        <div className="col-sm-8 px-2 mt-2 pb-1">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder={searchPlaceholder}
              aria-label="Search"
              style={{
                backgroundColor: "#EFCA45",
                borderColor: "#EFCA45",
                color: "black",
                borderRadius: "15px",
                boxShadow: "none", // Quitar sombra predeterminada
              }}
              value={searchValue}
              maxLength={100}
              onChange={onSearchChange}
              onFocus={(e) => {
                e.target.style.borderColor = '#FFD700'; // Cambiar color del borde
                e.target.style.boxShadow = '0 0 0 0.2rem rgba(79, 63, 5, 0.5)'; // Cambiar sombra al enfocar
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#EFCA45'; // Restaurar color del borde
                e.target.style.boxShadow = 'none'; // Quitar sombra al desenfocar
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchBarNoButton;
