import Button from '../Link/LinkSecundaryColor.jsx';

function CardMenu({ title, text, button_text, button_link }) {
  return (
    <div className="card" style={{ backgroundColor: '#EFCA45', color: '#4F3F05' }}>
        <div className="card-body">
          <h5 className="card-title">{ title }</h5>
          <p className="card-text">{ text }</p>
          <div className='d-grid'>
              <Button text={button_text} link={button_link} />
          </div>
        </div>
    </div>
  );
}

export default CardMenu;

