<?php
include_once ("../model/dbConnection.php");
include_once ("../model/Usuario.php");

if (session_id() == '') {
    session_start();
}

function GetUsuarios(){
	$usuarios = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_usuario, login, nombre, apellidos, comentarios, email, id_estado, id_acceso
									  FROM USUARIO ORDER BY id_usuario')){
		$stmt->execute();
		$stmt->bind_result($rId, $rLogin, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso);
		while ($stmt->fetch()){
			// Password no se debe devolver en este caso de uso
			$usuarios[] = new CUsuario($rId, $rLogin, null, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso); // Password no se debe devolver en este caso de uso
		}
		$stmt->close();
	}
	$db->close();
	return $usuarios;
}

function GetUsuario($id_usuario){
	$usuario = null;
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_usuario, login, nombre, apellidos, comentarios, email, id_estado, id_acceso
									  FROM USUARIO WHERE id_usuario = ? ORDER BY id_usuario')){
		$stmt->bind_param("i", $id_usuario);						  
		$stmt->execute();
		$stmt->bind_result($rId, $rLogin, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso);
		if ($stmt->fetch()){
			// Password no se debe devolver en este caso de uso
			$usuario = new CUsuario($rId, $rLogin, null, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso); // Password no se debe devolver en este caso de uso
		}
		$stmt->close();
	}
	$db->close();
	return $usuario;
}

function GetUsuariosCompeticion($id_competicion){
	$usuarios = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT U.id_usuario, U.login, U.nombre, U.apellidos, U.comentarios, U.email, U.id_estado, U.id_acceso
									  FROM USUARIO U JOIN USUARIO_COMPETICION UC ON UC.id_usuario = U.id_usuario
									  WHERE UC.id_competicion = ? ORDER BY id_usuario')){
		$stmt->bind_param("i", $id_competicion);
		$stmt->execute();
		$stmt->bind_result($rId, $rLogin, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso);
		while ($stmt->fetch()){
			// Password no se debe devolver en este caso de uso
			$usuarios[] = new CUsuario($rId, $rLogin, null, $rNombre, $rApellidos, $rComentarios, $rEmail, $rEstado, $rAcceso); // Password no se debe devolver en este caso de uso
		}
		$stmt->close();
	}
	$db->close();
	return $usuarios;
}

function Login($login, $password){
	$correctUser = false;
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_usuario, login, id_estado, id_acceso FROM USUARIO WHERE login = ? AND password = ?')){
		$md5 = md5($password);
		$stmt->bind_param("ss", $login, $md5);
		$stmt->execute();
		$stmt->bind_result($rId, $rLogin, $rEstado, $rAcceso);
		if ($stmt->fetch()){
			$usuario = new CUsuario($rId, $rLogin, null, null, null, null, null, $rEstado, $rAcceso); // Password no se debe devolver en este caso de uso
			$correctUser = true;
			$_SESSION['usuario'] = $usuario;
		} 
		$stmt->close();
	} else { $mensajes = "Consulta incorrecta: ".$db->mysqli->error; }
	$db->close();
	return $correctUser;
}

function GetUsuarioConectado(){
	$usuario = null;
	if (isset($_SESSION['usuario'])){ $usuario = $_SESSION['usuario']; }
	return $usuario;
}

// function InsertarUsuario($login, $password, $nombre, $apellidos, $comentarios, $email, &$mensajes){
    // $insercion_correcta = false;
	// $db = new dbConnection();
	// $sql = "INSERT INTO USUARIOS (login, password, nombre, apellidos, comentarios, email, id_estado, id_acceso) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    
    // if ($stmt = $db->mysqli->prepare($sql)){
		// $login_acortado = substr($login, 0, 15);
		// $md5 = md5($password);
		// $nombre_acortado = substr($nombre, 0, 20);
		// $apellidos_acortado = substr($nombre, 0, 50);
		// $comentarios_acortados = substr($comentarios, 0, 200);
		// $email_acortado = substr($email, 0, 50);
		// // Por defecto, se crea con estado PENDIENTE (0) y acceso USUARIO (1)
		// $stmt->bind_param("ssssssiii", $login_acortado, $md5, $nombre_acortado, $apellidos_acortado, $comentarios_acortados, $email_acortado, 0, 1);
		// $stmt->execute();
		// if ($db->mysqli->affected_rows >= 0) {
			// $mensajes = "Inserción correcta";
			// $insercion_correcta = true;
		// } else { $mensajes = "Error al insertar: ".$db->mysqli->error; }
		// $stmt->close();
	// } else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	// $db->close();
	// return $insercion_correcta;
// }

