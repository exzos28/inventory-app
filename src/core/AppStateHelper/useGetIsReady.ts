import useRoot from '../Root/hooks/useRoot';

export const useGetIsReady = () => {
  const {appStateHelper} = useRoot();
  return appStateHelper.isReady;
};
