import {range} from 'lodash';
import {ItemId, ItemType, UserType} from './tempTypes';
import {Url} from './core';
import {nanoid} from 'nanoid/non-secure';
import {UserId, UserRole} from './core/HadesServer';

const generateItems = (): ItemType[] => [
  {
    fields: [
      {
        label: 'Pamięć',
        value: '16 GB',
      },
      {
        label: 'Grafika',
        value: 'Intel Iris Xe Graphics',
      },
      {
        label: 'Typ ekranu',
        value: 'Matowy, LED, IPS',
      },
    ],
    id: nanoid() as ItemId,
    image:
      'https://allegro.stati.pl/AllegroIMG/PRODUCENCI/HP/Pavilion-15/2022/HP-Pavilion-15-klawiatura.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'HP Pavilion i5-1235U/16GB/512/Win11 IPS Silver',
    qrData: null,
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://allegro.stati.pl/AllegroIMG/PRODUCENCI/Silver-Monkey/OM-004W-SM/Silver-Monkey-M70-Wireless-Comfort-Mouse-Black-Silent-front.png' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Silver Monkey M70 Wireless Comfort Mouse Black Silent',
    qrData: nanoid(),
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://allegro.stati.pl/AllegroIMG/PRODUCENCI/ACER/EK240YCbi-1/Monitor-Acer-EK240YCbi-02.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Acer EK240YCbi',
    qrData: nanoid(),
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://allegro.stati.pl/AllegroIMG/PRODUCENCI/ONEPLUS/Buds-Pro/Black/oneplus-sluchawki-bezprzewodowe-buds-pro-czarne-widok-etui-przod.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'OnePlus Buds Pro black',
    qrData: null,
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/10/pr_2022_10_13_10_8_59_916_02.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Microsoft Surface Laptop 5 13" i5/8GB/512GB/Win11 (Czarny)',
    qrData: null,
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/10/pr_2021_10_20_9_40_17_896_00.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Lenovo IdeaPad Gaming 3-15 R-5/16GB/512 RTX3050Ti 120Hz',
    qrData: null,
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2021/11/pr_2021_11_15_14_4_35_115_00.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Lenovo Legion S7-15 Ryzen 5 5600H/16GB/512/Win10 RTX3050Ti 165Hz',
    qrData: null,
  },
  {
    fields: [],
    id: nanoid() as ItemId,
    image:
      'https://cdn.x-kom.pl/i/setup/images/prod/big/product-new-big,,2022/5/pr_2022_5_26_8_26_2_407_00.jpg' as Url,
    serialNumber: nanoid(8).toUpperCase(),
    name: 'Dell Inspiron 3525 Ryzen 5 5625U/16GB/512/Win11 120Hz',
    qrData: null,
  },
];

export const ITEMS: ItemType[] = [
  ...generateItems(),
  ...generateItems(),
  ...generateItems(),
];

//
//
const baseUser = {
  id: nanoid() as UserId,
  name: 'Oleksandr Kurinnyi',
  role: UserRole.Owner,
};
const USERS: UserType[] = range(1, 20).map(_ => ({
  id: nanoid() as UserId,
  name: 'User',
  role: (_ % 4) as UserRole,
}));
USERS.unshift(baseUser);
export {USERS};
