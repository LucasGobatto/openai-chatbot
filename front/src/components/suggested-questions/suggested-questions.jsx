import { PropTypes } from 'prop-types';
import './styles.css';

export function SuggestionedQuestions(props) {
  return (
    <div className='suggested-questions-wrapper'>
      <ul>
        {(props.templates ?? []).map(({ question, onClick }, index) => (
          <li key={index} onClick={onClick}>
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
}
SuggestionedQuestions.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ),
};
