import { StyleSheet } from 'react-native';
import colors from './config/styles/colors';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  title: {
    marginTop:4,
    fontSize:16,
    color: colors.gray
  },
  leftNavButtonText: {
   	fontSize: 16,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    fontSize: 16,
    marginRight:13,
    marginTop:2
  },
  nav: {
    flex: 1,
    height: 60,
  }
});

export default styles;
