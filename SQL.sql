CREATE DATABASE "projeto_daniel"
TEMPLATE template0
ENCODING 'WIN1252'
CONNECTION LIMIT -1;

DROP TABLE tb_tarefa
CREATE TABLE tb_tarefa(
id_tarefa SERIAL PRIMARY KEY,
nome		VARCHAR(255),
descricao	VARCHAR(255),
dt_tarefa	DATE);

select *
from tb_tarefa

INSERT INTO tb_tarefa(nome,descricao,dt_tarefa)
VALUES
('Ingles','Estudar na parte da Manhã','05/04/2017');

ALTER TABLE tb_tarefa
ADD finalizado BOOL ;
