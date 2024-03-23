import { Form } from '../../components/form';
import "./styles.css";

export function HomePage() {
  return (
    <div className='home-content'>
      <h1 className='hero'>Job Interview Assistance</h1>
      <Form />
    </div>
  );
}