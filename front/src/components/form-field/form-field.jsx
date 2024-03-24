import PropTypes from 'prop-types';
import './styles.css';

export function FormField(props) {
  return (
    <div className='form-content'>
      <label className='form-label'>{`${props.label}${props.required ? '*' : ''}`}</label>
      {props.multiline ? (
        <textarea className='form-input multiline' placeholder={props.placeholder} min={6} required={props.required} name={props.name} />
      ) : (
        <input className='form-input' placeholder={props.placeholder} min={6} required={props.required} name={props.name} />
      )}
    </div>
  );
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired
};
