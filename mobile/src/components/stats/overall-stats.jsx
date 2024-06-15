import { H2 } from '../typography';
import { Card, CardContainer, StatsContent } from './shared-components';

export function OverallStats(props) {
  return (
    <StatsContent>
      <H2>Estatísticas Gerais</H2>
      <CardContainer>
        <Card
          title='Total de Tokens Gastos'
          min={props.minTotalTokens.toFixed(1)}
          max={props.maxTotalTokens.toFixed(1)}
          avg={props.avgTotalTokens.toFixed(1)}
        />

        <Card
          title='Tokens para a Resposta'
          min={props.maxResponseTokens.toFixed(1)}
          max={props.maxResponseTokens.toFixed(1)}
          avg={props.avgResponseTokens.toFixed(1)}
        />

        <Card
          title='Tokens para o Prompt'
          min={props.maxPromptTokens.toFixed(1)}
          max={props.maxPromptTokens.toFixed(1)}
          avg={props.avgPromptTokens.toFixed(1)}
        />

        <Card
          title='Tempo Gasto em Milisegundos'
          min={props.maxTimeSpent.toFixed(1)}
          max={props.maxTimeSpent.toFixed(1)}
          avg={props.avgTimeSpent.toFixed(1)}
        />
      </CardContainer>
    </StatsContent>
  );
}
