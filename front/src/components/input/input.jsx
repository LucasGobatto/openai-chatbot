import * as React from 'react';
import PropTypes from 'prop-types';
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
      <button className='submit-button' type='submit'>
        {'>'}
      </button>
    </form>
  );
}

Input.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
