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
  const [details, setDetails] = React.useState();

  return (
    <JobVacancyDescriptionContext.Provider value={{ details, setDetails }}>
      {props.children}
    </JobVacancyDescriptionContext.Provider>
  );
};

JobVacancyDescriptionProvider.propTypes = {
  children: PropTypes.any.isRequired,
};
