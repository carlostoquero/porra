<?php

function JornadaComenzada($jornada){
	$ahora = new DateTime("now");
	$inicio_jornada = new DateTime($jornada->fecha_inicio);
	return ($ahora > $inicio_jornada);
}

// Usado tanto para Partidos como para Pronosticos
function Signo($elemento){
	$signo = '';
	if (isset($elemento) and (is_numeric($elemento->goles_equipo_1))){
		if ($elemento->goles_equipo_1 > $elemento->goles_equipo_2)
			$signo = '1';
		if ($elemento->goles_equipo_1 == $elemento->goles_equipo_2)
			$signo = 'X';
		if ($elemento->goles_equipo_1 < $elemento->goles_equipo_2)
			$signo = '2';
	}
	return $signo;	
}

?>