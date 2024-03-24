import PropTypes from 'prop-types';
import * as React from 'react';
import { FaChevronRight } from 'react-icons/fa';
import './styles.css';

export function Input({ onSubmit }) {
  const [question, setQuestion] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(question);
  }

  function handleInput(event) {
    event.target.style.height = '50px'; // reset the height
    event.target.style.height = `${event.target.scrollHeight}px`; // set it to scrollHeight
  }

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <textarea
        className='question-input'
        name='question'
        placeholder='Digite sua duvida aqui...'
        onChange={(event) => setQuestion(event.target.value)}
        onInput={handleInput}
      />
      <button className='send-button' type='submit'>
        <FaChevronRight />
      </button>
    </form>
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
