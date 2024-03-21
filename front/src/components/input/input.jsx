import * as React from 'react';
import "./styles.css";

export function Input({ onSubmit }) {
  const [question, setQuestion] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(question);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <input className="question-input" type="text" placeholder="Digite sua duvida aqui..." onChange={(event) => setQuestion(event.target.value)}/>
      <input className="submit-button" name="question" type="submit" />
    </form>
  );
}