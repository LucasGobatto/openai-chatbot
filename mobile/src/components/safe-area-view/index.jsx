import { SafeAreaView as SafeAreaViewRN, ScrollView } from 'react-native';
import { TopBar } from '../top-bar';

export const SafeAreaView = (props) => {
  return (
    <SafeAreaViewRN style={{ width: '100%', height: '100%' }}>
      <TopBar title={props.title} onBack={props.onBack} />
      <ScrollView>{props.children}</ScrollView>
    </SafeAreaViewRN>
  );
};
