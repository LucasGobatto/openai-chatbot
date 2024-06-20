import { SafeAreaView as SafeAreaViewRN, ScrollView, View } from 'react-native';
import { TopBar } from '../top-bar';

export const SafeAreaView = (props) => {
  return (
    <SafeAreaViewRN style={{ width: '100%', height: '100%' }}>
      <TopBar title={props.title} onBack={props.onBack} />
      {props.noScroll ? props.children : <ScrollView>{props.children}</ScrollView>}
    </SafeAreaViewRN>
  );
};
