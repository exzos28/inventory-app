import {AppRegistry} from 'react-native';
import 'text-encoding';
import 'react-native-get-random-values';
import AppRoot from './src/AppRoot';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppRoot);
