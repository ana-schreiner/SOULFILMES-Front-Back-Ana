USE soulfilmes_db;

SHOW TABLES;

CREATE TABLE usuarios (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(130) NOT NULL,
  email varchar(255) NOT NULL,
  telefone varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE filmes (
  id int NOT NULL AUTO_INCREMENT,
  titulo varchar(130) NOT NULL,
  diretor varchar(130) NOT NULL,
  genero varchar(130) NOT NULL,
  anoLancamento varchar(4) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE usuarios_filmes (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  usuarioId int NOT NULL,
  filmeId int NOT NULL,
  PRIMARY KEY (usuarioId,filmeId),
  KEY filmeId (filmeId),
  CONSTRAINT usuarios_filmes_ibfk_1 FOREIGN KEY (usuarioId) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT usuarios_filmes_ibfk_2 FOREIGN KEY (filmeId) REFERENCES filmes (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE enderecos (
  id int NOT NULL AUTO_INCREMENT,
  uf varchar(2) NOT NULL,
  cidade varchar(100) NOT NULL,
  cep varchar(8) NOT NULL,
  rua varchar(100) NOT NULL,
  numero varchar(255) DEFAULT 'S/N',
  pagamento varchar(255) NOT NULL,
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  usuarioId int NOT NULL,
  PRIMARY KEY (id),
  KEY usuarioId (usuarioId),
  CONSTRAINT enderecos_ibfk_1 FOREIGN KEY (usuarioId) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE usuario_filme (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  usuarioId int NOT NULL,
  filmeId int NOT NULL,
  PRIMARY KEY (usuarioId,filmeId),
  KEY filmeId (filmeId),
  CONSTRAINT usuario_filme_ibfk_1 FOREIGN KEY (usuarioId) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT usuario_filme_ibfk_2 FOREIGN KEY (filmeId) REFERENCES filmes (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE models (
  createdAt datetime NOT NULL,
  updatedAt datetime NOT NULL,
  filmeId int NOT NULL,
  usuarioId int NOT NULL,
  PRIMARY KEY (filmeId,usuarioId),
  KEY usuarioId (usuarioId),
  CONSTRAINT models_ibfk_1 FOREIGN KEY (filmeId) REFERENCES filmes (id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT models_ibfk_2 FOREIGN KEY (usuarioId) REFERENCES usuarios (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SELECT * FROM usuarios;
SELECT * FROM filmes;
SELECT * FROM usuariofilmes;
SELECT * FROM usuario_filme;

INSERT INTO usuarios (nome, email, telefone, createdAt, updatedAt) VALUES
('João Silva', 'joao.silva@example.com', '11987654321', NOW(), NOW()),
('Maria Oliveira', 'maria.oliveira@example.com', '21987654321', NOW(), NOW()),
('Pedro Santos', 'pedro.santos@example.com', '31987654321', NOW(), NOW()),
('Ana Costa', 'ana.costa@example.com', '41987654321', NOW(), NOW()),
('Lucas Pereira', 'lucas.pereira@example.com', '51987654321', NOW(), NOW());

INSERT INTO enderecos (uf, cidade, cep, rua, numero, pagamento, createdAt, updatedAt, usuarioId) VALUES
('SP', 'São Paulo', '01001000', 'Avenida Paulista', '1578', 'Cartão', NOW(), NOW(), 1),
('RJ', 'Rio de Janeiro', '22060002', 'Praia de Copacabana', '100', 'Dinheiro', NOW(), NOW(), 2),
('MG', 'Belo Horizonte', '30140001', 'Avenida Afonso Pena', '3000', 'Boleto', NOW(), NOW(), 3),
('RS', 'Porto Alegre', '90010001', 'Avenida Loureiro da Silva', '555', 'Transferência', NOW(), NOW(), 4),
('BA', 'Salvador', '40010000', 'Rua da Graça', '200', 'Cartão', NOW(), NOW(), 5);

INSERT INTO filmes (titulo, diretor, genero, anoLancamento, createdAt, updatedAt) VALUES
('A Grande Aventura', 'Maria Oliveira', 'Aventura', '2023', NOW(), NOW()),
('O Mistério do Lago', 'Carlos Souza', 'Suspense', '2022', NOW(), NOW()),
('Amor em Tempos de Guerra', 'Ana Costa', 'Romance', '2021', NOW(), NOW()),
('Despertar da Consciência', 'João Silva', 'Drama', '2020', NOW(), NOW()),
('O Último Guerreiro', 'Pedro Santos', 'Ação', '2019', NOW(), NOW()),
('Viagem ao Centro da Terra', 'Lucas Pereira', 'Ficção Científica', '2018', NOW(), NOW()),
('A Noite Estrelada', 'Mariana Lima', 'Fantasia', '2023', NOW(), NOW()),
('Risco Imediato', 'Felipe Almeida', 'Ação', '2022', NOW(), NOW()),
('Memórias de uma Vida', 'Gabriela Mendes', 'Drama', '2021', NOW(), NOW()),
('O Som do Silêncio', 'Ricardo Gomes', 'Terror', '2020', NOW(), NOW());

INSERT INTO usuario_filme (usuarioId, filmeId) VALUES
(1, 3), -- João Silva assistiu "Amor em Tempos de Guerra"
(1, 5), -- João Silva assistiu "O Último Guerreiro"
(2, 1), -- Maria Oliveira assistiu "A Grande Aventura"
(2, 8), -- Maria Oliveira assistiu "Risco Imediato"
(3, 4), -- Pedro Santos assistiu "Despertar da Consciência"
(3, 9), -- Pedro Santos assistiu "Memórias de uma Vida"
(4, 2), -- Ana Costa assistiu "O Mistério do Lago"
(4, 7), -- Ana Costa assistiu "A Noite Estrelada"
(5, 6), -- Lucas Pereira assistiu "Viagem ao Centro da Terra"
(5, 10); -- Lucas Pereira assistiu "O Som do Silêncio"