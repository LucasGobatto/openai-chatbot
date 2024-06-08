import React from 'react';
import { MonthlyStats, OverallStats, TopUsers, DailyStats } from '../../components/stats';
import { useReportStatsQuery } from '../../data/use-report-stats-query';
import './styles.css';

export function ReportsPage() {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());

  const { data, loading, error, refetch } = useReportStatsQuery({ body: { month, year } });

  const handleMonthChange = (e) => {
    const selectedMonth = months.findIndex((elem) => elem === e.target.value);

    setMonth(selectedMonth);
  };

  const handleYearChange = (e) => {
    setYear(+e.target.value);
  };

  React.useEffect(() => {
    refetch();
  }, [month, year, refetch]);

  return (
    <div className='container'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>
          Estatísticas de {months[month]}/{year}
        </h1>
        <div>
          <select onChange={handleMonthChange} defaultValue={months[month]}>
            {months.map((month) => (
              <option key={month} id={month}>
                {month}
              </option>
            ))}
          </select>
          <select onChange={handleYearChange} defaultValue={year}>
            {[...new Array(+new Date().getFullYear() - 1999)].map((_, year) => (
              <option key={year} id={year + 2000}>
                {year + 2000}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ height: '24px' }}></div>

      {loading && !data && !error && <h1>Carregando...</h1>}
      {!!error && <h1>{error}</h1>}
      {data && (
        <>
          <OverallStats {...data.overall} />
          <MonthlyStats monthStats={data.groupedByMonth[0]} />
          <TopUsers topFiveUsers={data.topFiveUsers['2024-05']} />
          <DailyStats overallConsultedDays={data.overallConsultedDays} />
        </>
      )}
    </div>
  );
}

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
