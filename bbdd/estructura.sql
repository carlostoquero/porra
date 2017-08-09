CREATE TABLE ACCESO_USUARIO(
	id_acceso int, 
	nombre_acceso varchar(45), 
	primary key(id_acceso)
);

CREATE TABLE ESTADO_USUARIO(
	id_estado int, 
	nombre_acceso varchar(45), 
	primary key(id_estado)
);

CREATE TABLE TIPO_COMPETICION(
	id_tipo_competicion int, 
	nombre_tipo_competicion varchar(45), 
	primary key(id_tipo_competicion)
);

CREATE TABLE TIPO_JORNADA(
	id_tipo_jornada int, 
	nombre_tipo_jornada varchar(45), 
	primary key(id_tipo_jornada)
);

CREATE TABLE COMPETICION(
	id_competicion int NOT NULL AUTO_INCREMENT,
	nombre_competicion varchar(100) NOT NULL,
	abreviatura varchar(5) NOT NULL UNIQUE,
	titulo varchar(100) NOT NULL,
	subtitulo varchar(50) NOT NULL,
	reglas text,
	fecha_inicio datetime NOT NULL,
	fecha_fin datetime NOT NULL,
	id_tipo_competicion int NOT NULL,
	primary key(id_competicion)
);

CREATE TABLE GRUPO(
	id_grupo int NOT NULL AUTO_INCREMENT,
	nombre_grupo varchar(45) NOT NULL,
	id_competicion int,
	primary key(id_grupo)
);

CREATE TABLE ESTADIO (
  id_estadio int NOT NULL AUTO_INCREMENT,
  nombre_estadio varchar(45) NOT NULL,
  ciudad varchar(45) NOT NULL,
  id_equipo_local int,
  PRIMARY KEY (id_estadio)
);

CREATE TABLE EQUIPO (
  id_equipo int NOT NULL AUTO_INCREMENT,
  nombre_equipo varchar(45) NOT NULL,
  abreviatura varchar(3) NOT NULL UNIQUE,
  url_escudo varchar(45) NOT NULL,
  PRIMARY KEY (id_equipo)
);

CREATE TABLE EQUIPO_COMPETICION (
  id_competicion int NOT NULL,
  id_equipo int NOT NULL,
  id_grupo int NOT NULL,
  PRIMARY KEY (id_competicion, id_equipo)
);

CREATE TABLE JORNADA (
  id_jornada int NOT NULL AUTO_INCREMENT,
  fecha_inicio datetime NOT NULL,
  numero_jornada int NOT NULL,
  nombre_jornada varchar(20) NOT NULL,
  nombre_corto varchar(5) NOT NULL,
  id_tipo_jornada int NOT NULL,
  id_competicion int NOT NULL,
  PRIMARY KEY (id_jornada)
) ;

CREATE TABLE PARTIDO (
  id_partido int NOT NULL AUTO_INCREMENT,
  fecha_hora datetime NOT NULL,
  id_equipo_1 int NOT NULL,
  id_equipo_2 int NOT NULL,
  id_estadio int DEFAULT NULL,
  id_grupo int NOT NULL,
  id_jornada int NOT NULL,
  goles_equipo_1 int DEFAULT NULL,
  goles_equipo_2 int DEFAULT NULL,
  PRIMARY KEY (id_partido)
);
