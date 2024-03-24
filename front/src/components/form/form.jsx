import { FormField } from '../form-field';
import { SubmitButton } from '../submit-button';
import './styles.css';
import { useNavigate } from 'react-router-dom';


export function Form() {
  const navigate = useNavigate()
  function handleSubmit(event){
    try {
      console.log(event)
      navigate('/chat')
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <form className='home-form' onSubmit={handleSubmit()}>
      <FormField label='Cargo' required placeholder={'Desenvolvedor de Softwares Senior'} name={'cargo'}/>
      <FormField label='Descrição da vaga' required placeholder={'Esta é uma descrição para a vaga.'} name={'descricao'} multiline />
      <FormField label='Valores da empresa' placeholder={'Esta é uma descrição dos valores da empresa.'} name={'valores'} multiline />
      <SubmitButton />
    </form>
  );
}
