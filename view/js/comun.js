function generarMenu() {
	var mainMenu = $('<ul class="nav navbar-nav">');
	mainMenu.append('<li><a href="./reglas.html">Reglas</a></li>' + 
					'<li class="dropdown"><a href="#">Competici&oacute;n</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./comp_resultados.html">Resultados</a></li>' + 
							'<li><a href="./comp_clasificacion.html">Clasificaci&oacute;n</a></li>' + 
							'<li><a href="./comp_cargar.html">Cargar</a></li>' + 
						'</ul>' + 
					'</li>' + 
					'<li class="dropdown"><a href="#">Pron&oacute;sticos</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./pron_cargar.html">Cargar</a></li>' + 
							'<li><a href="./pron_ver.html">Ver</a></li>' + 
							'<li><a href="./pron_clasificacion.html">Clasificacion</a></li>' + 
						'</ul>' + 
					'</li>' + 
					'<li class="dropdown"><a href="#">Administraci&oacute;n</a>' + 
						'<ul class="dropdown-menu">' + 
							'<li><a href="./adm_competiciones.html">Competiciones</a></li>' + 
							'<li><a href="./adm_equipos.html">Equipos</a></li>' + 
							'<li><a href="./adm_estadios.html">Estadios</a></li>' + 
							'<li><a href="./adm_jornadas.html">Jornadas</a></li>' + 
							'<li><a href="./adm_usuarios.html">Usuarios</a></li>' + 
						'</ul>' + 
					'</li>');
	
	var actions = $('<ul class="nav navbar-nav">');
	actions.append('<li><a href="./gest_editar.html">Editar perfil</a></li>' + 
				   '<li><a href="./comp_cambiar.html">Cambiar competicion</a></li>' + 
				   '<li><a href="./logout.html">Salir</a></li>'+ 
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
	var usuario_conectado = getAjaxSync('ServicioUsuarios', 'GetUsuarioConectado');
	if (usuario_conectado === null) location.href = './login.html';
	
	// Comprobación de acceso de administrador para determinadas páginas
	if (checkAdmin && usuario_conectado.id_acceso != 2) location.href = './reglas.html'; 
	
	return usuario_conectado;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTiposCompeticion(){
	var tipos_competicion = getAjaxSync('ServicioTipos', 'GetTiposCompeticion');
	return tipos_competicion;
}
function getTiposJornada(){
	var tipos_jornada = getAjaxSync('ServicioTipos', 'GetTiposJornada');
	return tipos_jornada;
}
function getAccesosUsuario() {
	var accesos_usuario = getAjaxSync('ServicioTipos', 'GetAccesos');
	return accesos_usuario;
}
function getEstadosUsuario(){
	var estados_usuario = getAjaxSync('ServicioTipos', 'GetEstados');
	return estados_usuario;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIN INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCompeticiones(){
	var competiciones = getAjaxSync('ServicioCompeticiones', 'GetCompeticiones');
	return competiciones;
}

function getGrupos(){
	var grupos = getAjaxSync('ServicioCompeticiones', 'GetGrupos');
	return grupos;
}

function getGruposCompeticion(id_competicion){
	var grupos_competicion = getAjaxSync('ServicioCompeticiones', 'GetGruposCompeticion', JSON.stringify({id: id_competicion}));
	return grupos_competicion;
}

function getCompeticionesEquipo(id_equipo){
	var competiciones_equipo = getAjaxSync('ServicioEquipos', 'GetCompeticionesEquipo', JSON.stringify({id: id_equipo}));
	return competiciones_equipo;
}

function getCompeticionesUsuario(id_usuario){
	var competiciones_usuario = getCompeticionesMockup();
	$.each(competiciones_usuario, function(item, competicion){
		competicion.id_usuario = id_usuario;
	});
	return competiciones_usuario;
}

function getEquipos(){
	var equipos = getAjaxSync('ServicioEquipos', 'GetEquipos');
	return equipos;
}

function getEquiposCompeticion(id_competicion){
	var equipos_competicion = getAjaxSync('ServicioEquipos', 'GetEquiposByCompeticion', JSON.stringify({id: id_competicion}));
	return equipos_competicion;
}

function getEquiposGrupo(id_grupo){
	var equipos_grupo = getAjaxSync('ServicioEquipos', 'GetEquiposByGrupo', JSON.stringify({id_grupo: id_grupo}));
	return equipos_grupo;
}

function getEstadios(){
	var estadios = getAjaxSync('ServicioEstadios', 'GetEstadios');
	return estadios;
}

function getJornadas(){
	var jornadas = getAjaxSync('ServicioJornadas', 'GetJornadas');
	return jornadas;
}

function getJornadasCompeticion(id_competicion){
	var jornadas_competicion = getAjaxSync('ServicioJornadas', 'GetJornadasCompeticion', JSON.stringify({id_competicion: id_competicion}));
	return jornadas_competicion;
}

function getJornadasCompeticionMockup(id_competicion){
	alert("JornadasCompeticion es mockup");
	var jornadas = getJornadasMockup();
	var jornadas_competicion = $.grep(jornadas, function(jornada, index){
		return jornada.id_competicion === id_competicion;
	});
	return jornadas_competicion;
}

function getPartidosJornada(id_jornada){
	var partidos_jornada = getAjaxSync('ServicioJornadas', 'GetPartidosJornada', JSON.stringify({id: id_jornada}));
	return partidos_jornada;
}

function getUsuarios(){
	var usuarios = getAjaxSync('ServicioUsuarios', 'GetUsuarios');
	return usuarios;
}

function getUsuario(id_usuario){
	var usuario = getAjaxSync('ServicioUsuarios', 'GetUsuario', JSON.stringify({id_usuario: id_usuario}));
	return usuario;
}

function getUsuariosCompeticion(id_competicion){
	var usuario = getAjaxSync('ServicioUsuarios', 'GetUsuariosCompeticion', JSON.stringify({id_competicion: id_competicion}));
	return usuario;
}

function getPronosticos(id_jornada){
	var pronosticos = [];
	for (idUsuario = 0; idUsuario <= 30; idUsuario++){
		if (idUsuario % 7 !== 0){
			pronosticos.push({id: idUsuario*10 + 1, id_partido: 1, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 2, id_partido: 2, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 3, id_partido: 3, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 4, id_partido: 4, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 5, id_partido: 5, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 6, id_partido: 6, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 7, id_partido: 7, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 8, id_partido: 8, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 9, id_partido: 9, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
			pronosticos.push({id: idUsuario*10 + 10, id_partido: 10, goles_equipo_1: 2, goles_equipo_2: 1, id_usuario: idUsuario});
		}
	}
	return pronosticos;
}

function getPuntos(){
	var puntos = [];
	for (idUsuario = 0; idUsuario <= 30; idUsuario++){
		if (idUsuario % 7 !== 0){
			for (idJornada = 0; idJornada <= 22; idJornada++){
				puntos.push({id_usuario: idUsuario, id_jornada: idJornada, valor: 5});
			}
		}
	}
	return puntos;
}

function getCompeticionSeleccionada(){
	return 1;
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
						  if ('messages' in obj){
							alert(obj.messages);
						  }
						  resultado = obj.result;
					  }
				}
	});
	return resultado;

}