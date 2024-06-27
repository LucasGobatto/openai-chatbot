import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Historic } from '../../components/historic';
import { Input } from '../../components/input';
import { useDeviceIdQuery } from '../../data/use-device-id-query';
import { useHistoricQuery } from '../../data/use-historic-query';
import { useQuestionQuery } from '../../data/use-question-query';
import { useDeviceId, useJobVacancyDescription } from '../../hooks';

export const Chat = () => {
  const [tempQuestion, setTempQuestion] = React.useState('');
  const { deviceId, setDeviceId } = useDeviceId();
  const { details } = useJobVacancyDescription();

  useDeviceIdQuery({
    shouldFetchNewId: !deviceId,
    onSuccess: setDeviceId,
    onError: alert,
  });

  const { historic, refetch: refetchHistoric } = useHistoricQuery({
    deviceId,
    onSuccess: () => setTempQuestion(''),
    onError: (error) => {
      alert(error);
      setDeviceId(null);
    },
  });

  const { sendQuestion } = useQuestionQuery({
    deviceId,
    details,
    onSuccess: refetchHistoric,
    onError: alert,
  });

  function handleMessage(question) {
    setTempQuestion(question);
    sendQuestion(question);
    Keyboard.dismiss();
  }

  const aggregatedHistory = [
    ...historic,
    ...(tempQuestion ? [{ question: tempQuestion, response: '...', date: new Date().toISOString() }] : []),
  ];

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 100, android: 0 })}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
          <>
            <Historic historic={aggregatedHistory} />
            <Input onSubmit={handleMessage} />
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
