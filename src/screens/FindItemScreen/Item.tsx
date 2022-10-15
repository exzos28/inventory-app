import React from 'react';
import {
  Avatar,
  IconProps,
  ListItem,
  ListItemProps,
} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';

export default observer((props: ListItemProps) => (
  <ListItem
    accessoryLeft={ItemImage}
    title="Item name"
    description="Description"
    {...props}
  />
));

const ItemImage = (props: IconProps) => (
  <Avatar {...props} source={{uri: 'https://picsum.photos/200/300'}} />
);
