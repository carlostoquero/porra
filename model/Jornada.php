<?php
class CJornada {
  public $id_jornada;
  public $fecha_inicio;
  public $fecha_fin;
  public $numero_jornada;
  public $nombre_jornada;
  public $nombre_corto;
  public $id_tipo_jornada;
  public $id_competicion;

  public function CJornada($id, $inicio, $fin, $numero, $nombre, $corto, $id_tipo_jornada, $id_competicion){
	$this->id_jornada = $id;
	$this->fecha_inicio = $inicio;
	$this->fecha_fin = $fin;
	$this->numero_jornada = $numero;
	$this->nombre_jornada = $nombre;
	$this->nombre_corto = $corto;
	$this->id_tipo_jornada = $id_tipo_jornada;
	$this->id_competicion = $id_competicion;
  }
}
?>