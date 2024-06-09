import PropTypes from 'prop-types';
import './styles.css';

export function DailyStats({ overallConsultedDays }) {
  const maxConsults = overallConsultedDays.slice(0, overallConsultedDays.length / 2);
  const minConsults = overallConsultedDays.slice(overallConsultedDays.length / 2);

  return (
    <div className='card'>
      <h2>Dias com Maior Consumo de Tokens</h2>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Total de Tokens</th>
              <th>Data da consulta</th>
            </tr>
          </thead>
          <tbody>
            {maxConsults.map((user) => (
              <tr key={user.user + 'max'}>
                <td>{user.userIdentifier}</td>
                <td>{user.totalTokens}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('pt-br')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ height: '20px' }}></div>

      <h2>Dias com Menor Consumo de Tokens</h2>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Total de Tokens</th>
              <th>Data da consulta</th>
            </tr>
          </thead>
          <tbody>
            {minConsults.map((user) => (
              <tr key={user.user + 'min'}>
                <td>{user.userIdentifier}</td>
                <td>{user.totalTokens}</td>
                <td>{new Date(user.createdAt).toLocaleDateString('pt-br')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DailyStats.propTypes = {
  overallConsultedDays: PropTypes.any.isRequired,
};
