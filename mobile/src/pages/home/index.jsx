import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { BodyPrimary, Hero } from '../../components/typography';

export function Home(props) {
  return (
    <>
      <Hero>Job Interview Assistance</Hero>
      <Pressable style={styles.button} onPress={() => props.onNavigate('chatbot')}>
        <BodyPrimary>ChatBot</BodyPrimary>
      </Pressable>
      <Pressable style={styles.button} onPress={() => props.onNavigate('reports')}>
        <BodyPrimary>Reports</BodyPrimary>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2E69FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: '5px',
  },
});
