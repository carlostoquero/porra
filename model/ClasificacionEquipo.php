<?php
class CClasificacionEquipo {
  public $id_equipo;
  public $jugados;
  public $ganados;
  public $empatados;
  public $perdidos;
  public $goles_favor;
  public $goles_contra;
  public $puntos;

  public function CClasificacionEquipo($id, $jugados, $ganados, $empatados, $perdidos, $favor, $contra, $puntos){
	$this->id_equipo = $id;
	$this->jugados = $jugados;
	$this->ganados = $ganados;
	$this->empatados = $empatados;
	$this->perdidos = $perdidos;
	$this->goles_favor = $favor;
	$this->goles_contra = $contra;
	$this->puntos = $puntos;
  }
}

?>