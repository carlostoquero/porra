<?php
class CCompeticion {
  public $id_competicion;
  public $nombre_competicion;
  public $siglas;
  public $titulo;
  public $subtitulo;
  public $reglas;
  public $fecha_inicio;
  public $fecha_fin;
  public $id_tipo_competicion;

  public function CCompeticion($id, $nombre, $siglas, $titulo, $subtitulo, $reglas, $fecha_inicio, $fecha_fin, $tipo_competicion){
	  $this->id_competicion = $id;
	  $this->nombre_competicion = $nombre;
	  $this->siglas = $siglas;
	  $this->titulo = $titulo;
	  $this->subtitulo = $subtitulo;
	  $this->reglas = $reglas;
	  $this->fecha_inicio = $fecha_inicio;
	  $this->fecha_fin = $fecha_fin;
	  $this->id_tipo_competicion = $tipo_competicion;
  }
}

class CGrupo {
  public $id_grupo;
  public $nombre_grupo;
  public $id_competicion;

  public function CGrupo($id, $nombre, $competicion){
	$this->id_grupo = $id;
	$this->nombre_grupo = $nombre;
	$this->id_competicion = $competicion;
  }
}
?>