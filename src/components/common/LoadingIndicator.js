import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export const LoadingIndicator = () => (
  <div>
    <div className="text-center">
      <strong>Пожалуйста, подождите. Идет загрузка.</strong>
    </div>
    <ProgressBar bsStyle="info" active now={100} />
  </div>
);

export default LoadingIndicator;
