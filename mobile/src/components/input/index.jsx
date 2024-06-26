import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export const Input = (props) => {
  const [question, setQuestion] = React.useState('');

  function handleSubmit() {
    props.onSubmit(question);
    setQuestion('');
  }

  function handleTextChange(data) {
    if (data.trim()) {
      setQuestion(data.trim());
    } else {
      setQuestion('');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        style={styles.questionInput}
        placeholderTextColor='#D0D7E4'
        placeholder='Digite sua dúvida aqui...'
        onChangeText={handleTextChange}
      />
      <Pressable style={styles.sendButton} onPress={handleSubmit}>
        <AntDesign name='arrowright' size={32} color='#D0D7E4' />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#070A0E',
    flexShrink: 0,
    padding: 8,
    width: '100%',
    gap: 8,
  },

  questionInput: {
    flex: 1,
    maxHeight: 80,
    height: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#272F3E',
    fontSize: 14,
    borderRadius: 5,
    color: '#D0D7E4',
  },

  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#2E69FF',
  },
});
