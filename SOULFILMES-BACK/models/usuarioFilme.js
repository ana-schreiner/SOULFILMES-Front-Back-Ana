import { DataTypes } from 'sequelize';
import { connection } from '../config/database.js';
import { Filme } from './filme.js';
import { Usuario } from './usuario.js';

export const usuarioFilme = connection.define('usuarioFilme', {
  usuarioId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  filmeId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  } // aqui estava o erro. tableName: 'usuario_filme' e timestamps: false
  // são opcionais, mas se não forem passados, o Sequelize tentará criar uma tabela com o nome 'usuarioFilmes' e com colunas 'createdAt' e 'updatedAt' que não existem no modelo.
});