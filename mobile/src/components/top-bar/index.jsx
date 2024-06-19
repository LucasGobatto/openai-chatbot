import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';
import { H2 } from '../typography';

export const TopBar = (props) => {
  return (
    <View style={styles.topBar}>
      <Pressable style={styles.backButton} onPress={() => props.onBack()}>
        <Ionicons name='chevron-back' size={32} color='#D0D7E4' />
      </Pressable>
      <H2 style={{ color: '#D0D7E4' }}>{props.title}</H2>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: '1px',
    borderBottomColor: '#D0D7E4',
    marginBottom: 8,
  },

  backButton: {
    position: 'absolute',
    left: 12,
  },
});
