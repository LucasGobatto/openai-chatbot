import { PropTypes } from 'prop-types';
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
  const [details, setDetails] = React.useState(get());

  const updateDetails = React.useCallback(
    (newDetails) => {
      set(newDetails);
      setDetails(newDetails);
    },
    [set, setDetails],
  );

  return (
    <JobVacancyDescriptionContext.Provider value={{ details, setDetails: updateDetails }}>
      {props.children}
    </JobVacancyDescriptionContext.Provider>
  );
};

JobVacancyDescriptionProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
