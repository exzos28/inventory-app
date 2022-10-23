import React from 'react';
import {observer} from 'mobx-react-lite';
import {Dayjs} from 'dayjs';
import {View} from 'react-native';
import {Cell, Direction, Grid, Space, Gutter} from '../../components';
import {Text} from '@ui-kitten/components';
import {useStrings, variance} from '../../core';

export type Step = {
  title: string;
  date: Dayjs;
};

export type StepListProps = {
  steps: Step[];
};

export default observer(function StepList({steps}: StepListProps) {
  const strings = useStrings();
  return (
    <Space gutter={Gutter.Small}>
      <Text category="h6">{strings['itemDetailsScreen.history']}</Text>
      <View>
        {steps.map((_, i) => (
          <ItemView key={i}>
            <Grid direction={Direction.Row}>
              <LeftView>
                <LineView top={i === 0} bottom={i + 1 === steps.length} />
                <DotView />
              </LeftView>
              <RightCell>
                <Space gutter={4}>
                  <ItemTitleText category="s1">{_.title}</ItemTitleText>
                  <Text category="c1">{_.date.format('DD.MM.YYYY HH:mm')}</Text>
                </Space>
              </RightCell>
            </Grid>
          </ItemView>
        ))}
      </View>
    </Space>
  );
});

const ItemView = variance(View)(() => ({
  root: {},
}));

const ItemTitleText = variance(Text)(() => ({
  root: {
    fontSize: 16,
  },
}));

const LeftView = variance(View)(() => ({
  root: {
    paddingLeft: 5,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const RightCell = variance(Cell)(() => ({
  root: {
    paddingVertical: 5,
  },
}));

const DotView = variance(View)(theme => ({
  root: {
    height: 15,
    width: 15,
    borderRadius: 7.5,
    backgroundColor: theme.palette['color-primary-400'],
  },
}));

const LineView = variance(View)(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 11,
    width: 2,
    backgroundColor: theme.palette['color-primary-400'],
  },
  top: {
    top: '50%',
  },
  bottom: {
    bottom: '50%',
  },
}));
