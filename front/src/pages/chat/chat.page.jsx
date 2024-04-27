import { Chat } from '../../components/chat';
import { Input } from '../../components/input';
import { useDeviceIdQuery } from '../../data/use-device-id-query';
import { useHistoricQuery } from '../../data/use-historic-query';
import { useDeviceId } from '../../hooks';

// Templates for suggestioned questions
// const templates = [
//   {
//     question: 'Lorem ipsum?',
//     onClick: () => alert('In progress...'),
//   },
// ];

export function ChatPage() {
  const { deviceId, setDeviceId } = useDeviceId();

  useDeviceIdQuery({
    shouldFetchNewId: false, // TODO - change to !deviceId when API is ready,
    onSuccess: setDeviceId,
  });
  const { historic, refetch } = useHistoricQuery(deviceId);

  function handleMessage(question) {
    // TODO - send message to server
    // sendQuestion(question);

    // Obs: refetch will not request the question when the API is ready
    refetch(question);
  }

  return (
    <>
      <Chat historic={historic} />
      {/* TODO - Validar se iremos colocar */}
      {/* <SuggestionedQuestions templates={templates} /> */}
      <Input onSubmit={handleMessage} />
    </>
  );
}
