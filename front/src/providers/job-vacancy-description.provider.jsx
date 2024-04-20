import React from 'react';
import { PropTypes } from 'prop-types';

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
  const cache = JSONSafeParse(localStorage.getItem('job-vacancy-description'));

  const [details, setDetails] = React.useState(cache);

  const updateDetails = React.useCallback(
    (newDetails) => {
      localStorage.setItem('job-vacancy-description', JSON.stringify(newDetails));
      setDetails(newDetails);
    },
    [setDetails],
  );

  return (
    <JobVacancyDescriptionContext.Provider value={{ details, setDetails: updateDetails }}>
      {props.children}
    </JobVacancyDescriptionContext.Provider>
  );
};

function JSONSafeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

JobVacancyDescriptionProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
