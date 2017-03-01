import { StyleSheet } from 'react-native';
import colors from '../../config/styles/colors';
import type from '../../config/styles/type';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    backgroundColor: colors.blue3,
    margin: 32,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: type.size.medium,
    fontWeight: 'bold',
  }
});

export default styles;
