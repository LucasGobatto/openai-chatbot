import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useJobVacancyDescription } from '../../hooks';

export function Chat({ historic }) {
  const { setDetails } = useJobVacancyDescription();
  const containerRef = React.useRef(null);

  const historyGroupedByDate = historic.reduce((acc, { question, response, date }) => {
    const dateWithoutTime = date.split('T')[0].split('-').reverse().join('/');
    if (!acc[dateWithoutTime]) {
      acc[dateWithoutTime] = [];
    }

    acc[dateWithoutTime].push({ question, response });
    return acc;
  }, {});

  React.useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [historic]);

  return (
    <div ref={containerRef} className='historic-container'>
      <Link className='back' to='/' onClick={() => setDetails(null)}>
        <FaChevronLeft />
        <p>voltar</p>
      </Link>
      {Object.entries(historyGroupedByDate).map(([date, contentList]) => (
        <div className='date-container' key={date}>
          <p>{date}</p>
          {contentList.map(({ question, response }, index) => (
            <div className='message-container' key={index}>
              <div className='text-container align-right'>
                <pre className='base-chat user-question'>{question}</pre>
                <div className='profile'>
                  <p>U</p>
                </div>
              </div>
              <div className='text-container align-left'>
                <div className='profile'>
                  <p>AI</p>
                </div>
                <pre className='base-chat ai-response'>{response}</pre>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

Chat.propTypes = {
  historic: PropTypes.array.isRequired,
};
