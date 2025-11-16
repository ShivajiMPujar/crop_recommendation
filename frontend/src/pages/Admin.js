import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../components/admin/Dashboard';

const Admin = () => {
  const { user } = useAuth();

  return (
    <Dashboard />
  );
};

export default Admin;