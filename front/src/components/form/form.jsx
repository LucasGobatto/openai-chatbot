import { useNavigate } from 'react-router-dom';
import { FormField } from '../form-field';
import { SubmitButton } from '../submit-button';
import './styles.css';

export function Form() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const cargo = event.target.elements.cargo.value.trim();
    const descricao = event.target.elements.descricao.value.trim();
    const valores = event.target.elements.valores.value.trim();

    // TODO - salvar numa variavel global para ser reutilizada na pagina do chat
    console.log({ cargo, descricao, valores });

    if (cargo && descricao) {
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
