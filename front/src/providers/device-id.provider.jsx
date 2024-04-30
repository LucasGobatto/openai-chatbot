import { PropTypes } from 'prop-types';
import React from 'react';
import { useLocalStorage } from '../hooks';

/**
 * interface DeviceId {
 *   role: string;
 *   description: string;
 *   values?: string;
 * }
 *
 * interface DeviceIdContextProps {
 *   details: DeviceId;
 *   setDetails: (details: DeviceId) => void;
 * }
 */
export const DeviceIdContext = React.createContext({
  deviceId: {},
  setDeviceId: () => null,
});

export const DeviceIdProvider = (props) => {
  const { set, get } = useLocalStorage('device-id');
  const cache = get();

  const [deviceId, setDeviceId] = React.useState(cache);

  const updateDeviceId = React.useCallback(
    (newDeviceId) => {
      set(newDeviceId);
      setDeviceId(newDeviceId);
    },
    [set, setDeviceId],
  );

  return (
    <DeviceIdContext.Provider value={{ deviceId, setDeviceId: updateDeviceId }}>
      {props.children}
    </DeviceIdContext.Provider>
  );
};

DeviceIdProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
