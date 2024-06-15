import { H2 } from '../typography';
import { StatsContent, Table } from './shared-components';

export const TopUsers = ({ topFiveUsers }) => {
  return (
    <StatsContent>
      <H2>Top 5 Usuários</H2>
      <Table
        headers={['Posição', 'Usuário', 'Total de Tempo de Gasto (ms)', 'Nº de Cosultas']}
        rows={topFiveUsers.map((user, idx) => [idx + 1, user.user, user.totalTimeSpent, user.totalCalls])}
      />
    </StatsContent>
  );
};
