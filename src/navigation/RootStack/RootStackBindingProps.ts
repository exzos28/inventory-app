import {RootParamList} from './RootStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootStackBindingProps<S extends keyof RootParamList> = {
  navigation: StackNavigationProp<RootParamList, S>;
  route: RouteProp<RootParamList, S>;
};
