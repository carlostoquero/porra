var TRABAJANDO_EN_LOCAL = true;

function generarMenu() {
	var mainMenu = $('<ul class="nav navbar-nav">');
	mainMenu.append('<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="fa fa-trophy user"></span>Competici&oacute;n</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./comp_resultados.html"><span class="fa fa-futbol-o user"></span>Resultados</a></li>' + 
							'<li><a href="./comp_clasificacion.html"><span class="fa fa-sort-numeric-asc user"></span>Clasificaci&oacute;n</a></li>' + 
							'<li><a href="./comp_cargar.html"><span class="fa fa-plus user"></span>Cargar</a></li>' + 
							'<li><a href="./comp_cambiar.html"><span class="fa fa-exchange user"></span>Cambiar competicion</a></li>' +
						'</ul>' + 
					'</li>' + 
					'<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="fa fa-pencil user"></span>Pron&oacute;sticos</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./pron_cargar.html"><span class="fa fa-check user"></span>Cargar</a></li>' + 
							'<li><a href="./pron_ver.html"><span class="fa fa-search user"></span>Ver</a></li>' + 
							'<li><a href="./pron_clasificacion.html"><span class="fa fa-sort-amount-desc user"></span>Clasificaci&oacute;n</a></li>' + 
						'</ul>' + 
					'</li>' + 
					'<li><a href="./reglas.html"><span class="fa fa-info user"></span>Reglas</a></li>' +
					'<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#"><span class="fa fa-cog user"></span>Administraci&oacute;n</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./adm_competiciones.html"><span class="fa fa-trophy user"></span>Competiciones</a></li>' + 
							'<li><a href="./adm_equipos.html"><span class="fa fa-shield user"></span>Equipos</a></li>' + 
							'<li><a href="./adm_estadios.html"><span class="fa fa-flag user"></span>Estadios</a></li>' + 
							'<li><a href="./adm_jornadas.html"><span class="fa fa-calendar user"></span>Jornadas</a></li>' + 
							'<li><a href="./adm_usuarios.html"><span class="fa fa-users user"></span>Usuarios</a></li>' + 
						'</ul>' + 
					'</li>');
	
	var actions = $('<ul class="nav navbar-nav navbar-user">');
	actions.append('<li><a href="./gest_editar.html"><span class="fa fa-user user"></span>Perfil</a></li>' + 
				   '<li><a href="./logout.html"><span class="fa fa-close user"></span>Salir</a></li>'+ 
					'</ul>');

	$('.menu-div').append(mainMenu);
	$('.menu-div').append(actions);
}

function generarFooter() {
	$('.footer-div').append('<span class="copyright">2017 - La Web de la Porra</span>');
}

function findElementByField(element_array, field_name, field_value){
	var found_element = null;
	var matching_elements = $.grep(element_array, function(element, index){
		return element.hasOwnProperty(field_name) ? element[field_name] === field_value : false;
	});
	found_element = matching_elements !== null && matching_elements.length === 1 ? matching_elements[0] : null;
	return found_element;
}

