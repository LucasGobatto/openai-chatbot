import React from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { BodyPrimary } from '../typography';

export const Historic = (props) => {
  const scrollViewRef = React.useRef();

  const historyGroupedByDate = props.historic.reduce((acc, { question, response, date }) => {
    const isTodayDate = new Date(date).toDateString() === new Date().toDateString();
    const dateWithoutTime = date.split('T')[0].split('-').reverse().join('/');

    const dateString = isTodayDate ? 'Hoje' : dateWithoutTime;

    if (!acc[dateString]) {
      acc[dateString] = [];
    }

    acc[dateString].push({ question, response });
    return acc;
  }, {});

  return (
    <FlatList
      data={Object.keys(historyGroupedByDate)}
      renderItem={({ item: date }) => (
        <View style={styles.historicContainer} key={date}>
          <BodyPrimary style={styles.dateText}>{date}</BodyPrimary>

          {historyGroupedByDate[date].map(({ question, response }, index) => (
            <View style={{ flex: 1, gap: 8 }} key={index}>
              <View style={{ ...styles.messageContainer, alignSelf: 'flex-end' }}>
                <BodyPrimary style={styles.message}>{question}</BodyPrimary>
                <View style={styles.profile}>
                  <BodyPrimary>U</BodyPrimary>
                </View>
              </View>

              <View style={styles.messageContainer}>
                <View style={styles.profile}>
                  <BodyPrimary>AI</BodyPrimary>
                </View>
                <BodyPrimary style={styles.message}>{response}</BodyPrimary>
              </View>
            </View>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  historicContainer: {
    gap: 16,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },

  dateText: {
    marginHorizontal: 'auto',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#272F3E',
    borderRadius: 4,
    overflow: 'hidden',
  },

  messageContainer: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '85%',
    alignItems: 'center',
  },

  message: {
    flex: 1,
    flexWrap: 'wrap',
  },
  profile: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    aspectRatio: 1,
    padding: 8,
    backgroundColor: '#272F3E',
    borderRadius: 24,
  },
});
