<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Competicion.php");

if (session_id() == '') {
    session_start();
}

function GetCompeticiones(){
	$competiciones = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion 
	                                  FROM COMPETICION ORDER BY id_competicion')){
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

function GetCompeticion($id_competicion){
	$competicion = null;
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion 
	                                  FROM COMPETICION WHERE id_competicion = ? ORDER BY id_competicion')){
		$stmt->bind_param("i", $id_competicion);
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		if ($stmt->fetch()){
			$competicion = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $competicion;
}

function GetCompeticionActual(){
	$competicion = null;
	
	// Primera opción, hay competición en curso
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion 
	                                  FROM COMPETICION WHERE now() BETWEEN fecha_inicio and fecha_fin;')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		if ($stmt->fetch()){
			$competicion = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		}
		$stmt->close();
	}
	
	// Segunda opción, hay próxima competición que empieza en el futuro
	if ($competicion == null){
		if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion 
		                                  FROM COMPETICION WHERE fecha_inicio = (SELECT min(c2.fecha_inicio) FROM COMPETICION c2 WJERE c2.fecha_inicio > now());')){
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
		if ($stmt = $db->mysqli->prepare('SELECT id_competicion, nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion 
		                                  FROM COMPETICION WHERE fecha_fin = (SELECT max(c2.fecha_fin) FROM COMPETICION c2 WHERE c2.fecha_fin < now());')){
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

function GetCompeticionSeleccionada(){
	$competicion_seleccionada = null;
	if (isset($_SESSION['competicion'])){ $competicion_seleccionada = $_SESSION['competicion']; }
	else {
		$competicion_seleccionada = GetCompeticionActual();
		$_SESSION['competicion'] = $competicion_seleccionada;
	}
	return $competicion_seleccionada;
}

function SetCompeticionSeleccionada($id_competicion, &$mensajes){
	$set_correcto = false;
	$competicion = GetCompeticion($id_competicion);
	if (isset($competicion)){
		$_SESSION['competicion'] = $competicion;
		$set_correcto = true;
	} else { $mensajes = 'La competicion indicada no existe.'; }
	return $set_correcto;
}

function GetCompeticionesUsuario($id_usuario){
	$competiciones_usuario = array();
	$db = new dbConnection();
	
	if ($stmt = $db->mysqli->prepare('SELECT c.id_competicion, c.nombre_competicion, c.abreviatura, c.titulo, c.subtitulo, c.reglas, c.fecha_inicio, c.fecha_fin, c.id_tipo_competicion 
	                                  FROM COMPETICION c JOIN USUARIO_COMPETICION uc ON uc.id_competicion = c.id_competicion WHERE uc.id_usuario = ? ORDER BY id_competicion')){
		$stmt->bind_param("i", $id_usuario);
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		while ($stmt->fetch()){
			$competiciones_usuario[] = new CCompeticion($rId, $rNombre, $rSiglas, $rTitulo, $rSubtitulo, $rReglas, $rFechaInicio, $rFechaFin, $rTipoCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $competiciones_usuario;
}


function GuardarCompeticion($id_competicion, $nombre_competicion, $siglas, $titulo, $subtitulo, $reglas, $fecha_inicio, $fecha_fin, $tipo_competicion, &$mensajes){
	$guardado_correcto = "";
	$competicion = new CCompeticion($id_competicion, $nombre_competicion, $siglas, $titulo, $subtitulo, $reglas, $fecha_inicio, $fecha_fin, $tipo_competicion);
	if ( !isset($id_competicion) ) { $guardado_correcto = InsertarCompeticion($competicion, $mensajes); }
	else { $guardado_correcto = ActualizarCompeticion($competicion, $mensajes); }
	return $guardado_correcto;
}

function InsertarCompeticion($competicion, &$mensajes){
    $insercion_correcta = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO `COMPETICION` (nombre_competicion, abreviatura, titulo, subtitulo, reglas, fecha_inicio, fecha_fin, id_tipo_competicion)
	         VALUES  (?, ?, ?, ?, ?, ?, ? ,?)";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($competicion->nombre_competicion, 0, 100);
		$abreviatura_acortada = substr($competicion->siglas, 0, 5);
		$titulo_acortado = substr($competicion->titulo, 0, 100);
		$subtitulo_acortado = substr($competicion->subtitulo, 0, 50);
		$stmt->bind_param("sssssssi", $nombre_acortado, $abreviatura_acortada, $titulo_acortado, $subtitulo_acortado, 
		                              $competicion->reglas, $competicion->fecha_inicio, $competicion->fecha_fin, $competicion->id_tipo_competicion);
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

function ActualizarCompeticion($competicion, &$mensajes){
    $actualizacion_correcta = false;
	$db = new dbConnection();
	$sql =  "UPDATE COMPETICION SET nombre_competicion = ?, abreviatura = ?, titulo = ?, subtitulo = ?, reglas = ?, 
	                                fecha_inicio = ?, fecha_fin = ?, id_tipo_competicion = ?
	         WHERE id_competicion = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($competicion->nombre_competicion, 0, 100);
		$abreviatura_acortada = substr($competicion->siglas, 0, 5);
		$titulo_acortado = substr($competicion->titulo, 0, 100);
		$subtitulo_acortado = substr($competicion->subtitulo, 0, 50);
		$stmt->bind_param("sssssssii", $nombre_acortado,	$abreviatura_acortada, $titulo_acortado, $subtitulo_acortado, $competicion->reglas, 
									  $competicion->fecha_inicio, $competicion->fecha_fin, $competicion->id_tipo_competicion, $competicion->id_competicion);
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

function BorrarCompeticion($id_competicion, &$mensajes){
    $borrado_correcto = false;
	$db = new dbConnection();
	
	//TODO: Descomentar tablas que aún no existen, comprobar si alguna otra tabla debe consultarse
	// Comprobar existencia de registros hijo
	$sql = "select grupos.cuantos + equipos.cuantos -- + jornadas.cuantos + usuarios.cuantos 
			from (	SELECT count(1) cuantos FROM GRUPO WHERE id_competicion = ?) grupos,
				 ( 	SELECT count(1) cuantos FROM EQUIPO_COMPETICION WHERE id_competicion = ?) equipos,
				 (  SELECT count(1) cuantos FROM JORNADA WHERE id_competicion = ?) jornadas/*,
				 ( 	SELECT count(1) cuantos FROM USUARIO_COMPETICION WHERE id_competicion = ?) usuarios*/";
	
	if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		//TODO: El bueno es el de abajo, no se puede poner hasta que no estén todas las tablas
		$stmtComprobacion->bind_param("iii", $id_competicion, $id_competicion, $id_competicion);
		//$stmtComprobacion->bind_param("iiii", $id_competicion,$id_competicion, $id_competicion,$id_competicion);
		
		$stmtComprobacion->execute();
		$stmtComprobacion->bind_result($rCuantos);
		if ($stmtComprobacion->fetch()){
			// Si no hay registros hijo, borrar
			if ($rCuantos > 0){ $mensajes = "La competicion tiene datos vinculados, limpie antes esos datos (grupos, equipos, jornadas, usuarios)."; }
		}
		$stmtComprobacion->close();
		
		if ($rCuantos == 0){
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM COMPETICION WHERE id_competicion = ?")){
				$stmtBorrado->bind_param("i", $id_competicion);
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

function GetGrupos(){
	$grupos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_grupo, nombre_grupo, id_competicion FROM GRUPO ORDER BY id_grupo')){
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rCompeticion);
		while ($stmt->fetch()){
			$grupos[] = new CGrupo($rId, $rNombre, $rCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $grupos;
}

function GetGruposCompeticion($id_competicion){
	$grupos = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_grupo, nombre_grupo, id_competicion FROM GRUPO WHERE id_competicion = ? ORDER BY id_grupo')){
		$stmt->bind_param("i", $id_competicion);
		$stmt->execute();
		$stmt->bind_result($rId, $rNombre, $rCompeticion);
		while ($stmt->fetch()){
			$grupos[] = new CGrupo($rId, $rNombre, $rCompeticion);
		}
		$stmt->close();
	}
	$db->close();
	return $grupos;
}

function GuardarGrupo($id_grupo, $nombre_grupo, $id_competicion, &$mensajes){
	$guardado_correcto = "";
	$grupo = new CGrupo($id_grupo, $nombre_grupo, $id_competicion);
	if ( !isset($id_grupo) ) { $guardado_correcto = InsertarGrupo($grupo, $mensajes); }
	else { $guardado_correcto = ActualizarGrupo($grupo, $mensajes); }
	return $guardado_correcto;
}

function InsertarGrupo($grupo, &$mensajes){
    $insercion_correcta = false;
	$db = new dbConnection();
	$sql =  "INSERT INTO `GRUPO` (nombre_grupo, id_competicion) VALUES  (?, ?)";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($grupo->nombre_grupo, 0, 45);
		$stmt->bind_param("si", $nombre_acortado, $grupo->id_competicion);
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

function ActualizarGrupo($grupo, &$mensajes){
    $actualizacion_correcta = false;
	$db = new dbConnection();
	$sql =  "UPDATE GRUPO SET nombre_grupo = ?, id_competicion = ? WHERE id_grupo = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($grupo->nombre_grupo, 0, 45);
		$stmt->bind_param("sii", $nombre_acortado, $grupo->id_competicion, $grupo->id_grupo);
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

function BorrarGrupo($id_grupo, &$mensajes){
    $borrado_correcto = false;
	$db = new dbConnection();
	
	//TODO: Descomentar tablas que aún no existen, comprobar si alguna otra tabla debe consultarse
	// Comprobar existencia de registros hijo
	$sql = "select equipos.cuantos -- + partidos.cuantos
			from ( 	SELECT count(1) cuantos FROM EQUIPO_COMPETICION WHERE id_grupo = ?) equipos/*,
				 ( 	SELECT count(1) cuantos FROM PARTIDO WHERE id_grupo = ?) partidos*/";
	
	if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		//TODO: El bueno es el de abajo, no se puede poner hasta que no estén todas las tablas
		$stmtComprobacion->bind_param("i", $id_grupo);
		//$stmtComprobacion->bind_param("ii", $id_grupo,$id_grupo);
		
		$stmtComprobacion->execute();
		$stmtComprobacion->bind_result($rCuantos);
		if ($stmtComprobacion->fetch()){
			// Si no hay registros hijo, borrar
			if ($rCuantos > 0){ $mensajes = "El grupo tiene datos vinculados, limpie antes esos datos (equipos, partidos)."; }
		}
		$stmtComprobacion->close();
		
		if ($rCuantos == 0){
			if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM GRUPO WHERE id_grupo = ?")){
				$stmtBorrado->bind_param("i", $id_grupo);
				$stmtBorrado->execute();
				if ($db->mysqli->affected_rows >= 0){
					$mensajes = "Borrado correcto";
					$borrado_correcto = true;
				} else {
					$mensajes = "Error al borrar: ".$db->mysqli->error;
				}
				$stmtBorrado->close();
			} else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
		}
	} else { $mensajes = "Error al comprobar si existen datos vinculados."; }

	$db->close();
	return $borrado_correcto;
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetCompeticiones': 
			$aResult['result'] = GetCompeticiones();
			break;
			
		case 'GetCompeticionSeleccionada':
			$aResult['result'] = GetCompeticionSeleccionada();
			break;
			
		case 'SetCompeticionSeleccionada':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (SetCompeticionSeleccionada($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;
			
		case 'GetCompeticionesUsuario':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_usuario) ){  $aResult['result'] = GetCompeticionesUsuario($arguments->id_usuario); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		case 'GuardarCompeticion':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				 $arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->nombre) && isset($arguments->siglas) && isset($arguments->titulo) && isset($arguments->subtitulo) && 
				    isset($arguments->reglas) && isset($arguments->inicio) && isset($arguments->fin) && isset($arguments->tipo_competicion) ){
					if (GuardarCompeticion($arguments->id, $arguments->nombre, $arguments->siglas, $arguments->titulo, $arguments->subtitulo, 
					                       $arguments->reglas, $arguments->inicio, $arguments->fin, $arguments->tipo_competicion, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarCompeticion': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarCompeticion($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'GetGrupos':
			$aResult['result'] = GetGrupos();
			break;
			
		case 'GetGruposCompeticion':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){  $aResult['result'] = GetGruposCompeticion($arguments->id); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
		
		case 'GuardarGrupo':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				 $arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->nombre) && isset($arguments->id_competicion) ){
					if (GuardarGrupo($arguments->id, $arguments->nombre, $arguments->id_competicion, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarGrupo': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarGrupo($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
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