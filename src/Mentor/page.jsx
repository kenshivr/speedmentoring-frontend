import React from 'react';
import Layout from '../components/Layout/Layout';

export default function Page() {

  return (
    <Layout navbar={true} userType="mentor">
      <div className="container-sm my-1 mt-5 p-2" style={{ maxWidth: '1800px', margin: 'auto' }}>
          <div className="row justify-content-evenly">
            <div className="col-12 col-md-6 m-1 d-flex flex-column p-3" style={{ backgroundColor: 'grey', borderRadius:'20px' }}>
              <div className='mb-3' style={{ backgroundColor: 'orange' }}>
              
              </div>
            </div>
          </div>
      </div>
    </Layout>
  );
}