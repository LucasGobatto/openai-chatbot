import { SafeAreaView } from '../../components/safe-area-view';

export const Chatbot = (props) => {
  return <SafeAreaView title='Chatbot' onBack={() => props.onNavigate('home')} />;
};
