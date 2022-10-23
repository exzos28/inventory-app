import {range} from 'lodash';
import {Item} from './tempTypes';
import {Url} from './core';

export const ITEMS: Item[] = range(10).map(_ => ({
  image: ('https://picsum.photos/200/300?random=' + _) as Url,
  name: 'HP',
  serialNumber: 'USODJLASD123ASD',
  fields: [
    {
      label: 'Szerokość',
      value: '1',
    },
  ],
}));
