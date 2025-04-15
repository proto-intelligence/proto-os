export default {
  typeorm: {
    url: process.env.DATABASE_URL,
    synchronize: true,
    autoLoadEntities: true,
  },
  node_env: 'staging',
  port: process.env.PORT || 3000
};
