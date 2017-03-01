import { StyleSheet } from 'react-native';
import { colors } from './config/styles';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  title: {
    marginTop:4,
    fontSize:16,
    color: colors.blue2
  },
  leftNavButtonText: {
   	fontSize: 18,
    marginLeft:13,
    marginTop:2
  },
  rightNavButtonText: {
    fontSize: 18,
    marginRight:13,
    marginTop:2
  },
  nav: {
    height: 60,
  }
});

export default styles;
