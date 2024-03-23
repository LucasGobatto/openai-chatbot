import { FormField } from '../form-field';
import { SubmitButton } from '../submit-button';
import './styles.css';

export function Form() {
  return (
    <form className='home-form'>
      <FormField label="Cargo" required placeholder={"Desenvolvedor de Softwares Senior"} />
      <FormField label="Descrição da vaga" required placeholder={"Esta é uma descrição para a vaga."} />
      <FormField label="Valores da empresa" placeholder={"Esta é uma descrição dos valores da empresa."} />
      <SubmitButton />
    </form>
  )
}
