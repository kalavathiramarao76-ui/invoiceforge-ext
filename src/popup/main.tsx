import React from 'react';
import { createRoot } from 'react-dom/client';
import '../shared/styles.css';
import Popup from './Popup';
import { AuthWall } from '../shared/AuthWall';

createRoot(document.getElementById('root')!).render(
  <AuthWall>
    <Popup />
  </AuthWall>
);
