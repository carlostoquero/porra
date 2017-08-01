<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Tipos.php");

function GetAccesos(){
	$accesos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_acceso, nombre_acceso FROM `ACCESO_USUARIO` ORDER BY id_acceso')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre);
		while ($stmt->fetch()){
			$accesos[] = new CAccesoUsuario($rId, $rNombre);
		}
		$stmt->close();
	}
	$db->close();
	return $accesos;
}

function GetEstados(){
	$estados = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_estado, nombre_estado FROM `ESTADO_USUARIO` ORDER BY id_estado')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre);
		while ($stmt->fetch()){
			$estados[] = new CEstadoUsuario($rId, $rNombre);
		}
		$stmt->close();
	}
	$db->close();
	return $estados;
}

function GetTiposCompeticion(){
	$tiposCompeticion = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_tipo_competicion, nombre_tipo_competicion FROM `TIPO_COMPETICION` ORDER BY id_tipo_competicion')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre);
		while ($stmt->fetch()){
			$tiposCompeticion[] = new CTipoCompeticion($rId, $rNombre);
		}
		$stmt->close();
	}
	$db->close();
	return $tiposCompeticion;
}

function GetTiposJornada(){
	$tiposJornada = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_tipo_jornada, nombre_tipo_jornada FROM `TIPO_JORNADA` ORDER BY id_tipo_jornada')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre);
		while ($stmt->fetch()){
			$tiposJornada[] = new CTipoJornada($rId, $rNombre);
		}
		$stmt->close();
	}
	$db->close();
	return $tiposJornada;
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetAccesos': 
			$aResult['result'] = GetAccesos();
			break;

		case 'GetEstados':
			$aResult['result'] = GetEstados();
			break;

		case 'GetTiposCompeticion':
			$aResult['result'] = GetTiposCompeticion();
			break;

		case 'GetTiposJornada':
			$aResult['result'] = GetTiposJornada();
			break;
			
		default:
		   $aResult['error'] = 'Not found function '.$_POST['function_name'].'!';
		   break;
	}
}
echo json_encode($aResult);
?>