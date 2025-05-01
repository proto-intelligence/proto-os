export default {
  typeorm: {
    url: process.env.DATABASE_URL,
    synchronize: true,
    autoLoadEntities: true,
  },
  node_env: 'staging',
  port: process.env.PORT || 3000,
  cors: {
    origin: [
      'http://localhost:3000',
      'https://workflow-creator-develop.up.railway.app',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
};
