import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, StyleSheet, View } from 'react-native';
import { FormField } from '../form-field';
import { useJobVacancyDescription } from '../../hooks';
import { BodyPrimary } from '../typography';

export const Form = (props) => {
  const { details = {}, setDetails } = useJobVacancyDescription();
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
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <FormField
          initialValue={details.role}
          name='role'
          label='Cargo'
          required
          placeholder='Desenvolvedor de Softwares Sênior'
          setValue={setValue}
        />
        <FormField
          initialValue={details.description}
          name='description'
          label='Descrição da vaga'
          required
          placeholder='Adicione uma descrição para a vaga.'
          multiline
          setValue={setValue}
        />
        <FormField
          initialValue={details.values}
          name='values'
          label='Valores da empresa'
          placeholder='Adicione uma breve descrição dos valores da empresa.'
          multiline
          setValue={setValue}
        />
        <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
          <BodyPrimary>Iniciar</BodyPrimary>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: '16px',
    margin: '16px',
    marginVertical: 'auto',
    backgroundColor: '#272F3E',
    padding: '16px',
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
