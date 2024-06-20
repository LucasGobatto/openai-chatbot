import React from 'react';
import { Input } from '../../components/input';
import { Historic } from '../../components/historic';
import { useDeviceIdQuery } from '../../data/use-device-id-query';
import { useHistoricQuery } from '../../data/use-historic-query';
import { useQuestionQuery } from '../../data/use-question-query';
import { useDeviceId, useJobVacancyDescription } from '../../hooks';
import { ScrollView, View } from 'react-native';

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
  }

  const aggregatedHistory = [
    ...historic,
    ...(tempQuestion ? [{ question: tempQuestion, response: '...', date: new Date().toISOString() }] : []),
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Historic historic={aggregatedHistory} />
      </ScrollView>
      <Input onSubmit={handleMessage} />
    </View>
  );
};
