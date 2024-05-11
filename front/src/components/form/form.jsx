import { useNavigate } from 'react-router-dom';
import { useJobVacancyDescription } from '../../hooks';
import { FormField } from '../form-field';
import { SubmitButton } from '../submit-button';
import './styles.css';

export function Form() {
  const navigate = useNavigate();
  const { setDetails } = useJobVacancyDescription();

  function handleSubmit(event) {
    event.preventDefault();

    const role = event.target.elements.cargo.value.trim();
    const description = event.target.elements.descricao.value.trim();
    const values = event.target.elements.valores.value.trim();

    if (role && description) {
      setDetails({ role, description, values });
      navigate('/chat');
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  }

  return (
    <form className='home-form' onSubmit={handleSubmit}>
      <FormField label='Cargo' required placeholder={'Desenvolvedor de Softwares Senior'} name={'cargo'} />
      <FormField
        label='Descrição da vaga'
        required
        placeholder={'Esta é uma descrição para a vaga.'}
        name={'descricao'}
        multiline
      />
      <FormField
        label='Valores da empresa'
        placeholder={'Esta é uma descrição dos valores da empresa.'}
        name={'valores'}
        multiline
      />
      <SubmitButton />
    </form>
  );
}
