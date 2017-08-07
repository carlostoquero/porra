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
			$competiciones_equipo = array();
			if ($stmtCompeticiones = $db->mysqli->prepare('SELECT id_competicion, id_grupo FROM `EQUIPOS_COMPETICION` WHERE id_equipo = ? ORDER BY id_competicion')) {
				$stmtCompeticiones->bind_param("i", $rId);
				$stmtCompeticiones->execute();
				$stmtCompeticiones->bind_result($rIdCompeticion, $rIdGrupo);
				while ($stmtEquipos->fetch()){
					$competiciones_equipo[] = new CCompeticionEquipo($rIdCompeticion, $rIdGrupo);
				}
				$stmtCompeticiones->close();
			}
			$equipos[] = new CEquipo($rId, $rNombre, $rAbreviatura, $rUrl, $competiciones_equipo);
		}
		$stmtEquipos->close();
	}
	$db->close();
	return $equipos;
}

// function GetEquiposByCompeticion($id_competicion){
	// $equipos = array();
	// $db = new dbConnection();
	// if ($stmt = $db->mysqli->prepare('SELECT E.id_equipo, E.nombre_equipo, E.abreviatura, E.url_escudo, EC.id_competicion, EC.id_grupo
									  // FROM EQUIPOS_COMPETICION EC JOIN EQUIPOS E ON E.id_equipo = EC.id_equipo
									  // WHERE EC.id_competicion = ? ORDER by E.id_equipo')) {
		// $stmtCompeticiones->bind_param("i", $id_competicion);
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

function GuardarEquipo($id_equipo, $nombre_equipo, $abreviatura, $url){
	$guardado_correcto = true;
	$equipo = new CEquipo($id_equipo, $nombre_equipo, $abreviatura, $url, array());
	if ( !isset($id_equipo) ) { $guardado_correcto = InsertarEquipo($equipo); }
	else { $guardado_correcto = ActualizarEquipo($equipo); }
	return $guardado_correcto;
}

function InsertarEquipo($equipo){
    $correctInsert = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("INSERT INTO `EQUIPOS` (nombre_equipo, abreviatura, url_escudo) VALUES  (?, ?, ?)")){
		$nombre_acortado = substr($equipo->nombre_equipo, 0, 45);
		$abreviatura_acortada = substr($equipo->abreviatura, 0, 3);
		$url_acortada = substr($equipo->url_escudo, 0, 45);
		$stmt->bind_param("sss", $nombre_acortado, $abreviatura_acortada, $url_acortada);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctInsert = true;
		$stmt->close();
	}
	$db->close();
	return $correctInsert;
}

function ActualizarEquipo($equipo){
    $correctUpdate = false;
	$db = new dbConnection();
    if ($stmt = $db->mysqli->prepare("UPDATE `EQUIPOS` SET nombre_equipo = ?, abreviatura = ?, url_escudo = ? WHERE id_equipo = ?")){
		$nombre_acortado = substr($equipo->nombre_equipo, 0, 45);
		$abreviatura_acortada = substr($equipo->abreviatura, 0, 3);
		$url_acortada = substr($equipo->url_escudo, 0, 45);
		$stmt->bind_param("sssi", $nombre_acortado, $abreviatura_acortada, $url_acortada, $equipo->id_equipo);
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctUpdate = true;
		$stmt->close();
	}
	$db->close();
	return $correctUpdate;
}

function BorrarEquipo($id_equipo){
    $correctDelete = false;
	$db = new dbConnection();
	if ($stmtCompeticiones = $db->mysqli->prepare("DELETE FROM `EQUIPOS`  WHERE  id_equipo = ?")){
		$stmtCompeticiones->bind_param("i", $id_equipo);
		$stmtCompeticiones->execute();
		if ($db->mysqli->affected_rows >= 0){
			if ($stmtEquipo = $db->mysqli->prepare("DELETE FROM `EQUIPOS`  WHERE  id_equipo = ?")){
				$stmtEquipo->bind_param("i", $id_equipo);
				$stmtEquipo->execute();
				if ($db->mysqli->affected_rows >= 0)
					$correctDelete = true;
				$stmtEquipo->close();
			}
		}
		$stmtCompeticiones->close();
	}			
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

		// case 'GetEquiposByCompeticion': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else{
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id_competicion) ){
					// $aResult['result'] = GetEquiposByCompeticion($arguments->id_competicion);
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			// }
			// break;
			
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
					if (GuardarEquipo($arguments->id, $arguments->nombre, $arguments->abreviatura, $arguments->url))  { 
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
					if (BorrarEquipo($arguments->id))  { $aResult['result'] = "ok";}
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