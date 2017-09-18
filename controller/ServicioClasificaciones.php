<?php
include_once ("../model/ClasificacionEquipo.php");
include_once ("../controller/Comun.php");
require_once ("../controller/ServicioCompeticiones.php");
require_once ("../controller/ServicioJornadas.php");

function GetClasificacionLigaEquipos($id_competicion){
	$grupos = GetGruposCompeticion($id_competicion);
	$clasificaciones = array();
	
	if (isset($grupos) && count($grupos) > 0){
		foreach ($grupos as $grupo){
			$clasificaciones_grupo = array();
			$partidos_grupo = GetPartidosGrupo($grupo->id_grupo);
			if (isset($partidos_grupo) && count($partidos_grupo) > 0){
				foreach ($partidos_grupo as $partido){
					$signo_partido = Signo($partido);
					
					// Solo se analizan partidos completados
					if ($signo_partido <> ''){
						if (!isset($clasificaciones_grupo[$partido->id_equipo_1]))
							$clasificaciones_grupo[$partido->id_equipo_1] = new CClasificacionEquipo($partido->id_equipo_1, 0, 0, 0, 0, 0, 0, 0);

						if (!isset($clasificaciones_grupo[$partido->id_equipo_2]))
							$clasificaciones_grupo[$partido->id_equipo_2] = new CClasificacionEquipo($partido->id_equipo_2, 0, 0, 0, 0, 0, 0, 0);
					
						$clasificaciones_grupo[$partido->id_equipo_1]->jugados = $clasificaciones_grupo[$partido->id_equipo_1]->jugados + 1;
						$clasificaciones_grupo[$partido->id_equipo_2]->jugados = $clasificaciones_grupo[$partido->id_equipo_2]->jugados + 1;
						if ($signo_partido == '1'){
							$clasificaciones_grupo[$partido->id_equipo_1]->ganados = $clasificaciones_grupo[$partido->id_equipo_1]->ganados + 1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_1]->goles_favor + $partido->goles_equipo_1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_1]->goles_contra + $partido->goles_equipo_2;
							$clasificaciones_grupo[$partido->id_equipo_1]->puntos = $clasificaciones_grupo[$partido->id_equipo_1]->puntos + 3;
							
							$clasificaciones_grupo[$partido->id_equipo_2]->perdidos = $clasificaciones_grupo[$partido->id_equipo_2]->perdidos + 1;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_2]->goles_favor + $partido->goles_equipo_2;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_2]->goles_contra + $partido->goles_equipo_1;
						} else if ($signo_partido == '2'){
							$clasificaciones_grupo[$partido->id_equipo_2]->ganados = $clasificaciones_grupo[$partido->id_equipo_2]->ganados + 1;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_2]->goles_favor + $partido->goles_equipo_2;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_2]->goles_contra + $partido->goles_equipo_1;
							$clasificaciones_grupo[$partido->id_equipo_2]->puntos = $clasificaciones_grupo[$partido->id_equipo_2]->puntos + 3;
							
							$clasificaciones_grupo[$partido->id_equipo_1]->perdidos = $clasificaciones_grupo[$partido->id_equipo_1]->perdidos + 1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_1]->goles_favor + $partido->goles_equipo_1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_1]->goles_contra + $partido->goles_equipo_2;
						} else {
							$clasificaciones_grupo[$partido->id_equipo_1]->empatados = $clasificaciones_grupo[$partido->id_equipo_1]->empatados + 1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_1]->goles_favor + $partido->goles_equipo_1;
							$clasificaciones_grupo[$partido->id_equipo_1]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_1]->goles_contra + $partido->goles_equipo_2;
							$clasificaciones_grupo[$partido->id_equipo_1]->puntos = $clasificaciones_grupo[$partido->id_equipo_1]->puntos + 1;

							$clasificaciones_grupo[$partido->id_equipo_2]->empatados = $clasificaciones_grupo[$partido->id_equipo_2]->empatados + 1;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_favor = $clasificaciones_grupo[$partido->id_equipo_2]->goles_favor + $partido->goles_equipo_2;
							$clasificaciones_grupo[$partido->id_equipo_2]->goles_contra = $clasificaciones_grupo[$partido->id_equipo_2]->goles_contra + $partido->goles_equipo_1;
							$clasificaciones_grupo[$partido->id_equipo_2]->puntos = $clasificaciones_grupo[$partido->id_equipo_2]->puntos + 1;
						}
					}
				}
				$clasificaciones_grupo = ordenarClasificacionLiga($clasificaciones_grupo);
				$clasificaciones[$grupo->id_grupo] = $clasificaciones_grupo;
			}
		}
	}
	return $clasificaciones;
}

function ordenarClasificacionEquipos($clasificacion_1, $clasificacion_2){
	if (isset($clasificacion_1) and isset($clasificacion_2)){
		if ($clasificacion_1->puntos == $clasificacion_2->puntos){
			if (($clasificacion_1->goles_favor - $clasificacion_1->goles_contra) == ($clasificacion_2->goles_favor - $clasificacion_2->goles_contra)){
				if ($clasificacion_1->goles_favor == $clasificacion_2->goles_favor){
					return $clasificacion_1->id_equipo < $clasificacion_2->id_equipo;
				} else {
					return ($clasificacion_1->goles_favor < $clasificacion_2->goles_favor) ? 1 : -1;
				}
			} else {
				return (($clasificacion_1->goles_favor - $clasificacion_1->goles_contra) < ($clasificacion_2->goles_favor - $clasificacion_2->goles_contra)) ? 1 : -1;
			}
		} else {
			return ($clasificacion_1->puntos < $clasificacion_2->puntos) ? 1 : -1;
		}
	} else {
		return 1;
	}	
}


function ordenarClasificacionLiga($clasificaciones){
	$clasificacion_final = array();
	// Extraer los elementos clasificacion
	foreach (array_keys($clasificaciones) as $clave){
		$clasificacion_final[] = $clasificaciones[$clave];
	}
	usort($clasificacion_final, "ordenarClasificacionEquipos");
	return $clasificacion_final;
}

function GetClasificacionCopaEquipos($id_competicion){
	$clasificacion = array();
	$jornadas = GetJornadasCompeticionPorTipoJornada($id_competicion, 2); // Jornadas de tipo COPA
	if (isset($jornadas) && count($jornadas) > 0){
		foreach($jornadas as $jornada){
			$partidos = GetPartidosJornada($jornada->id_jornada);
			$clasificacion[$jornada->id_jornada] = $partidos;
		}
	}
	return $clasificacion;
}

// function GetClasificacionUsuarios($id_competicion){

// }

?>