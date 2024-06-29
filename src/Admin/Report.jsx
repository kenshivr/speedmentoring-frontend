import React from 'react';
import Layout from '../Components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="admin">
      <div>
        Página del admin. Reporte.
      </div>
    </Layout>
  );
}