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
      'https://proto-os-frontend-develop.up.railway.app',
      'https://dashboard.theproto.ai',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4o-mini',
    temperature: 0.7,
    maxTokens: 1000,
  },
};