function usuarioConectado(checkAdmin){
	var usuario_conectado = null;
	if (TRABAJANDO_EN_LOCAL){
		usuario_conectado = {id_usuario: 8, login: "usuario", id_estado: 1, id_acceso: 2};
	} else {
		usuario_conectado = getAjaxSync('ServicioUsuarios', 'GetUsuarioConectado');
		if (usuario_conectado === null) location.href = './login.html';
	
		// Comprobación de acceso de administrador para determinadas páginas
		if (checkAdmin && usuario_conectado.id_acceso != 2) location.href = './reglas.html'; 
	}
	
	return usuario_conectado;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTiposCompeticion(){
	var tipos_competicion = null;
	if (TRABAJANDO_EN_LOCAL){
		tipos_competicion = getTiposCompeticionMockup();
	} else {
		tipos_competicion = getAjaxSync('ServicioTipos', 'GetTiposCompeticion');
	}
	return tipos_competicion;
}
function getTiposJornada(){
	var tipos_jornada = null;
	if (TRABAJANDO_EN_LOCAL){
		tipos_jornada = getTiposJornadaMockup();
	} else {
		tipos_jornada = getAjaxSync('ServicioTipos', 'GetTiposJornada');
	}
	return tipos_jornada;
}
function getAccesosUsuario() {
	var accesos_usuario = null;
	if (TRABAJANDO_EN_LOCAL){
		accesos_usuario = getAccesosUsuarioMockup();
	} else {
		accesos_usuario = getAjaxSync('ServicioTipos', 'GetAccesos');
	}
	return accesos_usuario;
}
function getEstadosUsuario(){
	var estados_usuario = null;
	if (TRABAJANDO_EN_LOCAL){
		estados_usuario = getEstadosUsuarioMockup();
	} else {
		estados_usuario = getAjaxSync('ServicioTipos', 'GetEstados');
	}
	return estados_usuario;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIN INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCompeticiones(){
	var competiciones = null;
	if (TRABAJANDO_EN_LOCAL) {
		competiciones = getCompeticionesMockup();
	} else {
		competiciones = getAjaxSync('ServicioCompeticiones', 'GetCompeticiones');
	}
	return competiciones;
}

function getGrupos(){
	var grupos = null;
	if (TRABAJANDO_EN_LOCAL) {
		grupos = getGruposMockup();
	} else {
		grupos = getAjaxSync('ServicioCompeticiones', 'GetGrupos');
	}
	return grupos;
}

function getGruposCompeticion(id_competicion){
	var grupos_competicion = null;
	if (TRABAJANDO_EN_LOCAL) {
		grupos_competicion = getGruposCompeticionMockup(id_competicion);
	} else {
		grupos_competicion = getAjaxSync('ServicioCompeticiones', 'GetGruposCompeticion', JSON.stringify({id: id_competicion}));
	}
	return grupos_competicion;
}

function getCompeticionesEquipo(id_equipo){
	var competiciones_equipo = null;
	if (TRABAJANDO_EN_LOCAL) {
		competiciones_equipo = getCompeticionesEquipoMockup(id_equipo);
	} else {
		competiciones_equipo = getAjaxSync('ServicioEquipos', 'GetCompeticionesEquipo', JSON.stringify({id: id_equipo}));
	}
	return competiciones_equipo;
}

function getCompeticionesUsuarios(){
	var competiciones_usuarios = null;
	if (TRABAJANDO_EN_LOCAL) {
		competiciones_usuarios = getCompeticionesUsuariosMockup();
	} else {
		competiciones_usuarios = getAjaxSync('ServicioUsuarios', 'GetCompeticionesUsuarios');
	}
	return competiciones_usuarios;
}

function getCompeticionesUsuario(id_usuario){
	var competiciones_usuario = null;
	if (TRABAJANDO_EN_LOCAL) {
		competiciones_usuario = getCompeticionesUsuarioMockup(id_usuario);
	} else {
		competiciones_usuario = getAjaxSync('ServicioCompeticiones', 'GetCompeticionesUsuario', JSON.stringify({id_usuario: id_usuario}));
	}
	return competiciones_usuario;
}

function getEquipos(){
	var equipos = null;
	if (TRABAJANDO_EN_LOCAL) {
		equipos = getEquiposMockup();
	} else {
		equipos = getAjaxSync('ServicioEquipos', 'GetEquipos');
	}
	return equipos;
}

function getEquiposCompeticion(id_competicion){
	var equipos_competicion = null;
	if (TRABAJANDO_EN_LOCAL) {
		equipos_competicion = getEquiposCompeticionMockup(id_competicion);
	} else {
		equipos_competicion = getAjaxSync('ServicioEquipos', 'GetEquiposByCompeticion', JSON.stringify({id: id_competicion}));
	}
	return equipos_competicion;
}

function getEquiposGrupo(id_grupo){
	var equipos_grupo = null;
	if (TRABAJANDO_EN_LOCAL) {
		equipos_grupo = getEquiposGrupoMockup(id_grupo);
	} else {
		equipos_grupo = getAjaxSync('ServicioEquipos', 'GetEquiposByGrupo', JSON.stringify({id_grupo: id_grupo}));
	}
	return equipos_grupo;
}

function getEstadios(){
	var estadios = null;
	if (TRABAJANDO_EN_LOCAL) {
		estadios = getEstadiosMockup();
	} else {
		estadios = getAjaxSync('ServicioEstadios', 'GetEstadios');
	}
	return estadios;
}

function getJornadas(){
	var jornadas = null;
	if (TRABAJANDO_EN_LOCAL) {
		jornadas = getJornadasMockup();
	} else {
		jornadas = getAjaxSync('ServicioJornadas', 'GetJornadas');
	}
	return jornadas;
}

function getJornadasCompeticion(id_competicion){
	var jornadas_competicion = null;
	if (TRABAJANDO_EN_LOCAL) {
		jornadas_competicion = getJornadasCompeticionMockup(id_competicion);
	} else {
		jornadas_competicion = getAjaxSync('ServicioJornadas', 'GetJornadasCompeticion', JSON.stringify({id_competicion: id_competicion}));
	}
	return jornadas_competicion;
}

function getPartidosJornada(id_jornada){
	var partidos_jornada = null;
	if (TRABAJANDO_EN_LOCAL) {
		partidos_jornada = getPartidosJornadaMockup(id_jornada);
	} else {
		partidos_jornada = getAjaxSync('ServicioJornadas', 'GetPartidosJornada', JSON.stringify({id: id_jornada}));
	}
	return partidos_jornada;
}

function getUsuarios(){
	var usuarios = null;
	if (TRABAJANDO_EN_LOCAL) {
		usuarios = getUsuariosMockup();
	} else {
		usuarios = getAjaxSync('ServicioUsuarios', 'GetUsuarios');
	}
	return usuarios;
}

function getUsuario(id_usuario){
	var usuario = null;
	if (TRABAJANDO_EN_LOCAL) {
		usuario = getUsuarioMockup(id_usuario);
	} else {
		usuario = getAjaxSync('ServicioUsuarios', 'GetUsuario', JSON.stringify({id_usuario: id_usuario}));
	}
	return usuario;
}

function getUsuariosCompeticion(id_competicion){
	var usuarios_competicion = null;
	if (TRABAJANDO_EN_LOCAL) {
		usuarios_competicion = getUsuariosCompeticionMockup(id_competicion);
	} else {
		usuarios_competicion = getAjaxSync('ServicioUsuarios', 'GetUsuariosCompeticion', JSON.stringify({id_competicion: id_competicion}));
	}
	return usuarios_competicion;
}

function getPronosticos(id_jornada){
	var pronosticos = null;
	if (TRABAJANDO_EN_LOCAL){
		pronosticos = getPronosticosMockup(id_jornada);
	} else {
		pronosticos = getAjaxSync('ServicioPronosticos', 'GetPronosticosJornada', JSON.stringify({id_jornada: id_jornada}));
	}
	return pronosticos;
}

function getClasificacionEquipos(){
	var clasificacion_equipos = null;
	if (TRABAJANDO_EN_LOCAL){
		clasificacion_equipos = getClasificacionEquiposMockup();
	} else {
		clasificacion_equipos = getAjaxSync('ServicioJornadas', 'GetClasificacion');
	}
	return clasificacion_equipos;
}

function getClasificacionUsuarios(){
	var puntos = null;
	if (TRABAJANDO_EN_LOCAL){
		puntos = getClasificacionUsuariosMockup();
	} else {
		puntos = getAjaxSync('ServicioPronosticos', 'GetPuntosUsuarios');
	}
	return puntos;
}

function getCompeticionSeleccionada(){
	var competicion_seleccionada = null;
	if (TRABAJANDO_EN_LOCAL){
		competicion_seleccionada = getCompeticionSeleccionadaMockup();
	} else {
		competicion_seleccionada = getAjaxSync('ServicioCompeticiones', 'GetCompeticionSeleccionada');
	}
	return competicion_seleccionada;
}
function getJornadaActual(){
	return 1;
}

function getAjaxSync(servicio, funcion, argumentos){
	var resultado = null;
	
	var requestData = { function_name: funcion };
	if (argumentos !== null) requestData.arguments = argumentos;
	
	jQuery.ajax({
		type: "GET",
		url: '../controller/' + servicio + '.php',
		async: false,
		dataType: 'json',
		data: requestData,

		success: function (obj, textstatus) {
					  if( 'error' in obj ) {
						  console.log(obj.error);
					  } else{
						  if ('messages' in obj && obj.messages !== null){
							alert(obj.messages);
						  }
						  resultado = obj.result;
					  }
				}
	});
	return resultado;

}