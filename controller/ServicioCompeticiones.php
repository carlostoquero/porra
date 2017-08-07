<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Competicion.php");

function GetCompeticiones(){
	$competiciones = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion FROM `COMPETICION` ORDER BY id_competicion')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		while ($stmt->fetch()){
			$competiciones[] = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $competiciones;
}

function GetCompeticionActual(){
	$competicion = null;
	
	// Primera opción, hay competición en curso
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion FROM `COMPETICION` WHERE now() BETWEEN fecha_inicio and fecha_fin;')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		if ($stmt->fetch()){
			$competicion = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		}
		$stmt->close();
	}
	
	// Segunda opción, hay próxima competición que empieza en el futuro
	if ($competicion == null){
		if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion FROM `COMPETICION` WHERE fecha_inicio = (SELECT min(c2.fecha_inicio) FROM COMPETICION c2 WJERE c2.fecha_inicio > now());')){
			$stmt->execute();
			$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
			if ($stmt->fetch()){
				$competicion = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
			}
			$stmt->close();
		}
	}
	
	// Tercera opción, hay última competición que terminó en el pasado
	if ($competicion == null){
		if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion FROM `COMPETICION` WHERE fecha_fin = (SELECT max(c2.fecha_fin) FROM COMPETICION c2 WHERE c2.fecha_fin < now());')){
			$stmt->execute();
			$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
			if ($stmt->fetch()){
				$competicion = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
			}
			$stmt->close();
		}
	}
	$db->close();
	return $competicion;
}

function GuardarCompeticion($id_competicion, $nombre_competicion, $abreviatura, $titulo, $subtitulo, $reglas, $fecha_inicio, $fecha_fin, $tipo_competicion){
	$guardado_correcto = true;
	$competicion = new CCompeticion($id_competicion, $nombre_competicion, $abreviatura, $titulo, $subtitulo, $reglas, $fecha_inicio, $fecha_fin, $tipo_competicion);
	if ( !isset($id_competicion) ) { $guardado_correcto = InsertarCompeticion($competicion); }
	else { $guardado_correcto = ActualizarCompeticion($competicion); }
	return $guardado_correcto;
}

function InsertarCompeticion($competicion){
    $correctInsert = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO `COMPETICION` (nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion)
	         VALUES  (?, ?, ?, ?, ?, ?, ? ,?)";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($competicion->nombre_competicion, 0, 100);
		$abreviatura_acortada = substr($competicion->abreviatura, 0, 5);
		$titulo_acortado = substr($competicion->titulo, 0, 100);
		$subtitulo_acortado = substr($competicion->subtitulo, 0, 50);
		$stmt->bind_param("sssssssi", $nombre_acortado, $abreviatura_acortada, $titulo_acortado, $subtitulo_acortado, 
		                              $competicion->reglas, $competicion->fecha_inicio, $competicion->fecha_fin, $competicion->tipo_competicion);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctInsert = true;
		$stmt->close();
	}
	$db->close();
	return $correctInsert;
}

function ActualizarCompeticion($competicion){
    $correctUpdate = false;
	$db = new dbConnection();
	$sql =  "UPDATE `COMPETICION` SET nombre_competicion = ?, abreviatura = ?, titulo = ?, subtituo = ?, reglas = ?, fecha_inicio = ?, fecha_fin = ?, id_tipo_competicion = ?
	         WHERE id_competicion = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($competicion->nombre_competicion, 0, 100);
		$abreviatura_acortada = substr($competicion->abreviatura, 0, 5);
		$titulo_acortado = substr($competicion->titulo, 0, 100);
		$subtitulo_acortado = substr($competicion->subtitulo, 0, 50);
		$stmt->bind_param("ssssssii", $nombre_acortado,	$abreviatura_acortada, $titulo_acortado, $subtitulo_acortado, $competicion->reglas, 
									  $competicion->fecha_inicio, $competicion->fecha_fin, $competicion->tipo_competicion, $competicion->id_competicion);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctUpdate = true;
		$stmt->close();
	}
	$db->close();
	return $correctUpdate;
}

function BorrarCompeticion($id_competicion){
    $correctDelete = false;
	$db = new dbConnection();
	$sql = "DELETE FROM `ESTADIOS`  WHERE  id_estadio = ?";
	if ($stmt = $db->mysqli->prepare($sql)){
		$stmt->bind_param("i", $id_estadio);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0)
			$correctDelete = true;
		$stmt->close();
	}
	$db->close();
	return $correctDelete;
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetCompeticiones': 
			$aResult['result'] = GetCompeticiones();
			break;
			
		case 'GetCompeticionActual':
			$aResult['result'] = GetCompeticionActual();
			break;
			
		// case 'GuardarEstadio':
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else{
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->nombre) && isset($arguments->ciudad) ){
					// if (GuardarEstadio($arguments->id, $arguments->nombre, $arguments->ciudad, $arguments->equipo_local))  { 
						// $aResult['result'] = "ok";
					// } else { $aResult['result'] = "error"; }
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			// }
			// break;

		// case 'BorrarEstadio': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else {
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id) ){
					// if (BorrarEstadio($arguments->id))  { $aResult['result'] = "ok";}
					// else { $aResult['result'] = "error"; }
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			 // }
			// break;

		default:
		   $aResult['error'] = 'Not found function '.$_POST['function_name'].'!';
		   break;
	}
}
echo json_encode($aResult);
?>