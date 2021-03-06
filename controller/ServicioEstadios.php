<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Estadio.php");

function GetEstadios(){
	$estadios = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_estadio, nombre_estadio, ciudad, id_equipo_local FROM ESTADIO ORDER BY id_estadio')){
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

function InsertarEstadio($estadio){
    $correctInsert = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO ESTADIO (nombre_estadio, ciudad".(isset($estadio->id_equipo_local) ? ", id_equipo_local" : "").")
	         VALUES  (?, ?".(isset($estadio->id_equipo_local) ? ", ?" : "").")";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($estadio->nombre_estadio, 0, 45);
		$ciudad_acortada = substr($estadio->ciudad_estadio, 0, 45);
		if (isset($estadio->id_equipo_local)){ $stmt->bind_param("ssi", $nombre_acortado, $ciudad_acortada, $estadio->id_equipo_local); }
		else { $stmt->bind_param("ss", $nombre_acortado, $ciudad_acortada); }
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctInsert = true;
		$stmt->close();
	}
	$db->close();
	return $correctInsert;
}

function ActualizarEstadio($estadio){
    $correctUpdate = false;
	$db = new dbConnection();
	$sql =  "UPDATE `ESTADIOS` SET nombre_estadio = ?, ciudad = ?, id_equipo_local = ".(isset($estadio->id_equipo_local) ? "?" : "null")."
	         WHERE id_estadio = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($estadio->nombre_estadio, 0, 45);
		$ciudad_acortada = substr($estadio->ciudad_estadio, 0, 45);
		if (isset($estadio->id_equipo_local)){ $stmt->bind_param("ssii", $nombre_acortado, $ciudad_acortada, $estadio->id_equipo_local, $estadio->id_estadio); }
		else { $stmt->bind_param("ssi", $nombre_acortado, $ciudad_acortada, $estadio->id_estadio); }
		$stmt->execute();
		if ($db->mysqli->affected_rows >= 0) $correctUpdate = true;
		$stmt->close();
	}
	$db->close();
	return $correctUpdate;
}

function BorrarEstadio($id_estadio){
    $correctDelete = false;
	$db = new dbConnection();
	$sql = "DELETE FROM ESTADIO  WHERE  id_estadio = ?";
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

?>