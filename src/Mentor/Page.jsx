import React from 'react';
import Layout from '../components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="mentor">
      <div>
        Página del mentor. Agenda.
      </div>
    </Layout>
  );
}