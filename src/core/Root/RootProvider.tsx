import React, {useEffect, useState} from 'react';
import RootContext from './RootContext';
import {autorun} from 'mobx';
import {ThemeProvider} from '../styling';
import {observer} from 'mobx-react-lite';
import {CoreService} from '../Core';
import {RootServiceFactory} from './RootServiceFactory';
import {Root} from './Root';
import {Service} from '../structure';

export type RootProviderProps = {
  children?: React.ReactNode;
  rootServiceFactory: RootServiceFactory;
};

export default observer((props: RootProviderProps) => {
  const {children, rootServiceFactory} = props;
  const [core] = useState(() => new CoreService());
  useEffect(() => core.subscribe(), [core]);
  const [root, setRoot] = useState<Root & Service>();
  useEffect(
    () =>
      autorun(() => {
        if (core.initialized) {
          setRoot(_root => _root ?? rootServiceFactory.create(core));
        }
      }),
    [core, rootServiceFactory],
  );
  useEffect(() => root?.subscribe(), [root]);
  return root ? (
    <RootContext.Provider value={root}>
      <ThemeProvider theme={core.appearance.theme}>{children}</ThemeProvider>
    </RootContext.Provider>
  ) : null;
});
