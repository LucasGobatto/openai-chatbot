import PropTypes from 'prop-types';
import './styles.css';

export function MonthlyStats({ monthStats }) {
  return (
    <div className='card'>
      <h2>Estatísticas do Mês</h2>

      <div className='card-container'>
        <div className='card-content'>
          <h3>Total de Tokens Gasto</h3>
          <ul>
            <li>Max: {monthStats.maxTotalTokens.toFixed(1)}</li>
            <li>Min: {monthStats.minTotalTokens.toFixed(1)}</li>
            <li>Média: {monthStats.avgTotalTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para a Resposta</h3>
          <ul>
            <li>Max: {monthStats.maxResponseTokens.toFixed(1)}</li>
            <li>Min: {monthStats.minResponseTokens.toFixed(1)}</li>
            <li>Média: {monthStats.avgResponseTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para o Prompt</h3>
          <ul>
            <li>Max: {monthStats.maxPromptTokens.toFixed(1)}</li>
            <li>Min: {monthStats.minPromptTokens.toFixed(1)}</li>
            <li>Média: {monthStats.avgPromptTokens.toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tempo Gasto em Milisegundos</h3>
          <ul>
            <li>Max: {monthStats.maxTimeSpent.toFixed(1)}</li>
            <li>Min: {monthStats.minTimeSpent.toFixed(1)}</li>
            <li>Média: {monthStats.avgTimeSpent.toFixed(1)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

MonthlyStats.propTypes = {
  monthStats: PropTypes.any.isRequired,
};
