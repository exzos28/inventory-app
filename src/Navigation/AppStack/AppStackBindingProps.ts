import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {RootParamList} from '../RootStack';
import {AppParamList} from './AppStack';

export type AppStackBindingProps<S extends keyof AppParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AppParamList, S>,
    StackNavigationProp<RootParamList>
  >;
  route: RouteProp<AppParamList, S>;
};
