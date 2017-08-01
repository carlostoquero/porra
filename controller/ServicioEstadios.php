<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Estadio.php");

function GetEstadios(){
	$estadios = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_estadio, nombre_estadio, ciudad, id_equipo_local FROM `ESTADIOS` ORDER BY id_estadio')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rCiudad, $rEquipoLocal);
		while ($stmt->fetch()){
			$estadios[] = new CEstadio($rId, $rNombre, $rCiudad, $rEquipoLocal);
		}
		$stmt->close();
	}
	$db->close();
	return $estadios;
}

function GuardarEstadio($id_estadio, $nombre_estadio, $ciudad, $equipo_local){
	$guardado_correcto = true;
	$estadio = new CEstadio($id_estadio, $nombre_estadio, $ciudad, $equipo_local);
	if ( !isset($id_estadio) ) { $guardado_correcto = InsertarEstadio($estadio); }
	else { $guardado_correcto = ActualizarEstadio($estadio); }
	return $guardado_correcto;
}

//TODO: Implementar
function InsertarEstadio($estadio){
	return true;
}

//TODO: Implementar
function ActualizarEstadio($estadio){
	return true;
}

//TODO: Implementar
function BorrarEstadio($id_estadio){
	return true;
}


header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetEstadios': 
			$aResult['result'] = GetEstadios();
			break;
			
		case 'GuardarEstadio':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->nombre) && isset($arguments->ciudad) ){
					if (GuardarEstadio($arguments->id, $arguments->nombre, $arguments->ciudad, $arguments->equipo_local))  { 
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarEstadio': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){
					if (BorrarEstadio($arguments->id))  { $aResult['result'] = "ok";}
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