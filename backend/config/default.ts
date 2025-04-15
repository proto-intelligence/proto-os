export default {
  typeorm: {
    url: 'postgresql://postgres:postgres@localhost:5432/postgres',
    synchronize: true,
    autoLoadEntities: true,
  },
  node_env: 'local',
  port: process.env.PORT || 3001
};
