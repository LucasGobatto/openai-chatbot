import PropTypes from 'prop-types';
import './styles.css';

export function TopUsers({ topFiveUsers }) {
  return (
    <div className='card'>
      <h2>Top 5 Usuários</h2>

      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Posição</th>
              <th>Usuário</th>
              <th>Total de Tempo Gasto (milisegundos)</th>
              <th>Total de Consultas</th>
            </tr>
          </thead>
          <tbody>
            {topFiveUsers.map((user, idx) => (
              <tr key={user.user}>
                <td>#{idx + 1}</td>
                <td>{user.user}</td>
                <td>{user.totalTimeSpent}</td>
                <td>{user.totalCalls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

TopUsers.propTypes = {
  topFiveUsers: PropTypes.any.isRequired,
};
