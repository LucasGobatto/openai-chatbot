import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chatbot } from './src/pages/chatbot';
import { Home } from './src/pages/home';
import { Report } from './src/pages/report';

export default function App() {
  const [currentPage, setCurrentPage] = React.useState('home');

  return (
    <>
      <View style={styles.container}>
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'reports' && <Report onNavigate={setCurrentPage} />}
        {currentPage === 'chatbot' && <Chatbot onNavigate={setCurrentPage} />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
    backgroundColor: '#181F2C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
