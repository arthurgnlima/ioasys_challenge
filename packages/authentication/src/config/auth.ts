export default {
  jwt: {
    secret: process.env.APP_SECRET || 'ioasys-challenge',
    expiresIn: '1d',
  },
};
