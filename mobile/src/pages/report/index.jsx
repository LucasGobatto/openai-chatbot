import React, { Fragment } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from '../../components/safe-area-view';
import { Selector } from '../../components/selector';
import { MonthlyStats, OverallStats, TopUsers, DailyStats } from '../../components/stats';
import { H1, Label } from '../../components/typography';
import { useReportStatsQuery } from '../../data/use-report-stats-query';

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const years = [...new Array(+new Date().getFullYear() - 2022)].map((_, year) => year + 2023);

export const Report = (props) => {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());

  const { data, loading, error, refetch } = useReportStatsQuery({ body: { month: month + 1, year } });

  const handleMonthChange = (month) => {
    const selectedMonth = months.findIndex((elem) => elem === month);

    setMonth(selectedMonth);
  };

  const handleYearChange = (year) => {
    setYear(+year);
  };

  React.useEffect(() => {
    refetch();
  }, [month, year, refetch]);

  return (
    <SafeAreaView title='Relatório' onBack={() => props.onNavigate('home')}>
      <View style={{ padding: 8, gap: 8 }}>
        <View style={{ gap: '4px' }}>
          <Label>Mês</Label>
          <Selector
            placeholder='Selecione um mês'
            options={months}
            defaultValue={months[month]}
            onValueChange={handleMonthChange}
          />
        </View>
        <View style={{ gap: '4px' }}>
          <Label>Ano</Label>
          <Selector
            placeholder='Selecione um ano'
            options={years}
            defaultValue={year}
            onValueChange={handleYearChange}
          />
        </View>
        {loading && <H1>Carregando...</H1>}
        {!!error && <H1>Ops... Ocorreu um erro. Tente novamente mais tarde.</H1>}
        {!error && !loading && !!data && data.overall && (
          <Fragment>
            <OverallStats {...data.overall} />
            <MonthlyStats monthStats={data.groupedByMonth} />
            <TopUsers topFiveUsers={data.topFiveUsers} />
            <DailyStats overallConsultedDays={data.overallConsultedDays} />
          </Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};
