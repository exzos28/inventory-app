import {ParamListBase, LinkingOptions} from '@react-navigation/native';

export interface LinkingOptionsProvider {
  readonly linkingOptions: LinkingOptions<ParamListBase>;
}
