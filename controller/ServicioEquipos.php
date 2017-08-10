<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Equipo.php");

function GetEquipos(){
	$equipos = array();
	$db = new dbConnection();
	if ($stmtEquipos = $db->mysqli->prepare('SELECT id_equipo, nombre_equipo, abreviatura, url_escudo FROM EQUIPOS ORDER BY id_equipo')){
		$stmtEquipos->execute();
		$stmtEquipos->bind_result($rId, $rNombre, $rAbreviatura, $rUrl);
		while ($stmtEquipos->fetch()){
			$equipos[] = new CEquipo($rId, $rNombre, $rAbreviatura, $rUrl);
		}
		$stmtEquipos->close();
	}
	$db->close();
	return $equipos;
}
			
function GetEquiposByCompeticion($id_competicion){
	$equipos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT E.id_equipo, E.nombre_equipo, E.abreviatura, E.url_escudo
									  FROM EQUIPOS_COMPETICION EC JOIN EQUIPOS E ON E.id_equipo = EC.id_equipo
									  WHERE EC.id_competicion = ? ORDER by E.id_equipo')) {
		$stmt->bind_param("i", $id_competicion);
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rAbreviatura, $rUrl);
		while ($stmt->fetch()){
			$equipos[] = new CEquipo($rId, $rNombre, $rAbreviatura, $rUrl);
		}
		$stmt->close();
	}
	$db->close();
	return $equipos;
}

// function GetEquiposByGrupo($id_grupo){
	// $equipos = array();
	// $db = new dbConnection();
	// if ($stmt = $db->mysqli->prepare('SELECT E.id_equipo, E.nombre_equipo, E.abreviatura, E.url_escudo, EC.id_competicion, EC.id_grupo
									  // FROM EQUIPOS_COMPETICION EC JOIN EQUIPOS E ON E.id_equipo = EC.id_equipo
									  // WHERE EC.id_grupo = ? ORDER by E.id_equipo')) {
		// $stmtCompeticiones->bind_param("i", $id_grupo);
		// $stmt->execute();
		// $stmt->bind_result($rId, $rNombre, $rAbreviatura, $rUrl, $rIdCompeticion, $rIdGrupo);
		// while ($stmt->fetch()){
			// $competiciones_equipo = array();
			// $competiciones_equipo[] = new CCompeticionEquipo($rIdCompeticion, $rIdGrupo);
			// $equipos[] = new CEquipo($rId, $rNombre, $rAbreviatura, $rUrl, $competiciones_equipo);
		// }
		// $stmt->close();
	// }
	// $db->close();
	// return $equipos;
// }

function GuardarEquipo($id_equipo, $nombre_equipo, $abreviatura, $url, &$mensajes){
	$guardado_correcto = true;
	$equipo = new CEquipo($id_equipo, $nombre_equipo, $abreviatura, $url);
	if ( !isset($id_equipo) ) { $guardado_correcto = InsertarEquipo($equipo, $mensajes); }
	else { $guardado_correcto = ActualizarEquipo($equipo, $mensajes); }
	return $guardado_correcto;
}

function InsertarEquipo($equipo, &$mensajes){
    $correctInsert = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("INSERT INTO `EQUIPOS` (nombre_equipo, abreviatura, url_escudo) VALUES  (?, ?, ?)")){
		$nombre_acortado = substr($equipo->nombre_equipo, 0, 45);
		$abreviatura_acortada = substr($equipo->abreviatura, 0, 3);
		$url_acortada = substr($equipo->url_escudo, 0, 45);
		$stmt->bind_param("sss", $nombre_acortado, $abreviatura_acortada, $url_acortada);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){
			$correctInsert = true;
			$mensajes = "Inserción correcta";
		} else { $mensajes = "Error al insertar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $correctInsert;
}

function ActualizarEquipo($equipo, &$mensajes){
    $correctUpdate = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("UPDATE `EQUIPOS` SET nombre_equipo = ?, abreviatura = ?, url_escudo = ? WHERE id_equipo = ?")){
		$nombre_acortado = substr($equipo->nombre_equipo, 0, 45);
		$abreviatura_acortada = substr($equipo->abreviatura, 0, 3);
		$url_acortada = substr($equipo->url_escudo, 0, 45);
		$stmt->bind_param("sssi", $nombre_acortado, $abreviatura_acortada, $url_acortada, $equipo->id_equipo);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){ 
			$correctUpdate = true;
			$mensajes = "Actualización correcta";
		} else { $mensajes = "Error al actualizar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $correctUpdate;
}

