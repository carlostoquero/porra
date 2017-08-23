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

function Logout(){
	$_SESSION['usuario'] = null;
	return true;
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

function ActualizarUsuario($id_usuario, $password, $nombre, $apellidos, $comentarios, $email, &$mensajes){
    $actualizacion_correcta = false;
	$db = new dbConnection();
	$sql =  "UPDATE USUARIO SET ".(isset($password) ? 'password = ? ,' : '')."nombre = ?, apellidos = ?, comentarios = ?, email = ?
	         WHERE id_usuario = ?";
    
    if ($stmt = $db->mysqli->prepare($sql)){
		$nombre_acortado = substr($nombre, 0, 20);
		$apellidos_acortado = substr($apellidos, 0, 50);
		$comentarios_acortados = substr($comentarios, 0, 200);
		$email_acortado = substr($email, 0, 50);
		
		if (isset($password)){
			$md5 = md5($password);
			$stmt->bind_param("sssssi", $md5, $nombre_acortado, $apellidos_acortado, $comentarios_acortados, $email_acortado, $id_usuario);
		} else {
			$stmt->bind_param("ssssi", $nombre_acortado, $apellidos_acortado, $comentarios_acortados, $email_acortado, $id_usuario);
		}			

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

// function ActualizarUsuarioByAdmin($id_usuario, $estado, $acceso, $competiciones){
	
// }

function GetCompeticionesUsuarios(){
	$competiciones_usuarios = array();
	$db = new dbConnection();
	if ($stmt = $db->mysqli->prepare('SELECT id_usuario, id_competicion, pagado FROM USUARIO_COMPETICION ORDER BY id_usuario, id_competicion')){
		$stmt->execute();
		$stmt->bind_result($rIdUsuario, $rIdCompeticion, $rPagado);
		while ($stmt->fetch()){
			$competiciones_usuarios[] = new CCompeticionUsuario($rIdUsuario, $rIdCompeticion, $rPagado);
		}
		$stmt->close();
	}
	$db->close();
	return $competiciones_usuarios;
}

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

		case 'Logout': 
			if (Logout()) $aResult['result'] = "ok";
			else $aResult['result'] = "error";
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

		case 'ActualizarUsuario': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) && isset($arguments->nombre) && isset($arguments->apellidos) && isset($arguments->email) ){ 
					if (ActualizarUsuario($arguments->id, $arguments->password, $arguments->nombre, $arguments->apellidos, $arguments->comentarios,
					                      $arguments->email, $aResult['messages']) ){ 
						$aResult['result'] = "ok"; 
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

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

		case 'GetCompeticionesUsuarios':
			$aResult['result'] = GetCompeticionesUsuarios();
			break;
			
		default:
		   $aResult['error'] = 'Not found function '.$_POST['function_name'].'!';
		   break;
	}
}
echo json_encode($aResult);
?>