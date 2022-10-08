export type CommonError =
  | {code: 1000; message: 'Invalid token'}
  | {code: 1001; message: 'Token expired'}
  | {code: 2000; message: 'Unauthorized'}
  | {code: 2001; message: 'User not found'}
  | {code: 2002; message: 'User banned'}
  | {code: 2004; message: '2FA incorrect'};
