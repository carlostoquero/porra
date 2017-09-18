<?php
include_once ("../controller/ServicioTipos.php");
include_once ("../controller/ServicioCompeticiones.php");
include_once ("../controller/ServicioEquipos.php");
include_once ("../controller/ServicioEstadios.php");
include_once ("../controller/ServicioJornadas.php");
include_once ("../controller/ServicioUsuarios.php");
include_once ("../controller/ServicioClasificaciones.php");


if (session_id() == '') {
    session_start();
}

header('Content-Type: application/json');
$aResult = array();

if( !isset($_GET['function_name']) ) { $aResult['error'] = 'No function name!'; }
if( !isset($aResult['error']) ) {

	switch($_GET['function_name']) {

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE TIPOS
		////////////////////////////////////////////////////////////////////////////////////////////////
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
	
		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE COMPETICIONES
		////////////////////////////////////////////////////////////////////////////////////////////////
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

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE GRUPOS
		////////////////////////////////////////////////////////////////////////////////////////////////
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

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE EQUIPOS
		////////////////////////////////////////////////////////////////////////////////////////////////
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

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE COMPETICION - EQUIPO
		////////////////////////////////////////////////////////////////////////////////////////////////
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
			
		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE ESTADIOS
		////////////////////////////////////////////////////////////////////////////////////////////////
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
			
		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE USUARIOS
		////////////////////////////////////////////////////////////////////////////////////////////////
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
			
		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE JORNADAS
		////////////////////////////////////////////////////////////////////////////////////////////////
		case 'GetJornadas': 
			$aResult['result'] = GetJornadas();
			break;
			
		case 'GetJornadasCompeticion': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetJornadasCompeticion($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetJornadaActual':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetJornadaActual($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
			
		case 'GuardarJornada':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->inicio) && isset($arguments->fin) && isset($arguments->numero) && isset($arguments->nombre) && 
				    isset($arguments->nombre_corto) && isset($arguments->tipo_jornada) && isset($arguments->competicion) ){
					if (GuardarJornada($arguments->id, $arguments->inicio, $arguments->fin, $arguments->numero, $arguments->nombre, 
					                   $arguments->nombre_corto, $arguments->tipo_jornada, $arguments->competicion, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarJornada': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarJornada($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE PARTIDOS
		////////////////////////////////////////////////////////////////////////////////////////////////
		case 'GetPartidos':
			$aResult['result'] = GetPartidos();
			break;
			
		case 'GetPartidosJornada':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){  $aResult['result'] = GetPartidosJornada($arguments->id); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;
		
		case 'GuardarPartido':
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else{
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->equipo_1) && isset($arguments->equipo_2) && isset($arguments->estadio) && isset($arguments->fecha_hora) && isset($arguments->jornada)){
					$aResult['result'] = "ok";
					if (GuardarPartido($arguments->id, $arguments->equipo_1, $arguments->equipo_2, $arguments->estadio, $arguments->grupo,
					                   $arguments->fecha_hora, $arguments->jornada, $aResult['messages'])){
						$aResult['result'] = "ok";
					} else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			}
			break;

		case 'BorrarPartido': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id) ){ 
					if (BorrarPartido($arguments->id, $aResult['messages']) ){ $aResult['result'] = "ok"; }
					else { $aResult['result'] = "error"; }
				} else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		////////////////////////////////////////////////////////////////////////////////////////////////
		// FUNCIONES DE CLASIFICACIONES
		////////////////////////////////////////////////////////////////////////////////////////////////
		case 'GetClasificacionLigaEquipos': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetClasificacionLigaEquipos($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		case 'GetClasificacionCopaEquipos': 
			if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			else {
				$arguments = json_decode($_GET['arguments']);
				if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetClasificacionCopaEquipos($arguments->id_competicion); } 
				else { $aResult['error'] = 'Wrong arguments!'; }
			 }
			break;

		// case 'GetClasificacionUsuarios': 
			// if( !isset($_GET['arguments']) ) { $aResult['error'] = 'No arguments!'; }
			// else {
				// $arguments = json_decode($_GET['arguments']);
				// if ( isset($arguments->id_competicion) ){  $aResult['result'] = GetClasificacionUsuarios($arguments->id_competicion); } 
				// else { $aResult['error'] = 'Wrong arguments!'; }
			 // }
			// break;

		default:
		   $aResult['error'] = 'Not found function '.$_POST['function_name'].'!';
		   break;
	}
}
echo json_encode($aResult);
?>