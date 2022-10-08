import {NavigationContainerTheme} from './NavigationContainerTheme';
import {Appearance} from '../Appearance';
import {computed, makeObservable} from 'mobx';
import {DefaultTheme} from '@react-navigation/native';

export default class NavigationContainerThemeImpl
  implements NavigationContainerTheme
{
  constructor(private readonly _root: {readonly appearance: Appearance}) {
    makeObservable(this);
  }

  @computed({keepAlive: true})
  get theme() {
    return {
      ...DefaultTheme,
      dark: this._root.appearance.isDark,
      colors: {
        ...DefaultTheme.colors,
        background:
          this._root.appearance.theme.palette['background-basic-color-1'],
      },
    };
  }
}
