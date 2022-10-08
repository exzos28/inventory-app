import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '../RootStack';
import {RootBottomTabParamList} from './RootTabNavigator';
import {AppParamList} from '../AppStack/AppStack';

export type RootBottomTabBindingProps<S extends keyof RootBottomTabParamList> =
  {
    navigation: CompositeNavigationProp<
      CompositeNavigationProp<
        StackNavigationProp<RootBottomTabParamList, S>,
        StackNavigationProp<AppParamList>
      >,
      StackNavigationProp<RootParamList>
    >;
    route: RouteProp<RootBottomTabParamList, S>;
  };
