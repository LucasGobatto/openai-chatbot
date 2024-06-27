import React from 'react';
import { useLocalStorage } from '../hooks/use-local-storage';

/**
 * interface JobVacancyDescription {
 *   role: string;
 *   description: string;
 *   values?: string;
 * }
 *
 * interface JobVacancyDescriptionContextProps {
 *   details: JobVacancyDescription;
 *   setDetails: (details: JobVacancyDescription) => void;
 * }
 */
export const JobVacancyDescriptionContext = React.createContext({
  details: {},
  setDetails: () => null,
});

export const JobVacancyDescriptionProvider = (props) => {
  const { set, get } = useLocalStorage('job-vacancy-description');
  const [details, setDetails] = React.useState({
    role: 'Desenvolvedor de Softwares Sênior',
    description: 'Procura-se desenvolvedor de softwares que tenha experiência com linguagens nativas.',
    values: null,
  });

  const updateDetails = React.useCallback(
    async (newDetails) => {
      await set(newDetails);
      setDetails(newDetails);
    },
    [setDetails],
  );

  React.useEffect(() => {
    async function getFromLocalStorage() {
      const cache = await get();

      if (cache) {
        setDetails(cache);
      }
    }

    getFromLocalStorage();
  }, []);

  return (
    <JobVacancyDescriptionContext.Provider value={{ details, setDetails: updateDetails }}>
      {props.children}
    </JobVacancyDescriptionContext.Provider>
  );
};
