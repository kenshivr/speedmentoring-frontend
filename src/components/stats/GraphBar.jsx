import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function GraphBar({ title, keys, title_label, values }) {

  if (!keys || !values || keys.length === 0 || values.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <div className='p-4 w-100' style={{ backgroundColor: '#fff', borderRadius: '10px',  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
        <h5>{title}</h5>
        <Bar
          data={{
            labels: keys,
            datasets: [{
              label: title_label,
              data: values,
              backgroundColor:  ['#36A2EB', '#FF6384', '#FFCE56', '#4CAF50', '#8E44AD'],
            }]
          }}
        />
    </div>
  );
}

export default GraphBar;

