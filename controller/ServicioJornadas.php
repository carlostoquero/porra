<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Jornada.php");
include_once ("../model/Partido.php");

function GetJornadas(){
	$jornadas = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_jornada, fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion
									  FROM JORNADA ORDER BY id_jornada')){
		$stmt->execute();
		$stmt->bind_result($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		while ($stmt->fetch()){
			$jornadas[] = new CJornada($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $jornadas;
}

function GetJornadasCompeticion($id_competicion){
	$jornadas = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_jornada, fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion
									  FROM JORNADA WHERE id_competicion = ? ORDER BY id_jornada')){
		$stmt->bind_param("i", $id_competicion);
		$stmt->execute();
		$stmt->bind_result($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		while ($stmt->fetch()){
			$jornadas[] = new CJornada($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $jornadas;
}

function GetJornadaActual($id_competicion){
	$jornada = null;
	
	// Primera opción, hay jornada en curso
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_jornada, fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion 
									  FROM JORNADA WHERE now() BETWEEN fecha_inicio and fecha_fin;')){
		$stmt->execute();
		$stmt->bind_result($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		if ($stmt->fetch()){
			$jornada = new CJornada($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
		}
		$stmt->close();
	}
	
	// Segunda opción, próxima jornada en el futuro
	if ($jornada == null){
		if ($stmt = $db->mysqli->prepare('SELECT id_jornada, fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion 
									      FROM JORNADA WHERE fecha_inicio = (SELECT min(j2.fecha_inicio) FROM JORNADA j2 WJERE j2.fecha_inicio > now());')){
			$stmt->execute();
			$stmt->bind_result($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
			if ($stmt->fetch()){
				$jornada = new CJornada($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
			}
			$stmt->close();
		}
	}
	
	// Tercera opción, última jornada en el pasado
	if ($jornada == null){
		if ($stmt = $db->mysqli->prepare('SELECT id_jornada, fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion 
									      FROM JORNADA WHERE fecha_fin = (SELECT max(j2.fecha_fin) FROM JORNADA j2 WHERE j2.fecha_fin < now());')){
			$stmt->execute();
			$stmt->bind_result($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
			if ($stmt->fetch()){
				$jornada = new CJornada($rId, $rFechaInicio, $rFechaFin, $rNumero, $rNombre, $rNombreCorto, $rTipoJornada, $rCompeticion);
			}
			$stmt->close();
		}
	}
	$db->close();
	return $jornada;
}

function GuardarJornada($id_jornada, $inicio, $fin, $numero, $nombre, $nombre_corto, $tipo_jornada, $competicion, &$mensajes){
	$guardado_correcto = "";
	$jornada = new CJornada($id_jornada, $inicio, $fin, $numero, $nombre, $nombre_corto, $tipo_jornada, $competicion);
	if ( !isset($id_jornada) ) { $guardado_correcto = InsertarJornada($jornada, $mensajes); }
	else { $guardado_correcto = ActualizarJornada($jornada, $mensajes); }
	return $guardado_correcto;
}

function InsertarJornada($jornada, &$mensajes){
    $insercion_correcta = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO JORNADA (fecha_inicio, fecha_fin, numero_jornada, nombre_jornada, nombre_corto, id_tipo_jornada, id_competicion)
	         VALUES  (?, ?, ?, ?, ?, ?, ?)";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($jornada->nombre_jornada, 0, 20);
		$abreviatura_acortada = substr($jornada->nombre_corto, 0, 5);
		$stmt->bind_param("ssissii", $jornada->fecha_inicio, $jornada->fecha_fin, $jornada->numero_jornada, $nombre_acortado, $abreviatura_acortada, 
		                             $jornada->id_tipo_jornada, $jornada->id_competicion);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) {
			$mensajes = "Inserción correcta";
			$insercion_correcta = true;
		} else { $mensajes = "Error al insertar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $insercion_correcta;
}

function ActualizarJornada($jornada, &$mensajes){
    $actualizacion_correcta = false;
	$db = new dbConnection();
	$sql =  "UPDATE JORNADA SET fecha_inicio = ?, fecha_fin = ?, numero_jornada = ?, nombre_jornada = ?, nombre_corto = ?,  id_tipo_jornada = ?, id_competicion = ?
	         WHERE id_jornada = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($jornada->nombre_jornada, 0, 20);
		$abreviatura_acortada = substr($jornada->nombre_corto, 0, 5);
		$stmt->bind_param("ssissiii", $jornada->fecha_inicio, $jornada->fecha_fin, $jornada->numero_jornada, $nombre_acortado, $abreviatura_acortada, 
		                             $jornada->id_tipo_jornada, $jornada->id_competicion, $jornada->id_jornada);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){
			$mensajes = "Actualización correcta";
			$actualizacion_correcta = true;
		} else { $mensajes = "Error al actualizar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $actualizacion_correcta;
}

function BorrarJornada($id_jornada, &$mensajes){
    $borrado_correcto = false;
	$db = new dbConnection();
	
	// Comprobar existencia de registros hijo
	$sql = "SELECT count(1) cuantos FROM PARTIDO WHERE id_jornada = ?";
	
	if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		$stmtComprobacion->bind_param("i", $id_jornada);
		
		$stmtComprobacion->execute();
		$stmtComprobacion->bind_result($rCuantos);
		if ($stmtComprobacion->fetch()){
			// Si no hay registros hijo, borrar
			if ($rCuantos > 0){ $mensajes = "La jornada tiene partidos vinculados, limpie antes esos partidos."; }
		}
		$stmtComprobacion->close();
		
		if ($rCuantos == 0){
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM JORNADA WHERE id_jornada = ?")){
				$stmtBorrado->bind_param("i", $id_jornada);
				$stmtBorrado->execute();
				if ($db->mysqli->affected_rows >= 0){
					$mensajes = "Borrado correcto";
					$borrado_correcto = true;
				} else { $mensajes = "Error al borrar: ".$db->mysqli->error; }
				$stmtBorrado->close();
			} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
		}
	} else { $mensajes = "Error al comprobar si existen datos vinculados."; }

	$db->close();
	return $borrado_correcto;
}

function GetPartidos(){
	$partidos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_partido, fecha_hora, id_equipo_1, id_equipo_2, id_estadio, id_grupo, id_jornada, goles_equipo_1, goles_equipo_2
	                                  FROM PARTIDO ORDER BY id_partido')){
		$stmt->execute();
		$stmt->bind_result($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		while ($stmt->fetch()){
			$partidos[] = new CPartido($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		}
		$stmt->close();
	}
	$db->close();
	return $partidos;
}

function GetPartidosJornada($id_jornada){
	$partidos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_partido, fecha_hora, id_equipo_1, id_equipo_2, id_estadio, id_grupo, id_jornada, goles_equipo_1, goles_equipo_2
	                                  FROM PARTIDO WHERE id_jornada = ? ORDER BY id_partido')){
		$stmt->bind_param("i", $id_jornada);
		$stmt->execute();
		$stmt->bind_result($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		while ($stmt->fetch()){
			$partidos[] = new CPartido($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		}
		$stmt->close();
	}
	$db->close();
	return $partidos;
}

function GuardarPartido($id_partido, $equipo_1, $equipo_2, $estadio, $grupo, $fecha_hora, $jornada, &$mensajes){
	$guardado_correcto = true;
	$partido = new CPartido($id_partido, $fecha_hora, $equipo_1, $equipo_2, $estadio, $grupo, $jornada, null, null);
	if ( !isset($id_partido) ) { $guardado_correcto = InsertarPartido($partido, $mensajes); }
	else { $guardado_correcto = ActualizarPartido($partido, $mensajes); }
	return $guardado_correcto;
}

function InsertarPartido($partido, &$mensajes){
    $insercion_correcta = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO PARTIDO (id_equipo_1, id_equipo_2, id_estadio, ".(isset($partido->id_grupo) ? "id_grupo, " : "")."fecha_hora, id_jornada) 
	         VALUES  (?, ?, ?, ".(isset($partido->id_grupo) ? "?, " : "")."?, ?)";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		if (isset($partido->id_grupo)) $stmt->bind_param("iiiisi", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->id_grupo, 
		                                                           $partido->fecha_hora, $partido->id_jornada);
		else $stmt->bind_param("iiisi", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->fecha_hora, $partido->id_jornada);
		
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) {
			$mensajes = "Inserción correcta";
			$insercion_correcta = true;
		} else {
			$mensajes = "Error al insertar: ".$db->mysqli->error;
		}
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $insercion_correcta;
}

function ActualizarPartido($partido, &$mensajes){
    $actualizacion_correcta = false;
	$db = new dbConnection();
	$sql =  "UPDATE PARTIDO SET id_equipo_1 = ?, id_equipo_2 = ?, id_estadio = ?, id_grupo = ".(isset($partido->id_grupo) ? "?" : "null").", fecha_hora = ?, id_jornada = ? 
	         WHERE id_partido = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		if (isset($partido->id_grupo)) $stmt->bind_param("iiiisii", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->id_grupo, 
		                                                            $partido->fecha_hora, $partido->id_jornada, $partido->id_partido);
		else $stmt->bind_param("iiisii", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->fecha_hora, $partido->id_jornada, $partido->id_partido);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){
			$mensajes = "Actualización correcta";
			$actualizacion_correcta = true;
		} else {
			$mensajes = "Error al actualizar: ".$db->mysqli->error;
		}
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $actualizacion_correcta;
}

function BorrarPartido($id_partido, &$mensajes){
    $borrado_correcto = false;
	$db = new dbConnection();
	
	//TODO: Tabla no creada todavia
/*	// Comprobar existencia de registros hijo
	$sql = "SELECT count(1) cuantos FROM PRONOSTICO WHERE id_partido = ?";
	
	if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		$stmtComprobacion->bind_param("i", $id_partido);
		
		$stmtComprobacion->execute();
		$stmtComprobacion->bind_result($rCuantos);
		if ($stmtComprobacion->fetch()){
			// Si no hay registros hijo, borrar
			if ($rCuantos > 0){ $mensajes = "El partido tiene datos vinculados, limpie antes esos datos (pronósticos)."; }
		}
		$stmtComprobacion->close();
		
		if ($rCuantos == 0){*/
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM PARTIDO WHERE id_partido = ?")){
				$stmtBorrado->bind_param("i", $id_partido);
				$stmtBorrado->execute();
				if ($db->mysqli->affected_rows >= 0){
					$mensajes = "Borrado correcto";
					$borrado_correcto = true;
				} else {
					$mensajes = "Error al borrar: ".$db->mysqli->error;
				}
				$stmtBorrado->close();
			} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
		/*}
	} else { $mensajes = "Error al comprobar si existen datos vinculados."; }*/

	$db->close();
	return $borrado_correcto;
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetJornadas': 
			$aResult['result'] = GetJornadas();
			break;
			
		case 'GetJornadasCompeticion': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetJornadasCompeticion($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetJornadaActual':
			$aResult['result'] = GetJornadaActual();
			break;
			
		case 'GuardarJornada':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->inicio) && isset($arguments->fin) && isset($arguments->numero) && isset($arguments->nombre) && 
				    isset($arguments->nombre_corto) && isset($arguments->tipo_jornada) && isset($arguments->competicion) ){
					if (GuardarJornada($arguments->id, $arguments->inicio, $arguments->fin, $arguments->numero, $arguments->nombre, 
					                   $arguments->nombre_corto, $arguments->tipo_jornada, $arguments->competicion, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarJornada': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarJornada($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetPartidos':
			$aResult['result'] = GetPartidos();
			break;
			
		case 'GetPartidosJornada':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){  $aResult['result'] = GetPartidosJornada($arguments->id); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
		
		case 'GuardarPartido':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->equipo_1) && isset($arguments->equipo_2) && isset($arguments->estadio) && isset($arguments->fecha_hora) && isset($arguments->jornada)){
					$aResult['result'] = "ok";
					if (GuardarPartido($arguments->id, $arguments->equipo_1, $arguments->equipo_2, $arguments->estadio, $arguments->grupo,
					                   $arguments->fecha_hora, $arguments->jornada, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarPartido': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarPartido($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		default:
		   $aResult['error'] = 'Not found function '.$_POST['function_name'].'!';
		   break;
	}
}
echo json_encode($aResult);
?>