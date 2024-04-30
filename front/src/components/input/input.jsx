import PropTypes from 'prop-types';
import * as React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './styles.css';

export function Input({ onSubmit }) {
  const [question, setQuestion] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(question);
    setQuestion('');
  }

  function handleInput(event) {
    event.target.style.height = '50px'; // reset the height
    event.target.style.height = `${event.target.scrollHeight}px`; // set it to scrollHeight
  }

  const handleKeyDown = (event) => {
    // Check if Command (Mac) or Ctrl (Windows/Linux) + Enter is pressed
    if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
      handleSubmit(event);
      event.target.value = '';
    }
  };

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <textarea
        className='question-input'
        name='question'
        placeholder='Digite sua duvida aqui...'
        onChange={(event) => event.target.value.trim() ? setQuestion(event.target.value.trim()) : setQuestion('')}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button className='send-button' type='submit' disabled={!question}>
        <FaChevronRight />
      </button>
    </form>
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
