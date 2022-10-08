import {Dimensions} from 'react-native';

export default abstract class WindowDimensionsStatic {
  static getInitialDimensions() {
    return {window: Dimensions.get('window'), screen: Dimensions.get('screen')};
  }
}
