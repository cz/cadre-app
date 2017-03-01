import { StyleSheet } from 'react-native';
import colors from '../../config/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 24,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderColor: colors.sand6,
    borderWidth: 1,
    borderRadius: 2,
    color: colors.gray,
  }
});

export default styles;
