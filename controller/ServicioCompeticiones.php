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

// function GuardarEstadio($id_estadio, $nombre_estadio, $ciudad, $equipo_local){
	// $guardado_correcto = true;
	// $estadio = new CEstadio($id_estadio, $nombre_estadio, $ciudad, $equipo_local);
	// if ( !isset($id_estadio) ) { $guardado_correcto = InsertarEstadio($estadio); }
	// else { $guardado_correcto = ActualizarEstadio($estadio); }
	// return $guardado_correcto;
// }

// function InsertarEstadio($estadio){
    // $correctInsert = false;
	// $db = new dbConnection();
	// $sql =  "INSERT INTO `ESTADIOS` (nombre_estadio, ciudad".(isset($estadio->id_equipo_local) ? ", id_equipo_local" : "").")
	         // VALUES  (?, ?".(isset($estadio->id_equipo_local) ? ", ?" : "").")";
    
    // if ($stmt = $db->mysqli->prepare($sql)){
		// $nombre_acortado = substr($estadio->nombre_estadio, 0, 45);
		// $ciudad_acortada = substr($estadio->ciudad_estadio, 0, 45);
		// if (isset($estadio->id_equipo_local)){ $stmt->bind_param("ssi", $nombre_acortado, $ciudad_acortada, $estadio->id_equipo_local); }
		// else { $stmt->bind_param("ss", $nombre_acortado, $ciudad_acortada); }
		// $stmt->execute();
		// if ($db->mysqli->affected_rows >= 0) $correctInsert = true;
		// $stmt->close();
	// }
	// $db->close();
	// return $correctInsert;
// }

// function ActualizarEstadio($estadio){
    // $correctUpdate = false;
	// $db = new dbConnection();
	// $sql =  "UPDATE `ESTADIOS` SET nombre_estadio = ?, ciudad = ?, id_equipo_local = ".(isset($estadio->id_equipo_local) ? "?" : "null")."
	         // WHERE id_estadio = ?";
    
    // if ($stmt = $db->mysqli->prepare($sql)){
		// $nombre_acortado = substr($estadio->nombre_estadio, 0, 45);
		// $ciudad_acortada = substr($estadio->ciudad_estadio, 0, 45);
		// if (isset($estadio->id_equipo_local)){ $stmt->bind_param("ssii", $nombre_acortado, $ciudad_acortada, $estadio->id_equipo_local, $estadio->id_estadio); }
		// else { $stmt->bind_param("ssi", $nombre_acortado, $ciudad_acortada, $estadio->id_estadio); }
		// $stmt->execute();
		// if ($db->mysqli->affected_rows >= 0) $correctUpdate = true;
		// $stmt->close();
	// }
	// $db->close();
	// return $correctUpdate;
// }

// function BorrarEstadio($id_estadio){
    // $correctDelete = false;
	// $db = new dbConnection();
	// $sql = "DELETE FROM `ESTADIOS`  WHERE  id_estadio = ?";
	// if ($stmt = $db->mysqli->prepare($sql)){
		// $stmt->bind_param("i", $id_estadio);
		// $stmt->execute();
		// if ($db->mysqli->affected_rows >= 0)
			// $correctDelete = true;
		// $stmt->close();
	// }
	// $db->close();
	// return $correctDelete;
// }

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