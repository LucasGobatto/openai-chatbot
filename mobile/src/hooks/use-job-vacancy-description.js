import React from 'react';
import { JobVacancyDescriptionContext } from '../providers';

export const useJobVacancyDescription = () => {
  const context = React.useContext(JobVacancyDescriptionContext);

  if (!context) {
    throw new Error('useJobVacancyDescription must be used within a JobVacancyDescriptionProvider');
  }

  return context;
};
