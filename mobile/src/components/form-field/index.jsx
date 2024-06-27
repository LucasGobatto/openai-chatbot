import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Label } from '../typography';

export const FormField = (props) => {
  return (
    <View style={styles.container}>
      <Label>
        {props.label}
        {props.required && '*'}
      </Label>
      <TextInput
        style={{ ...styles.textInput, ...(props.multiline ? styles.multilineField : {}) }}
        defaultValue={props.initialValue}
        placeholderTextColor='#8f8f8f'
        multiline={props.multiline}
        placeholder={props.placeholder}
        onChangeText={(text) => props.setValue(props.name, text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
    width: '100%',
  },
  textInput: {
    minHeight: '50px',
    width: '100%',
    padding: 8,
    fontSize: 16,
    borderWidth: '1px',
    borderColor: '#D0D7E4',
    borderRadius: '5px',
    backgroundColor: 'transparent',
    color: '#D0D7E4',
  },
  multilineField: {
    height: '80px',
  },
});
