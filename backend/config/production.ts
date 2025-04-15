export default {
  typeorm: {
    url: process.env.DATABASE_URL,
    synchronize: false,
    autoLoadEntities: true,
  },
  node_env: 'production',
  port: process.env.PORT || 3000
};
