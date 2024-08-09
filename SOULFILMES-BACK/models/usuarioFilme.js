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
  } 
});