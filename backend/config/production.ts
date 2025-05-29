export default {
  typeorm: {
    url: process.env.DATABASE_URL,
    synchronize: false,
    autoLoadEntities: true,
  },
  node_env: 'production',
  port: process.env.PORT || 3000,
  cors: {
    origin: [
      'https://workflow-creator-main.up.railway.app',
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
