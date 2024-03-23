import PropTypes from 'prop-types';
import './styled.css';

export function FormField(props) {
  return (
    <div className='form-content'>
      <label className='form-label'>{`${props.label}${props.required ? "*" : ""}`}</label>
      <input className='form-input' placeholder={props.placeholder} min={6} />
    </div>
  )
}

FormField.propTypes = {
   label: PropTypes.string.isRequired,
   placeholder: PropTypes.string,
   required: PropTypes.bool,
};