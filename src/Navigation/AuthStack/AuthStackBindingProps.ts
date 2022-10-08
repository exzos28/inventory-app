import {AuthParamList} from './AuthStack';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {RootParamList} from '../RootStack';

export type AuthStackBindingProps<S extends keyof AuthParamList> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthParamList, S>,
    StackNavigationProp<RootParamList>
  >;
  route: RouteProp<AuthParamList, S>;
};
