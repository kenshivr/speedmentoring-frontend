import React from 'react';
import Layout from '../../components/Layout/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="admin">
      <div>
        Página del admin. Estadísticas.
      </div>
    </Layout>
  );
}