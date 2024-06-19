import { H2 } from '../typography';
import { Card, CardContainer, StatsContent } from './shared-components';

export const MonthlyStats = ({ monthStats }) => {
  return (
    <StatsContent>
      <H2>Estatísticas do Mês</H2>
      <CardContainer>
        <Card
          title='Total de Tokens Gasto'
          max={(monthStats.maxTotalTokens ?? 0).toFixed(1)}
          min={(monthStats.minTotalTokens ?? 0).toFixed(1)}
          avg={(monthStats.avgTotalTokens ?? 0).toFixed(1)}
        />
        <Card
          title='Tokens para a Resposta'
          max={(monthStats.maxResponseTokens ?? 0).toFixed(1)}
          min={(monthStats.minResponseTokens ?? 0).toFixed(1)}
          avg={(monthStats.avgResponseTokens ?? 0).toFixed(1)}
        />
        <Card
          title='Tokens para o Prompt'
          max={(monthStats.maxPromptTokens ?? 0).toFixed(1)}
          min={(monthStats.minPromptTokens ?? 0).toFixed(1)}
          avg={(monthStats.avgPromptTokens ?? 0).toFixed(1)}
        />
        <Card
          title='Tempo Gasto em Milisegundos'
          max={(monthStats.maxTimeSpent ?? 0).toFixed(1)}
          min={(monthStats.minTimeSpent ?? 0).toFixed(1)}
          avg={(monthStats.avgTimeSpent ?? 0).toFixed(1)}
        />
      </CardContainer>
    </StatsContent>
  );
};
