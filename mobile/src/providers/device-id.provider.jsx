import React from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

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
  const [deviceId, setDeviceId] = React.useState('48708fba-6320-4548-8cdc-46039bb71bcf');

  const updateDeviceId = React.useCallback(
    async (newDeviceId) => {
      await set(newDeviceId);
      setDeviceId(newDeviceId);
    },
    [setDeviceId],
  );

  React.useEffect(() => {
    async function getFromLocalStorage() {
      const cache = await get();

      if (cache) {
        setDeviceId(cache);
      }
    }

    getFromLocalStorage();
  }, []);

  return (
    <DeviceIdContext.Provider value={{ deviceId, setDeviceId: updateDeviceId }}>
      {props.children}
    </DeviceIdContext.Provider>
  );
};
