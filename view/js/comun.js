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
	var usuarios = [];
	usuarios.push({ id: 8, login: "Tokero", nombre: "Carlos", apellidos: "Toquero", comentarios: " ", email: "carlostoquero@gmail.com", id_estado: 1, id_acceso: 2, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 10, login: "jluzon", nombre: "Jairo", apellidos: "Luz�n", comentarios: "No comment ", email: "jairoluzon@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 11, login: "Lario", nombre: "Alberto", apellidos: "Lario", comentarios: "Dise�ador del sitio ", email: "lariobyte@gmail.com", id_estado: 1, id_acceso: 2, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 13, login: "jorgjim", nombre: "Jorge", apellidos: "Jimenez Pose", comentarios: "Pose campe�n!!", email: "jorgjim@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 14, login: "pinguinino", nombre: "Carlos", apellidos: "Fresno", comentarios: "Nos conocemos de alguna borrachera que otra...", email: "pinguinino@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 15, login: "juanrilla", nombre: "Juan Ram�nn", apellidos: "Garc�a Fern�ndez", comentarios: "Voy a pelar unos cuantos pollos...", email: "juanramongarcia@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 16, login: "juanignaciosl", nombre: "Nacho", apellidos: "S�nchez", comentarios: "Creo que no hay suficientes campos de registro, sexo, color de pelo y talla son fundamentales tambi�n =D", email: "aaa", id_estado: 2, id_acceso: 1, competiciones: [		]});
	usuarios.push({ id: 19, login: "Pepe", nombre: "Pepe", apellidos: "Toquero S�nchez", comentarios: "", email: "joseatoquero@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 20, login: "Uvekefu", nombre: "Jose A.", apellidos: "Garc�a", comentarios: "Viva el Mister de la PD Hermanos", email: "uvekefu@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 21, login: "Chuchi69", nombre: "Jes�s", apellidos: "Diego G�lvez", comentarios: "", email: "Ewerthon_85@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 22, login: "sofiadenao", nombre: "Sofia", apellidos: "P�rez Gonz�lez ", comentarios: "", email: "sofiadenao@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 23, login: "flipi", nombre: "Miguel", apellidos: "Pena", comentarios: "Los de salinas los mejores", email: "miguel.migeling@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 24, login: "Gaby", nombre: "gabriel", apellidos: "rodr�guez", comentarios: "", email: "gabriel10@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7	]});
	usuarios.push({ id: 25, login: "jiye", nombre: "Guillermo", apellidos: "Santofan", comentarios: "Lo hablamos", email: "gsimmross@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 26, login: "raujipo", nombre: "Raul ", apellidos: "Jimenez Pose", comentarios: "Hola, soy Raul (Mane), el hermano de Pose de Avila. ", email: "raujipo@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 27, login: "felixuco1981", nombre: "J.Felix", apellidos: "Jimenez Jimenez", comentarios: "Soy Felix de Avila", email: "felixuco533@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 28, login: "ana.g", nombre: "ANA", apellidos: "GONZALEZ ALVARADO", comentarios: "��� VAAAMOS ESPA�A !!!!!", email: "ana.g.alvarado1981@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 29, login: "bpenmar", nombre: "Benito", apellidos: "PM", comentarios: "", email: "bpenmar@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 30, login: "Jesi", nombre: "Jesi", apellidos: "Roman", comentarios: "jesy sexy!", email: "jessy_delfin@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 31, login: "Mario", nombre: "Mario", apellidos: "Martin", comentarios: "", email: "mariete83@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 32, login: "Ginny", nombre: "Virginia", apellidos: "Garc�a Garc�a", comentarios: "", email: "Virginny03@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 33, login: "Mitxelebb", nombre: "Miguel", apellidos: "Gonz�lez Alvarado", comentarios: "", email: "Mitxelebb@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 35, login: "Alberto", nombre: "Alberto", apellidos: "Alvarez Toquero", comentarios: "Primo TOK", email: "ea.alvatok@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 6	]});
	usuarios.push({ id: 36, login: "Gerardo", nombre: "Gerardo", apellidos: "Marcos gomez", comentarios: "", email: "gmargom@ono.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 37, login: "Angel", nombre: "Angel Luis", apellidos: "Sanchez Mata", comentarios: "Que soy yo. El primo de Pepe", email: "sancmata@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 38, login: "dolphy77", nombre: "AURE VIOREL", apellidos: "ALBU", comentarios: "", email: "aurelviorel21@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 39, login: "juanjo", nombre: "Juanjo", apellidos: "Toquero Nieto", comentarios: "", email: "juanitotok_84@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 40, login: "Luigi", nombre: "Luis", apellidos: "Ferrari Nieto", comentarios: "Amigo pervertido del guiller", email: "lfernie79@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 41, login: "Alvaro", nombre: "A�lvaro", apellidos: "Lario Velasco", comentarios: "", email: "alv_lario@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 7, 8	]});
	usuarios.push({ id: 42, login: "barrilla", nombre: "Javier", apellidos: "Barra", comentarios: "Hola, Javier Barra para jugar, con el n�mero 11 a la espalda si puede ser! jejeje", email: "jbarra@spanishplayer.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 43, login: "Fran1977", nombre: "FRANCISCO MANUEL", apellidos: "MARTIN ARRABAL", comentarios: "", email: "jatar2000@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 44, login: "Javi", nombre: "Javier", apellidos: "Gonz�lez Alvarado", comentarios: "", email: "Karpkoeman1978@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 6, 7, 8	]});
	usuarios.push({ id: 45, login: "angelito", nombre: "Angel", apellidos: "rodriguez serrador", comentarios: "Compa�ero Alberto ��lvarez", email: "gil19@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id: 46, login: "Roman", nombre: "Joni", apellidos: "Rom�n Garc�a", comentarios: "VIVA ESPA�A ", email: "jonimaster2@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 47, login: "kulter84", nombre: "Borja", apellidos: "Martin de Frutos", comentarios: "BORJA PE�A HERMANOS", email: "ajrob1984@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id: 51, login: "_sabelotodo", nombre: "Usuario", apellidos: "Sabelotodo", comentarios: "", email: "usuario@sabelotodo.com", id_estado: 2, id_acceso: 1, competiciones: [		]});
	usuarios.push({ id: 52, login: "alber_collantes", nombre: "Alberto", apellidos: "Collantes Z��iga", comentarios: "Amigo Juanra", email: "albertocollantes@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 53, login: "Blanco", nombre: "Rub�n", apellidos: "Blanco", comentarios: "", email: "rubenblanco1979@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 54, login: "Cordo", nombre: "Carlos", apellidos: "Cordob�s Espeja", comentarios: "", email: "cordo_10@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 55, login: "Cristina", nombre: "Cristina", apellidos: "Amo Iglesias", comentarios: "", email: "cristina3581@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 56, login: "Diego", nombre: "Diego", apellidos: "Robert", comentarios: "", email: "diegopucela@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 57, login: "rulopedrajax", nombre: "Raul", apellidos: "Carretero", comentarios: "Primo Fresno", email: "raul.carretero@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id: 58, login: "chavo", nombre: "Rub�n", apellidos: "Casillas", comentarios: "Amigo Pose", email: "rcrcas@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2, 6, 7	]});
	usuarios.push({ id: 59, login: "Richard", nombre: "Ricardo", apellidos: "Mart�n Frutos", comentarios: "", email: "richarmartin@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2, 6, 7, 8	]});
	usuarios.push({ id: 60, login: "Jonastrum", nombre: "Jonatan", apellidos: "Casillas", comentarios: "Hermano de ruben (chavo)", email: "rubio_a3_@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id: 61, login: "Carletto", nombre: "Carlos augusto", apellidos: "Lopez alonso", comentarios: "", email: "Clopez_alonso@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7	]});
	usuarios.push({ id: 62, login: "Jotaeme", nombre: "Jose", apellidos: "Perez gonzalez", comentarios: "", email: "Jotaemepuntog@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id: 63, login: "nando", nombre: "Fernando", apellidos: "Garcinu�o", comentarios: "", email: "nando_gm84@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id: 64, login: "Andrew", nombre: "Andres", apellidos: "Castro Tirados", comentarios: "", email: "leondrew@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7	]});
	usuarios.push({ id: 65, login: "samurablack", nombre: "Juan Mamuel", apellidos: "Rodriguez Pedruelo", comentarios: "", email: "samurablack@yahoo.es", id_estado: 1, id_acceso: 1, competiciones: [	6, 8	]});
	usuarios.push({ id: 66, login: "benjamin", nombre: "benjamin", apellidos: "manrique", comentarios: "", email: "bmanrique@impalag.es", id_estado: 0, id_acceso: 1, competiciones: [	6	]});
	usuarios.push({ id: 67, login: "olps70", nombre: "Oscar", apellidos: "Pollán  Somoza", comentarios: "Oscar laura", email: "lusgali@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id: 68, login: "Guillerkai", nombre: "Guillermo", apellidos: "Garc�a Fern�ndez", comentarios: "Soy el hermano de Juanra, y pod�is ir aflojando la pasta que no ten�is nada que hacer XD", email: "guillergf83@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7	]});
	usuarios.push({ id: 69, login: "JoseInclam", nombre: "Jose", apellidos: "Rodr�guez de las Heras", comentarios: "Soy Jose, compa�ero de trabajo de Carlos y Juanra!", email: "josrodhe@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id: 70, login: "jhonete", nombre: "jonatan", apellidos: "fernandez camino", comentarios: "Esa hermanos!!!!!", email: "jhonete85@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id: 71, login: "miguelmendez000", nombre: "Miguel", apellidos: "M�ndez", comentarios: "", email: "miguelmendez000@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id: 72, login: "a.gonzalez", nombre: "Alvaro", apellidos: "Gonzalez", comentarios: "", email: "a.gm130888@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id: 73, login: "MINGUEZ", nombre: "VICTOR", apellidos: "MINGUEZ ORTEGO", comentarios: "", email: "minguez_atleti_90@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7	]});
	usuarios.push({ id: 74, login: "antuas", nombre: "antuas", apellidos: "lopez", comentarios: "", email: "tonnocorreo-personal@yahoo.es", id_estado: 0, id_acceso: 1, competiciones: [		]});
	return usuarios;
}

function getUsuariosCompeticion(id_competicion){
	var usuarios = getUsuarios();
	var usuariosCompeticion = $.grep(usuarios, function(usuario, index){
		return usuario.competiciones.indexOf(id_competicion) !== -1;
	});
	return usuariosCompeticion;
}

function getUsuario(id_usuario){
	var usuarios = getUsuarios();
	var usuario = $.grep(usuarios, function(usr, index){
		return usr.id === id_usuario;
	});
	return usuario !== null && usuario.length === 1 ? usuario[0] : null;
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