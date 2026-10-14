-- Rode este arquivo para criar o banco e a tabela (pode rodar mais de uma vez):
--   mysql -u root -p < database.sql

SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS blog_include
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE blog_include;

CREATE TABLE IF NOT EXISTS posts (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  titulo     VARCHAR(150) NOT NULL,
  conteudo   TEXT         NOT NULL,
  imagem     VARCHAR(500) NULL,
  criado_em  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo (só são inseridos se a tabela estiver vazia)
INSERT INTO posts (titulo, conteudo)
SELECT * FROM (
  SELECT 'Bem-vindo ao blog' AS titulo, 'Este é o primeiro post, vindo direto do banco de dados.' AS conteudo
  UNION ALL
  SELECT 'Segundo post', 'Edite ou apague este post para testar o CRUD.'
) AS exemplo
WHERE NOT EXISTS (SELECT 1 FROM posts);
