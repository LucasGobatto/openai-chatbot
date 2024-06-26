import { SafeAreaView as SafeAreaViewRN, ScrollView } from 'react-native';
import { TopBar } from '../top-bar';

export const SafeAreaView = (props) => {
  return (
    <SafeAreaViewRN style={{ flex: 1, width: '100%' }}>
      <TopBar title={props.title} onBack={props.onBack} />
      {props.noScroll ? props.children : <ScrollView>{props.children}</ScrollView>}
    </SafeAreaViewRN>
  );
};
