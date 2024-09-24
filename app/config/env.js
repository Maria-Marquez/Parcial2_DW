const env = {
  database: 'desarrollo_web2024',
  username: 'desarrollo_web2024_user',
  password: 'Bd6zb3HxxrnLo1dE9QRjW9lVUvtscnnl',
  host: 'dpg-croe4i2j1k6c739gpj9g-a.oregon-postgres.render.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;