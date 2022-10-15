// noinspection JSUnusedLocalSymbols
export default function useNativeGoogleAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onGoogleIdTokenReceived: (token: string) => void,
) {
  return () => {
    console.warn('Not implemented on this platform');
  };
}
