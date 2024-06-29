import React from 'react';
import Layout from '../Components/Layout';

export default function Page() {
  return (
    <Layout navbar={true} userType="student">
      <div>
        Página de estudiante. Agenda.
      </div>
    </Layout>
  );
}