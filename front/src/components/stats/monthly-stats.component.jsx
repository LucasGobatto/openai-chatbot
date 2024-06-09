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
            <li>Max: {(monthStats.maxTotalTokens ?? 0).toFixed(1)}</li>
            <li>Min: {(monthStats.minTotalTokens ?? 0).toFixed(1)}</li>
            <li>Média: {(monthStats.avgTotalTokens ?? 0).toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para a Resposta</h3>
          <ul>
            <li>Max: {(monthStats.maxResponseTokens ?? 0).toFixed(1)}</li>
            <li>Min: {(monthStats.minResponseTokens ?? 0).toFixed(1)}</li>
            <li>Média: {(monthStats.avgResponseTokens ?? 0).toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tokens para o Prompt</h3>
          <ul>
            <li>Max: {(monthStats.maxPromptTokens ?? 0).toFixed(1)}</li>
            <li>Min: {(monthStats.minPromptTokens ?? 0).toFixed(1)}</li>
            <li>Média: {(monthStats.avgPromptTokens ?? 0).toFixed(1)}</li>
          </ul>
        </div>

        <div className='card-content'>
          <h3>Tempo Gasto em Milisegundos</h3>
          <ul>
            <li>Max: {(monthStats.maxTimeSpent ?? 0).toFixed(1)}</li>
            <li>Min: {(monthStats.minTimeSpent ?? 0).toFixed(1)}</li>
            <li>Média: {(monthStats.avgTimeSpent ?? 0).toFixed(1)}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

MonthlyStats.propTypes = {
  monthStats: PropTypes.any.isRequired,
};