// function ActualizarUsuario($id_usuario, $password, $nombre, $apellidos, $comentarios, $email, &$mensajes){
    // $actualizacion_correcta = false;
	// $db = new dbConnection();
	// $sql =  "UPDATE USUARIO SET ".(isset($password) ? 'password = ? ,' : '')."nombre = ?, apellidos = ?, comentarios = ?, email = ?
	         // WHERE id_usuario = ?";
    
    // if ($stmt = $db->mysqli->prepare($sql)){
		// $nombre_acortado = substr($nombre, 0, 20);
		// $apellidos_acortado = substr($nombre, 0, 50);
		// $comentarios_acortados = substr($comentarios, 0, 200);
		// $email_acortado = substr($email, 0, 50);
		
		// if (isset($password)){
			// $md5 = md5($password);
			// $stmt->bind_param("sssssi", $md5, $nombre_acortado, $apellidos_acortado, $comentarios_acortados, $email_acortado, $id_usuario);
		// } else {
			// $stmt->bind_param("ssssi", $nombre_acortado, $apellidos_acortado, $comentarios_acortados, $email_acortado, $id_usuario);
		// }			

		// $stmt->execute();
		// if ($db->mysqli->affected_rows >= 0){
			// $mensajes = "Actualización correcta";
			// $actualizacion_correcta = true;
		// } else { $mensajes = "Error al actualizar: ".$db->mysqli->error; }
		// $stmt->close();
	// } else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	// $db->close();
	// return $actualizacion_correcta;
// }

// function ActualizarUsuarioByAdmin($id_usuario, $estado, $acceso, $competiciones){
	
// }

// // function GetPartidos(){
	// // $partidos = array();
	// // $db = new dbConnection();
	// // if ($stmt = $db->mysqli->prepare('SELECT id_partido, fecha_hora, id_equipo_1, id_equipo_2, id_estadio, id_grupo, id_jornada, goles_equipo_1, goles_equipo_2
	                                  // // FROM PARTIDO ORDER BY id_partido')){
		// // $stmt->execute();
		// // $stmt->bind_result($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		// // while ($stmt->fetch()){
			// // $partidos[] = new CPartido($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		// // }
		// // $stmt->close();
	// // }
	// // $db->close();
	// // return $partidos;
// // }

// // function GetPartidosJornada($id_jornada){
	// // $partidos = array();
	// // $db = new dbConnection();
	// // if ($stmt = $db->mysqli->prepare('SELECT id_partido, fecha_hora, id_equipo_1, id_equipo_2, id_estadio, id_grupo, id_jornada, goles_equipo_1, goles_equipo_2
	                                  // // FROM PARTIDO WHERE id_jornada = ? ORDER BY id_partido')){
		// // $stmt->bind_param("i", $id_jornada);
		// // $stmt->execute();
		// // $stmt->bind_result($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		// // while ($stmt->fetch()){
			// // $partidos[] = new CPartido($rId, $rFecha, $rEquipo1, $rEquipo2, $rEstadio, $rGrupo, $rJornada, $rGoles1, $rGoles2);
		// // }
		// // $stmt->close();
	// // }
	// // $db->close();
	// // return $partidos;
// // }

// // function GuardarPartido($id_partido, $equipo_1, $equipo_2, $estadio, $grupo, $fecha_hora, $jornada, &$mensajes){
	// // $guardado_correcto = true;
	// // $partido = new CPartido($id_partido, $fecha_hora, $equipo_1, $equipo_2, $estadio, $grupo, $jornada, null, null);
	// // if ( !isset($id_partido) ) { $guardado_correcto = InsertarPartido($partido, $mensajes); }
	// // else { $guardado_correcto = ActualizarPartido($partido, $mensajes); }
	// // return $guardado_correcto;
// // }

// // function InsertarPartido($partido, &$mensajes){
    // // $insercion_correcta = false;
	// // $db = new dbConnection();
	// // $sql =  "INSERT INTO PARTIDO (id_equipo_1, id_equipo_2, id_estadio, ".(isset($partido->id_grupo) ? "id_grupo, " : "")."fecha_hora, id_jornada) 
	         // // VALUES  (?, ?, ?, ".(isset($partido->id_grupo) ? "?, " : "")."?, ?)";
    
    // // if ($stmt = $db->mysqli->prepare($sql)){
		// // if (isset($partido->id_grupo)) $stmt->bind_param("iiiisi", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->id_grupo, 
		                                                           // // $partido->fecha_hora, $partido->id_jornada);
		// // else $stmt->bind_param("iiisi", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->fecha_hora, $partido->id_jornada);
		
		// // $stmt->execute();
		// // if ($db->mysqli->affected_rows >= 0) {
			// // $mensajes = "Inserción correcta";
			// // $insercion_correcta = true;
		// // } else {
			// // $mensajes = "Error al insertar: ".$db->mysqli->error;
		// // }
		// // $stmt->close();
	// // } else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	// // $db->close();
	// // return $insercion_correcta;
// // }

