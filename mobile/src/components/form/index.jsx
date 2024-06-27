import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Pressable,
  StyleSheet,
  View,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import { FormField } from '../form-field';
import { useJobVacancyDescription } from '../../hooks';
import { BodyPrimary } from '../typography';

export const Form = (props) => {
  const { details, setDetails } = useJobVacancyDescription();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    const role = data.role ?? details.role;
    const description = data.description ?? details.description;
    const values = data.values ?? details.values;

    if (role && description) {
      setDetails({ role, description, values });
      props.onSubmit();
    } else {
      alert('Preencha todos os campos obrigatórios.');
    }
  };

  React.useEffect(() => {
    register('role');
    register('description');
    register('values');
  }, [register]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <FormField
            initialValue={details.role}
            name='role'
            label='Cargo'
            required
            placeholder='Digite o cargo da vaga.'
            setValue={setValue}
          />
          <FormField
            initialValue={details.description}
            name='description'
            label='Descrição da vaga'
            required
            placeholder='Digite a descrição para a vaga.'
            multiline
            setValue={setValue}
          />
          <FormField
            initialValue={details.values}
            name='values'
            label='Valores da empresa'
            placeholder='Digite uma breve descrição dos valores da empresa.'
            multiline
            setValue={setValue}
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
            <BodyPrimary>Iniciar</BodyPrimary>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 16,
    marginHorizontal: 16,
    marginVertical: 'auto',
    backgroundColor: '#272F3E',
    padding: 16,
    borderRadius: '5px',
    alignItems: 'center',
  },
  submitButton: {
    margin: 'auto',
    backgroundColor: '#2E69FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: '5px',
  },
});
