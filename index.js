import {AppRegistry, LogBox} from 'react-native';
import 'text-encoding';
import 'react-native-get-random-values';
import AppRoot from './src/AppRoot';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  '[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))',
]);

AppRegistry.registerComponent(appName, () => AppRoot);