// // function ActualizarPartido($partido, &$mensajes){
    // // $actualizacion_correcta = false;
	// // $db = new dbConnection();
	// // $sql =  "UPDATE PARTIDO SET id_equipo_1 = ?, id_equipo_2 = ?, id_estadio = ?, id_grupo = ".(isset($partido->id_grupo) ? "?" : "null").", fecha_hora = ?, id_jornada = ? 
	         // // WHERE id_partido = ?";
    
    // // if ($stmt = $db->mysqli->prepare($sql)){
		// // if (isset($partido->id_grupo)) $stmt->bind_param("iiiisii", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->id_grupo, 
		                                                            // // $partido->fecha_hora, $partido->id_jornada, $partido->id_partido);
		// // else $stmt->bind_param("iiisii", $partido->id_equipo_1, $partido->id_equipo_2, $partido->id_estadio, $partido->fecha_hora, $partido->id_jornada, $partido->id_partido);
		// // $stmt->execute();
		// // if ($db->mysqli->affected_rows >= 0){
			// // $mensajes = "Actualización correcta";
			// // $actualizacion_correcta = true;
		// // } else {
			// // $mensajes = "Error al actualizar: ".$db->mysqli->error;
		// // }
		// // $stmt->close();
	// // } else { $mensajes = "Datos recibidos incorrectos: ".$db->mysqli->error; }
	// // $db->close();
	// // return $actualizacion_correcta;
// // }

// // function BorrarPartido($id_partido, &$mensajes){
    // // $borrado_correcto = false;
	// // $db = new dbConnection();
	
	// // //TODO: Tabla no creada todavia
// // /*	// Comprobar existencia de registros hijo
	// // $sql = "SELECT count(1) cuantos FROM PRONOSTICO WHERE id_partido = ?";
	
	// // if ($stmtComprobacion = $db->mysqli->prepare($sql)){
		// // $stmtComprobacion->bind_param("i", $id_partido);
		
		// // $stmtComprobacion->execute();
		// // $stmtComprobacion->bind_result($rCuantos);
		// // if ($stmtComprobacion->fetch()){
			// // // Si no hay registros hijo, borrar
			// // if ($rCuantos > 0){ $mensajes = "El partido tiene datos vinculados, limpie antes esos datos (pronósticos)."; }
		// // }
		// // $stmtComprobacion->close();
		
		// // if ($rCuantos == 0){*/
			// // if ($stmtBorrado = $db->mysqli->prepare("DELETE FROM PARTIDO WHERE id_partido = ?")){
				// // $stmtBorrado->bind_param("i", $id_partido);
				// // $stmtBorrado->execute();
				// // if ($db->mysqli->affected_rows >= 0){
					// // $mensajes = "Borrado correcto";
					// // $borrado_correcto = true;
				// // } else {
					// // $mensajes = "Error al borrar: ".$db->mysqli->error;
				// // }
				// // $stmtBorrado->close();
			// // } else { $mensajes = "Error al borrar, sentencia incorrecta: ".$db->mysqli->error; }
		// // /*}
	// // } else { $mensajes = "Error al comprobar si existen datos vinculados."; }*/

	// // $db->close();
	// // return $borrado_correcto;
// // }

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {
		case 'GetUsuarios': 
			$aResult['result'] = GetUsuarios();
			break;
			
		case 'GetUsuario': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_usuario) ){  $aResult['result'] = GetUsuario($arguments->id_usuario); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetUsuariosCompeticion':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetUsuariosCompeticion($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		case 'GetUsuarioConectado': 
			$aResult['result'] = GetUsuarioConectado();
			break;

		case 'Login':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->login) && isset($arguments->password) ){  
					if (Login($arguments->login, $arguments->password)) { $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		// case 'InsertarUsuario':
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else{
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->login) && isset($arguments->password) && isset($arguments->nombre) && isset($arguments->apellidos) && isset($arguments->email) ){
					// if (InsertarUsuario($arguments->login, $arguments->password, $arguments->nombre, $arguments->apellidos, 
					                    // $arguments->comentarios, $arguments->email, $aResult['messages'])){
						// $aResult['result'] = "ok";
					// } else { $aResult['result'] = "error"; }
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			// }
			// break;

		// case 'ActualizarUsuario': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else {
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id_usuario) && isset($arguments->nombre) && isset($arguments->apellidos) && isset($arguments->email) ){ 
					// if (ActualizarUsuario($arguments->id_usuario, $arguments->password, $arguments->nombre, $arguments->apellidos, $arguments->comentarios,
					                      // $arguments->email, $aResult['messages']) ){ 
						// $aResult['result'] = "ok"; 
					// } else { $aResult['result'] = "error"; }
				// } else { $aResult['error'] = 'Wrong arguments!'; }
			 // }
			// break;

		// case 'ActualizarUsuarioByAdmin': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else {
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id_usuario) && isset($arguments->estado) && isset($arguments->acceso) && isset($arguments->competiciones) ){ 
					// if (ActualizarUsuarioByAdmin($arguments->id_usuario, $arguments->estado, $arguments->acceso, $arguments->competiciones, $aResult['messages']) ){ 
						// $aResult['result'] = "ok"; 
					// } else { $aResult['result'] = "error"; }
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