export default {
  typeorm: {
    url: 'postgresql://postgres:postgres@localhost:5432/postgres',
    synchronize: true,
    autoLoadEntities: true,
  },
  node_env: 'local',
  port: process.env.PORT || 3001,
  cors: {
    origin: [
      'http://localhost:3000',
      'https://workflow-creator-develop.up.railway.app',
      'https://workflow-creator-main.up.railway.app',
      'https://dashboard.theproto.ai',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
};
