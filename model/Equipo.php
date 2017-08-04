<?php
class CEquipo {
  public $id_equipo;
  public $nombre_equipo;
  public $abreviatura;
  public $url_escudo;
  public $competiciones;

  public function CEquipo($id, $nombre, $abreviatura, $url, $competiciones){
	$this->id_equipo = $id;
	$this->nombre_equipo = $nombre;
	$this->abreviatura = $abreviatura;
	$this->url_escudo = $url;
	$this->competiciones = $competiciones;
  }
}

class CCompeticionEquipo{
	public $id_competicion;
	public $id_grupo;
	
	public function CCompeticionEquipo($id_competicion, $id_grupo){
		$this->id_competicion = $id_competicion;
		$this->id_grupo = $id_grupo;
	}
}
?>