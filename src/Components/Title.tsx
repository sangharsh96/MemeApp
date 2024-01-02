import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';

export const Title = ({title}: {title: string}) => {
  return (
    <View style={styles.label}>
      <Text style={styles.labelText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 20,
    padding: 5,
    backgroundColor: '#FF0000',
  },
  labelText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    marginTop: 15,
  },
  label: {
    backgroundColor: '#035C92',
    height: 90,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
});
