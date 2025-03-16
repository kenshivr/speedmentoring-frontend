import { Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function GraphPie({ title, keys, values }) {

  if (!keys || !values || keys.length === 0 || values.length === 0) {
    return <p>No hay datos para mostrar</p>;
  }

  return (
    <div className='p-4 w-100' style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)' }}>
      <h5>{title}</h5>
        <Pie
          data={{
            labels: keys,
            datasets: [{
              data:values,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#8E44AD'],
            }]
          }}
        />
    </div>
  );
}

export default GraphPie;

