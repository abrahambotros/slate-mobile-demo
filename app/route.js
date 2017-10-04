import { StackNavigator } from 'react-navigation';
import Editor from './components/editor';

const Route = StackNavigator({
  Home: { screen: Editor },
});

export default Route;
