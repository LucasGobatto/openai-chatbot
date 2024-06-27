import React from 'react';
import { DeviceIdContext } from '../providers';

export const useDeviceId = () => {
  const context = React.useContext(DeviceIdContext);

  if (!context) {
    throw new Error('useDeviceId must be used within a DeviceIdProvider');
  }

  return context;
};
