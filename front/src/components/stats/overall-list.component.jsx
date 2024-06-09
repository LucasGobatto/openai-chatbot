import PropTypes from 'prop-types';
import './styles.css';

export function OverallStats(props) {
  return (
    <div className='card'>
      <h2>Estatísticas Gerais</h2>
      <div className='card-container'>
        <div className='card-content'>
          <h3>Total de Tokens Gasto</h3>
          <ul>
            <li>Max: {props.maxTotalTokens.toFixed(1)}</li>
            <li>Min: {props.minTotalTokens.toFixed(1)}</li>
            <li>Média: {props.avgTotalTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para a Resposta</h3>
          <ul>
            <li>Max: {props.maxResponseTokens.toFixed(1)}</li>
            <li>Min: {props.minResponseTokens.toFixed(1)}</li>
            <li>Média: {props.avgResponseTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para o Prompt</h3>
          <ul>
            <li>Max: {props.maxPromptTokens.toFixed(1)}</li>
            <li>Min: {props.minPromptTokens.toFixed(1)}</li>
            <li>Média: {props.avgPromptTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tempo Gasto em Milisegundos</h3>
          <ul>
            <li>Max: {props.maxTimeSpent.toFixed(1)}</li>
            <li>Min: {props.minTimeSpent.toFixed(1)}</li>
            <li>Média: {props.avgTimeSpent.toFixed(1)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

OverallStats.propTypes = {
  maxTotalTokens: PropTypes.number.isRequired,
  minTotalTokens: PropTypes.number.isRequired,
  avgTotalTokens: PropTypes.number.isRequired,
  maxTimeSpent: PropTypes.number.isRequired,
  minTimeSpent: PropTypes.number.isRequired,
  avgTimeSpent: PropTypes.number.isRequired,
  maxResponseTokens: PropTypes.number.isRequired,
  minResponseTokens: PropTypes.number.isRequired,
  avgResponseTokens: PropTypes.number.isRequired,
  maxPromptTokens: PropTypes.number.isRequired,
  minPromptTokens: PropTypes.number.isRequired,
  avgPromptTokens: PropTypes.number.isRequired,
};
