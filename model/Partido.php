<?php
class CPartido {
  public $id_partido;
  public $fecha_hora;
  public $id_equipo_1;
  public $id_equipo_2;
  public $id_estadio;
  public $id_grupo;
  public $id_jornada;
  public $goles_equipo_1;
  public $goles_equipo_2;

  public function CPartido($id, $fecha, $equipo_1, $equipo_2, $estadio, $grupo, $jornada, $goles_1, $goles_2){
	$this->id_partido = $id;
	$this->fecha_hora = $fecha;
	$this->id_equipo_1 = $equipo_1;
	$this->id_equipo_2 = $equipo_2;
	$this->id_estadio = $estadio;
	$this->id_grupo = $grupo;
	$this->id_jornada = $jornada;
	$this->goles_equipo_1 = $goles_1;
	$this->goles_equipo_2 = $goles_2;
  }
}
?>