import {Disposer} from '@ncwallet-app/core/src/structure/Service';

declare module 'src/core/structure/mobx' {
  export interface IReactionDisposer extends Disposer {}
}
