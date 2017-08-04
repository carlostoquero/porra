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

CREATE TABLE ESTADIOS (
  id_estadio int NOT NULL AUTO_INCREMENT,
  nombre_estadio varchar(45) NOT NULL,
  ciudad varchar(45) NOT NULL,
  id_equipo_local int,
  PRIMARY KEY (id_estadio)
);

CREATE TABLE EQUIPOS (
  id_equipo int NOT NULL AUTO_INCREMENT,
  nombre_equipo varchar(45) NOT NULL,
  abreviatura varchar(3) NOT NULL UNIQUE,
  url_escudo varchar(45) NOT NULL,
  PRIMARY KEY (id_equipo)
);

CREATE TABLE EQUIPOS_COMPETICION (
  id_competicion int NOT NULL,
  id_equipo int NOT NULL,
  id_grupo int NOT NULL,
  PRIMARY KEY (id_competicion, id_equipo)
);