function BorrarEquipo($id_equipo, &$mensajes){
    $correctDelete = false;
	$db = new dbConnection();
	//TODO: Descomentar tablas que aún no existen, comprobar si alguna otra tabla debe consultarse
	// Comprobar existencia de registros hijo
	$sql = "select competiciones.cuantos /*+ partidos.cuantos */ + estadios.cuantos 
			from ( 	SELECT count(1) cuantos FROM EQUIPOS_COMPETICION WHERE id_equipo = ?) competiciones,
				 /*(  SELECT count(1) cuantos FROM PARTIDO WHERE id_equipo_1 = ? OR id_equipo_2 = ?) partidos,*/
				 ( 	SELECT count(1) cuantos FROM ESTADIOS WHERE id_equipo_local = ?) estadios";
	
	if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		//TODO: El bueno es el de abajo, no se puede poner hasta que no estén todas las tablas
		$stmtComprobacion->bind_param("ii", $id_equipo, $id_equipo);
		//$stmtComprobacion->bind_param("iiii", $id_equipo,$id_equipo, $id_equipo,$id_equipo);
		
		$stmtComprobacion->execute();
		$stmtComprobacion->bind_result($rCuantos);
		if ($stmtComprobacion->fetch()){
			if ($rCuantos > 0){ $mensajes = "El equipo tiene datos vinculados, limpie antes esos datos (competiciones, partidos, estadios)."; }
		}
		$stmtComprobacion->close();
		
		// Si no hay registros hijo, borrar
		if ($rCuantos == 0){
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM `EQUIPOS`  WHERE  id_equipo = ?")){
				$stmtBorrado->bind_param("i", $id_equipo);
				$stmtBorrado->execute();
				if ($db->mysqli->affected_rows >= 0){
					$correctDelete = true;
					$mensajes = "Borrado correcto";
				} else { $mensajes = "Error al borrar: ".$db->mysqli->error; } 
				$stmtBorrado->close();
			} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
			$stmtBorrado->close();
		}
	} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
	$db->close();
	return $correctDelete;
}

function GetCompeticionesEquipo($id_equipo){
	$competiciones_equipo = array();
	$db = new dbConnection();
	if ($stmtCompeticiones = $db->mysqli->prepare('SELECT id_equipo, id_competicion, id_grupo FROM EQUIPOS_COMPETICION WHERE id_equipo = ? ORDER BY id_competicion;')){
		$stmtCompeticiones->bind_param("i", $id_equipo);
		$stmtCompeticiones->execute();
		$stmtCompeticiones->bind_result($rIdEquipo, $rIdCompeticion, $rIdGrupo);
		while ($stmtCompeticiones->fetch()){
			$competiciones_equipo[] = new CCompeticionEquipo($rIdEquipo, $rIdCompeticion, $rIdGrupo);
		}
		$stmtCompeticiones->close();
	}
	$db->close();
	return $competiciones_equipo;
}

function GetCompeticionEquipo($id_equipo, $id_competicion){
	$competicion_equipo = null;
	$db = new dbConnection();
	if ($stmtCompeticiones = $db->mysqli->prepare('SELECT id_equipo, id_competicion, id_grupo FROM EQUIPOS_COMPETICION WHERE id_equipo = ? AND id_competicion = ? ORDER BY id_competicion;')){
		$stmtCompeticiones->bind_param("ii", $id_equipo, $id_competicion);
		$stmtCompeticiones->execute();
		$stmtCompeticiones->bind_result($rIdEquipo, $rIdCompeticion, $rIdGrupo);
		if ($stmtCompeticiones->fetch()){
			$competicion_equipo = new CCompeticionEquipo($rIdEquipo, $rIdCompeticion, $rIdGrupo);
		}
		$stmtCompeticiones->close();
	}
	$db->close();
	return $competicion_equipo;
}


function GuardarCompeticionEquipo($id_equipo, $id_competicion, $id_grupo, &$mensajes){
	$guardado_correcto = true;
	$competicion_equipo = new CCompeticionEquipo($id_equipo, $id_competicion, $id_grupo);
	$competicion_guardada = GetCompeticionEquipo($id_equipo, $id_competicion);
	if ( !isset($competicion_guardada) ) { $guardado_correcto = InsertarCompeticionEquipo($competicion_equipo, $mensajes); }
	else { $guardado_correcto = ActualizarCompeticionEquipo($competicion_equipo, $mensajes); }
	return $guardado_correcto;
}

