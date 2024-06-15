import { View } from 'react-native';
import { H2 } from '../typography';
import { StatsContent, Table } from './shared-components';

export const DailyStats = ({ overallConsultedDays }) => {
  const maxConsults = overallConsultedDays.slice(0, overallConsultedDays.length / 2);
  const minConsults = overallConsultedDays.slice(overallConsultedDays.length / 2);

  return (
    <StatsContent>
      <H2>Dias com Maior Consumo de Tokens</H2>
      <Table
        headers={['Usuário', 'Total de Tokens', 'Data da Consulta']}
        rows={maxConsults.map((data) => [
          data.userIdentifier,
          data.totalTokens,
          new Date(data.createdAt).toLocaleDateString('pt-br'),
        ])}
      />

      <View style={{ height: '20px' }}></View>

      <H2>Dias com Menor Consumo de Tokens</H2>
      <Table
        headers={['Usuário', 'Total de Tokens', 'Data da Consulta']}
        rows={minConsults.map((data) => [
          data.userIdentifier,
          data.totalTokens,
          new Date(data.createdAt).toLocaleDateString('pt-br'),
        ])}
      />
    </StatsContent>
  );
};
