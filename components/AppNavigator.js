import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Window from './Window';
import Log from './Log';

const AppNavigator = createStackNavigator({
    Window: {screen: Window },
    Log: {screen: Log},
  },
  {
    defaultNavigationOptions: {
      headerMode: 'none',
      headerVisible: false,
      header: null,
    }
  }
  );

export default createAppContainer(AppNavigator);
