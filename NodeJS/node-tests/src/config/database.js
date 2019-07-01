require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
}); // Utilizado para ao executar a cli do sequelize ele saibar usar
// as variaveis de acordo

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "postgres",
  // Local onde deve ser salvo o banco, no caso, arquivo para sqlite
  logging: false,
  storage: "./__tests__/database.sqlite",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
