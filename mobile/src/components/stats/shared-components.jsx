import { StyleSheet, View, Text } from 'react-native';
import { H3, BodyPrimary } from '../typography';

export const StatsContent = ({ children }) => (
  <View
    style={{
      gap: 8,
      backgroundColor: '#D0D7E4',
      borderRadius: 8,
      marginVertical: 8,
      padding: 8,
    }}
  >
    {children}
  </View>
);

export const CardContainer = ({ children }) => (
  <View
    style={{
      gap: 16,
      justifyContent: 'center',
    }}
  >
    {children}
  </View>
);

export const Card = ({ title, max, min, avg }) => {
  return (
    <View style={cardStyles.card}>
      <H3>{title}</H3>
      <View style={cardStyles.cardTextContainer}>
        <BodyPrimary>Max: {max}</BodyPrimary>
        <BodyPrimary>Min: {min}</BodyPrimary>
        <BodyPrimary>Média: {avg}</BodyPrimary>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    minWidth: 'fit-content',
    flexShrink: 0,
    backgroundColor: '#272F3E',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardTextContainer: {
    alignItems: 'center',
  },
});

export const Table = ({ headers, rows = [] }) => {
  return (
    <View style={tableStyles.table}>
      <View style={tableStyles.header}>
        {headers.map((header) => (
          <Text style={tableStyles.headerCell} key={header}>
            {header}
          </Text>
        ))}
      </View>
      {rows.map((row, rdx) => (
        <View style={tableStyles.body} key={rdx}>
          {row.map((data, ddx) => (
            <Text style={tableStyles.bodyCell} key={'row' + rdx + ddx}>
              {data}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const tableStyles = StyleSheet.create({
  table: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#272F3E',
  },

  header: {
    gap: 4,
    flexDirection: 'row',
    backgroundColor: '#272F3E',
    padding: 4,
    alignItems: 'center',
  },

  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#D0D7E4',
    textWrap: 'wrap',
    textAlign: 'center',
  },

  body: {
    gap: 4,
    borderTopColor: '#FEFEFE',
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 4,
    alignItems: 'center',
  },

  bodyCell: {
    flex: 1,
    fontSize: 14,
    color: '#272F3E',
    textWrap: 'wrap',
    textAlign: 'center',
  },
});
