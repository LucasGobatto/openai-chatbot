import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function Chat({ historic }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [historic]);

  return (
    <div ref={containerRef} className='historic-container'>
      <Link className='back' to='/'>
        <FaChevronLeft />
        <p>voltar</p>
      </Link>
      {(historic ?? []).map(({ question, response }, index) => (
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
  );
}

Chat.propTypes = {
  historic: PropTypes.array.isRequired,
};
