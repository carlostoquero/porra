<?php
class CEstadio {
  public $id_estadio;
  public $nombre_estadio;
  public $ciudad_estadio;
  public $id_equipo_local;

  public function CEstadio($id, $nombre, $ciudad, $equipo_local){
	$this->id_estadio = $id;
	$this->nombre_estadio = $nombre;
	$this->ciudad_estadio = $ciudad;
	$this->id_equipo_local = $equipo_local;
  }
}
?>