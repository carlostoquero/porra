<?php
class CAccesoUsuario {
  public $id_acceso;
  public $nombre_acceso;

  public function CAccesoUsuario($idAcceso, $nombreAcceso){
	$this->id_acceso = $idAcceso;
	$this->nombre_acceso = $nombreAcceso;
  }
}

class CEstadoUsuario {
  public $id_estado;
  public $nombre_estado;

  public function CEstadoUsuario($idEstado, $nombreEstado){
	$this->id_estado = $idEstado;
	$this->nombre_estado = $nombreEstado;
  }
}

class CTipoCompeticion {
  public $id_tipo_competicion;
  public $nombre_tipo_competicion;

  public function CTipoCompeticion($id, $nombre){
	$this->id_tipo_competicion = $id;
	$this->nombre_tipo_competicion = $nombre;
  }
}

class CTipoJornada {
  public $id_tipo_jornada;
  public $nombre_tipo_jornada;

  public function CTipoJornada($id, $nombre){
	$this->id_tipo_jornada = $id;
	$this->nombre_tipo_jornada = $nombre;
  }
}
?>