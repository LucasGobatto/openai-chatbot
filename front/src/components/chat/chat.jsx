import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

export function Chat({ historic }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [historic]);

  return (
    <div ref={containerRef} className='historic-container'>
      <button className='back'>{'< voltar'}</button>
      {(historic ?? []).map(({ question, response }, index) => (
        <div className='message-container' key={index}>
          <div className='text-container align-right'>
            <pre className='base-chat user-question'>{question}</pre>
            <div className='profile'>U</div>
          </div>
          <div className='text-container align-left'>
            <div className='profile'>AI</div>
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
