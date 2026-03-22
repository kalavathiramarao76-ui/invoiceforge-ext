import React from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/styles.css';
import SidePanel from './SidePanel';
import { AuthWall } from '../shared/AuthWall';

createRoot(document.getElementById('root')!).render(
  <AuthWall>
    <SidePanel />
  </AuthWall>
);
