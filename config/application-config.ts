import 'dotenv/config';

export const applicationConfig = {
  db: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },

  jwt: {
    secret: 'nest-auth',
    refreshSecret: 'nest-refrsh-auth'
  },

  rateLimit: {
    ttl: 60,
    limit: 10,
  },
};
