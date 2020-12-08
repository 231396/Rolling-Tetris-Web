CREATE DATABASE RT
GO

USE RT
GO

CREATE TABLE Player(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50) not null,
dtNascimento DATE not null,
cpf NUMERIC(11) not null,
telefone NUMERIC(11) not null,
email VARCHAR(30) not null,
username VARCHAR(16) not null,
password VARCHAR(16) not null,
)
go

CREATE TABLE GameMatch(
idMatch INT PRIMARY KEY AUTO_INCREMENT,
idPlayer INT not null,
score INT not null,
level INT not null,
duration TIME not null,
FOREIGN KEY (idPlayer) REFERENCES Player
)
go

INSERT INTO Player Values (1, 'Andre')
INSERT INTO Player Values (2, 'Caio')
INSERT INTO Player Values (3, 'Samuel')
INSERT INTO Player Values (4, 'Lucas')
INSERT INTO Player Values (10, 'Current')

INSERT INTO GameMatch Values (0, 1, 9000, 1, '00:01:00')
INSERT INTO GameMatch Values (1, 1, 8000, 2, '00:02:00')
INSERT INTO GameMatch Values (2, 2, 7000, 1, '00:03:00')
INSERT INTO GameMatch Values (3, 3, 6000, 2, '00:04:00')
INSERT INTO GameMatch Values (4, 4, 5000, 3, '00:05:00')
INSERT INTO GameMatch Values (5, 10, 7000, 5, '00:06:00')
INSERT INTO GameMatch Values (6, 10, 3000, 4, '00:07:00')

CREATE VIEW PlayersRanks AS
SELECT * 
FROM Player p INNER JOIN GameMatch gm 
ON p.id = gm.idPlayer
ORDER BY gm.score DESC
go