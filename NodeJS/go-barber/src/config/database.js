module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true, // Adiciona duas colunas created_at e updated_at
    underscored: true, // snake case - usa underline nos nomes das tabelas e tudo..
    underscoredAll: true //
  }
}
