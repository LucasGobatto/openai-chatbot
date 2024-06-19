import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View, Text } from 'react-native';
import { BodyPrimary } from '../typography';

export const Selector = (props) => {
  return (
    <SelectDropdown
      onSelect={({ title: selectedItem }) => props.onValueChange(selectedItem)}
      defaultValue={props.defaultValue}
      data={props.options.map((option) => ({ title: option }))}
      renderButton={(selectedItem, isOpened) => (
        <View style={styles.dropdownButtonStyle}>
          <BodyPrimary style={{ color: '#181F2C' }}>
            {(selectedItem && selectedItem.title) || props.placeholder}
          </BodyPrimary>
          <Ionicons name={isOpened ? 'chevron-up' : 'chevron-down'} size={32} color={'#181F2C'} />
        </View>
      )}
      renderItem={(item, idx, isSelected) => (
        <View key={idx} style={isSelected ? styles.dropdownItemTxtSelectedStyle : {}}>
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#D0D7E4',
  },

  dropdownItemTxtStyle: {
    textAlign: 'center',
    padding: 8,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },

  dropdownItemTxtSelectedStyle: {
    backgroundColor: '#C3C3C3',
  },
});
