import {Disposer} from './src/core';

declare module 'mobx' {
  export interface IReactionDisposer extends Disposer {}
}