function InsertarCompeticionEquipo($comp_equipo, &$mensajes){
    $correctInsert = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("INSERT INTO EQUIPOS_COMPETICION (id_equipo, id_competicion, id_grupo) VALUES  (?, ?, ?)")){
		$stmt->bind_param("iii", $comp_equipo->id_equipo, $comp_equipo->id_competicion, $comp_equipo->id_grupo);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){
			$correctInsert = true;
			$mensajes = "Inserción correcta";
		} else { $mensajes = "Error al insertar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $correctInsert;
}

function ActualizarCompeticionEquipo($comp_equipo, &$mensajes){
    $correctUpdate = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("UPDATE EQUIPOS_COMPETICION SET id_grupo = ? WHERE id_equipo = ? AND id_competicion = ?")){
		$stmt->bind_param("iii", $comp_equipo->id_grupo, $comp_equipo->id_equipo, $comp_equipo->id_competicion);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0){ 
			$correctUpdate = true;
			$mensajes = "Actualización correcta";
		} else { $mensajes = "Error al actualizar: ".$db->mysqli->error; }
		$stmt->close();
	} else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	$db->close();
	return $correctUpdate;
}

function BorrarCompeticionEquipo($id_equipo, $id_competicion, &$mensajes){
    $correctDelete = false;
	$db = new dbConnection();
	// // Comprobar existencia de registros hijo
	// $sql = "select partidos.cuantos 
			// from (  SELECT count(1) cuantos FROM PARTIDO p JOIN JORNADA j ON j.id_jornada = p.id_jornada 
			        // WHERE (p.id_equipo_1 = ? OR p.id_equipo_2 = ?) AND j.id_competicion = ?) partidos";
	
	// if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		// $stmtComprobacion->bind_param("iii", $id_equipo, $id_equipo, $id_competicion);
		
		// $stmtComprobacion->execute();
		// $stmtComprobacion->bind_result($rCuantos);
		// if ($stmtComprobacion->fetch()){
			// // Si no hay registros hijo, borrar
			// if ($rCuantos > 0){ $mensajes = "El equipo/competicion tiene datos vinculados, limpie antes esos datos (competiciones, partidos, estadios)."; }
		// }
		// $stmtComprobacion->close();
		
		// if ($rCuantos == 0){
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM EQUIPOS_COMPETICION WHERE  id_equipo = ? AND id_competicion = ?")){
				$stmtBorrado->bind_param("ii", $id_equipo, $id_competicion);
				$stmtBorrado->execute();
				if ($db->mysqli->affected_rows >= 0){
					$correctDelete = true;
					$mensajes = "Borrado correcto";
				} else { $mensajes = "Error al borrar: ".$db->mysqli->error; } 
				$stmtBorrado->close();
			} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
		//}
		$stmtBorrado->close();
	// }			
	$db->close();
	return $correctDelete;
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {
	switch($_GET['function_name']) {
		case 'GetEquipos': 
			$aResult['result'] = GetEquipos();
			break;

		case 'GetEquiposByCompeticion': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){
					$aResult['result'] = GetEquiposByCompeticion($arguments->id);
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;
			
		// case 'GetEquiposByGrupo': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else{
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id_grupo) ){
					// $aResult['result'] = GetEquiposByGrupo($arguments->id_grupo);
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			// }
			// break;

		case 'GuardarEquipo':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->nombre) && isset($arguments->abreviatura) && isset($arguments->url)){
					if (GuardarEquipo($arguments->id, $arguments->nombre, $arguments->abreviatura, $arguments->url, $aResult['messages']))  { 
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarEquipo': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){
					if (BorrarEquipo($arguments->id, $aResult['messages']))  { $aResult['result'] = "ok";}
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetCompeticionesEquipo':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){
					$aResult['result'] = GetCompeticionesEquipo($arguments->id);
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		case 'GuardarCompeticionEquipo':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_equipo) && isset($arguments->id_competicion) && isset($arguments->id_grupo) ){
					if (GuardarCompeticionEquipo($arguments->id_equipo, $arguments->id_competicion, $arguments->id_grupo, $aResult['messages']))  { 
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		case 'BorrarCompeticionEquipo':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_equipo) && isset($arguments->id_competicion) ){
					if (BorrarCompeticionEquipo($arguments->id_equipo, $arguments->id_competicion, $aResult['messages']))  { $aResult['result'] = "ok";}
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