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
function getTiposCompeticionMockup(){
	alert("Tipos competicion es mockup");
	var tipos_competicion = [];
	tipos_competicion.push({id: 1, nombre: "Liga"});
	tipos_competicion.push({id: 2, nombre: "Copa"});
	tipos_competicion.push({id: 3, nombre: "Mixto"});
	return tipos_competicion;
}


function getTiposJornada(){
	var tipos_jornada = getAjaxSync('ServicioTipos', 'GetTiposJornada');
	return tipos_jornada;
}
function getTiposJornadaMockup(){
	alert("Tipos jornada es mockup");
	var tipos_jornada = [];
	tipos_jornada.push({id: 1, nombre: "Liga"});
	tipos_jornada.push({id: 2, nombre: "Copa"});
	return tipos_jornada;
}


function getAccesosUsuario() {
	var accesos_usuario = getAjaxSync('ServicioTipos', 'GetAccesos');
	return accesos_usuario;
}
function getAccesosUsuarioMockup() {
	alert("Accessos usuario es mockup");
	var accesos_usuario = [];
	accesos_usuario.push({id_acceso: 1, nombre_acceso: "Usuario"});
	accesos_usuario.push({id_acceso: 2, nombre_acceso: "Administrador"});
	return accesos_usuario;
}


function getEstadosUsuario(){
	var estados_usuario = getAjaxSync('ServicioTipos', 'GetEstados');
	return estados_usuario;
}
function getEstadosUsuarioMockup(){
	alert("Estados usuario es mockup");
	var estados_usuario = [];
	estados_usuario.push({id_estado: 0, nombre_estado: "PENDIENTE"});
	estados_usuario.push({id_estado: 1, nombre_estado: "VALIDADO"});
	estados_usuario.push({id_estado: 2, nombre_estado: "RECHAZADO"});
	return estados_usuario;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIN INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCompeticiones(){
	var competiciones = getAjaxSync('ServicioCompeticiones', 'GetCompeticiones');
	return competiciones;
}

function getCompeticionesMockup(){
	alert("Competiciones es mockup");
	var competiciones = [];
	competiciones.push({id_competicion: 1, nombre_competicion: "Mundial Brasil 2014", 			titulo: "La porra del mundial", subtitulo: "FIFA World Cup Brasil 2014", siglas: "wc-14", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id_competicion: 2, nombre_competicion: "Liga BBVA 2014 - 2015", 		titulo: "Porra Liga BBVA 2014 - 2015", subtitulo: "LFP", siglas: "le-14", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id_competicion: 6, nombre_competicion: "Liga BBVA 2015 - 2016", 		titulo: "Porra Liga BBVA 2015 - 2016", subtitulo: "LFP", siglas: "le-15", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id_competicion: 7, nombre_competicion: "Eurocopa Francia 2016", 		titulo: "La porra de la Eurocopa", subtitulo: "UEFA Euro 2016", siglas: "ec-16", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id_competicion: 8, nombre_competicion: "La Liga Santander 2016-2017", 	titulo: "Porra Liga 2016-2017", subtitulo: "LFP", siglas: "le-16", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	return competiciones;
}

function getGrupos(){
	var grupos = getAjaxSync('ServicioCompeticiones', 'GetGrupos');
	return grupos;
}
function getGruposMockup(){
	alert("Grupos es mockup");
	var grupos = [];
	grupos.push({ id_grupo: 1,  nombre_grupo: "A", id_competicion: 1});
	grupos.push({ id_grupo: 2,  nombre_grupo: "B", id_competicion: 1});
	grupos.push({ id_grupo: 3,  nombre_grupo: "C", id_competicion: 1});
	grupos.push({ id_grupo: 4,  nombre_grupo: "D", id_competicion: 1});
	grupos.push({ id_grupo: 5,  nombre_grupo: "E", id_competicion: 1});
	grupos.push({ id_grupo: 6,  nombre_grupo: "F", id_competicion: 1});
	grupos.push({ id_grupo: 7,  nombre_grupo: "G", id_competicion: 1});
	grupos.push({ id_grupo: 8,  nombre_grupo: "H", id_competicion: 1});
	grupos.push({ id_grupo: 9,  nombre_grupo: "Primera Division", id_competicion: 2});
	grupos.push({ id_grupo: 10, nombre_grupo: "Primera Division", id_competicion: 6});
	grupos.push({ id_grupo: 11, nombre_grupo: "A", id_competicion: 7});
	grupos.push({ id_grupo: 12, nombre_grupo: "B", id_competicion: 7});
	grupos.push({ id_grupo: 13, nombre_grupo: "C", id_competicion: 7});
	grupos.push({ id_grupo: 14, nombre_grupo: "D", id_competicion: 7});
	grupos.push({ id_grupo: 15, nombre_grupo: "E", id_competicion: 7});
	grupos.push({ id_grupo: 16, nombre_grupo: "F", id_competicion: 7});
	grupos.push({ id_grupo: 17, nombre_grupo: "Primera Division", id_competicion: 8});
	return grupos;
}

function getGruposCompeticion(id_competicion){
	var grupos_competicion = getAjaxSync('ServicioCompeticiones', 'GetGruposCompeticion', JSON.stringify({id: id_competicion}));
	return grupos_competicion;
}

function getGruposCompeticionMockup(id_competicion){
	alert("Grupos Competicion es mockup");
	var grupos = getGruposMockup();
	var grupos_competicion = $.grep(grupos, function(grupo, index){
		return grupo.id_competicion === id_competicion;
	});
	return grupos_competicion;
}

function getCompeticionesEquipo(id_equipo){
	var competiciones_equipo = getAjaxSync('ServicioEquipos', 'GetCompeticionesEquipo', JSON.stringify({id: id_equipo}));
	return competiciones_equipo;
}

function getCompeticionesUsuario(id_usuario){
	var competiciones_usuario = getCompeticiones();
	$.each(competiciones_usuario, function(item, competicion){
		competicion.id_usuario = id_usuario;
	});
	return competiciones_usuario;
}

function getEquipos(){
	var equipos = getAjaxSync('ServicioEquipos', 'GetEquipos');
	return equipos;
}
function getEquiposMockup(){
	alert("Equipos es mockup");
	
	var equipos = [];
	equipos.push({ id_equipo: 1, nombre_equipo: "Brasil", abreviatura: "BRA", url_escudo: "../view/img/BRA.png", competiciones: [{id_competicion: 1, id_grupo: 1}] });
	equipos.push({ id_equipo: 2, nombre_equipo: "Croacia", abreviatura: "CRO", url_escudo: "../view/img/CRO.png", competiciones: [{id_competicion: 1, id_grupo: 1}, {id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id_equipo: 3, nombre_equipo: "M&eacute;xico", abreviatura: "MEX", url_escudo: "../view/img/MEX.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id_equipo: 4, nombre_equipo: "Camer&uacute;n", abreviatura: "CMR", url_escudo: "../view/img/CMR.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id_equipo: 5, nombre_equipo: "Espa&ntilde;a", abreviatura: "SPA", url_escudo: "../view/img/ESP.png", competiciones: [{id_competicion: 1, id_grupo: 2}, {id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id_equipo: 6, nombre_equipo: "Holanda", abreviatura: "HOL", url_escudo: "../view/img/HOL.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id_equipo: 7, nombre_equipo: "Chile", abreviatura: "CHI", url_escudo: "../view/img/CHI.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id_equipo: 8, nombre_equipo: "Australia", abreviatura: "AUS", url_escudo: "../view/img/AUS.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id_equipo: 9, nombre_equipo: "Colombia", abreviatura: "COL", url_escudo: "../view/img/COL.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id_equipo: 10, nombre_equipo: "Grecia", abreviatura: "GRE", url_escudo: "../view/img/GRE.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id_equipo: 11, nombre_equipo: "Costa de Marfil", abreviatura: "CIV", url_escudo: "../view/img/CIV.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id_equipo: 12, nombre_equipo: "Jap&oacute;n", abreviatura: "JPN", url_escudo: "../view/img/JPN.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id_equipo: 13, nombre_equipo: "Uruguay", abreviatura: "URU", url_escudo: "../view/img/URU.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id_equipo: 14, nombre_equipo: "Costa Rica", abreviatura: "CRC", url_escudo: "../view/img/CRC.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id_equipo: 15, nombre_equipo: "Inglaterra", abreviatura: "ING", url_escudo: "../view/img/ING.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id_equipo: 16, nombre_equipo: "Italia", abreviatura: "ITA", url_escudo: "../view/img/ITA.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id_equipo: 17, nombre_equipo: "Suiza", abreviatura: "SUI", url_escudo: "../view/img/SUI.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id_equipo: 18, nombre_equipo: "Ecuador", abreviatura: "ECU", url_escudo: "../view/img/ECU.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id_equipo: 19, nombre_equipo: "Francia", abreviatura: "FRA", url_escudo: "../view/img/FRA.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id_equipo: 20, nombre_equipo: "Honduras", abreviatura: "HON", url_escudo: "../view/img/HON.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id_equipo: 21, nombre_equipo: "Argentina", abreviatura: "ARG", url_escudo: "../view/img/ARG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id_equipo: 22, nombre_equipo: "Bosnia y Herzegovina", abreviatura: "BIH", url_escudo: "../view/img/BIH.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id_equipo: 23, nombre_equipo: "Ir&aacute;n", abreviatura: "IRN", url_escudo: "../view/img/IRN.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id_equipo: 24, nombre_equipo: "Nigeria", abreviatura: "NIG", url_escudo: "../view/img/NIG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id_equipo: 25, nombre_equipo: "Alemania", abreviatura: "ALE", url_escudo: "../view/img/ALE.png", competiciones: [{id_competicion: 1, id_grupo: 7}, {id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id_equipo: 26, nombre_equipo: "Portugal", abreviatura: "POR", url_escudo: "../view/img/POR.png", competiciones: [{id_competicion: 1, id_grupo: 7},  {id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id_equipo: 27, nombre_equipo: "Ghana", abreviatura: "GHA", url_escudo: "../view/img/GHA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id_equipo: 28, nombre_equipo: "Estados Unidos", abreviatura: "USA", url_escudo: "../view/img/USA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id_equipo: 29, nombre_equipo: "B&eacute;lgica", abreviatura: "BEL", url_escudo: "../view/img/BEL.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id_equipo: 30, nombre_equipo: "Argelia", abreviatura: "ALG", url_escudo: "../view/img/ALG.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id_equipo: 31, nombre_equipo: "Rusia", abreviatura: "RUS", url_escudo: "../view/img/RUS.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id_equipo: 32, nombre_equipo: "Corea", abreviatura: "KOR", url_escudo: "../view/img/KOR.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id_equipo: 71, nombre_equipo: "C&oacute;rdoba", abreviatura: "COR", url_escudo: "../view/img/COR.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id_equipo: 66, nombre_equipo: "Almer&iacute;a", abreviatura: "ALM", url_escudo: "../view/img/ALM.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id_equipo: 67, nombre_equipo: "Athletic de Bilbao", abreviatura: "ATH", url_escudo: "../view/img/ATH.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 68, nombre_equipo: "Atl&eacute;tico de Madrid", abreviatura: "ATM", url_escudo: "../view/img/ATM.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 69, nombre_equipo: "Barcelona", abreviatura: "FCB", url_escudo: "../view/img/FCB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 70, nombre_equipo: "Celta", abreviatura: "CEL", url_escudo: "../view/img/CEL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 72, nombre_equipo: "Deportivo de la Coru�a", abreviatura: "DEP", url_escudo: "../view/img/DEP.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 73, nombre_equipo: "Eibar", abreviatura: "EIB", url_escudo: "../view/img/EIB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 74, nombre_equipo: "Elche", abreviatura: "ELC", url_escudo: "../view/img/ELC.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id_equipo: 75, nombre_equipo: "Espanyol", abreviatura: "ESP", url_escudo: "../view/img/ESY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 76, nombre_equipo: "Getafe", abreviatura: "GET", url_escudo: "../view/img/GET.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id_equipo: 77, nombre_equipo: "Granada", abreviatura: "GRA", url_escudo: "../view/img/GRA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 78, nombre_equipo: "Levante", abreviatura: "LEV", url_escudo: "../view/img/LEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id_equipo: 79, nombre_equipo: "M&aacute;laga", abreviatura: "MAL", url_escudo: "../view/img/MAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 80, nombre_equipo: "Real Madrid", abreviatura: "RMA", url_escudo: "../view/img/RMA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 81, nombre_equipo: "Real Sociedad", abreviatura: "RSO", url_escudo: "../view/img/RSO.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 82, nombre_equipo: "Rayo Vallecano", abreviatura: "RAY", url_escudo: "../view/img/RAY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id_equipo: 83, nombre_equipo: "Sevilla", abreviatura: "SEV", url_escudo: "../view/img/SEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 84, nombre_equipo: "Valencia", abreviatura: "VAL", url_escudo: "../view/img/VAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 85, nombre_equipo: "Villarreal", abreviatura: "VIL", url_escudo: "../view/img/VIL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 86, nombre_equipo: "Real Betis", abreviatura: "BET", url_escudo: "../view/img/BET.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 87, nombre_equipo: "Sporting de Gij&oacute;n", abreviatura: "SPO", url_escudo: "../view/img/SPO.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 88, nombre_equipo: "Las Palmas", abreviatura: "LPA", url_escudo: "../view/img/LPA.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 89, nombre_equipo: "Rumania", abreviatura: "RUM", url_escudo: "../view/img/RUM.png", competiciones: [{id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id_equipo: 90, nombre_equipo: "Albania", abreviatura: "ALB", url_escudo: "../view/img/ALB.png", competiciones: [{id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id_equipo: 91, nombre_equipo: "Gales", abreviatura: "WAL", url_escudo: "../view/img/WAL.png", competiciones: [{id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id_equipo: 92, nombre_equipo: "Eslovaquia", abreviatura: "SVK", url_escudo: "../view/img/SVK.png", competiciones: [{id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id_equipo: 93, nombre_equipo: "Polonia", abreviatura: "POL", url_escudo: "../view/img/POL.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id_equipo: 94, nombre_equipo: "Irlanda del Norte", abreviatura: "NIR", url_escudo: "../view/img/NIR.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id_equipo: 95, nombre_equipo: "Ucrania", abreviatura: "UKR", url_escudo: "../view/img/UKR.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id_equipo: 96, nombre_equipo: "Republica checa", abreviatura: "CZK", url_escudo: "../view/img/CZK.png", competiciones: [{id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id_equipo: 97, nombre_equipo: "Turquia", abreviatura: "TUR", url_escudo: "../view/img/TUR.png", competiciones: [{id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id_equipo: 98, nombre_equipo: "Irlanda", abreviatura: "IRL", url_escudo: "../view/img/IRL.png", competiciones: [{id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id_equipo: 99, nombre_equipo: "Suecia", abreviatura: "SWE", url_escudo: "../view/img/SWE.png", competiciones: [{id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id_equipo: 100, nombre_equipo: "Islandia", abreviatura: "ISL", url_escudo: "../view/img/ISL.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id_equipo: 101, nombre_equipo: "Austria", abreviatura: "AUT", url_escudo: "../view/img/AUT.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id_equipo: 102, nombre_equipo: "Hungria", abreviatura: "HUN", url_escudo: "../view/img/HUN.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id_equipo: 122, nombre_equipo: "At.Osasuna", abreviatura: "OSA", url_escudo: "../view/img/OSA.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 121, nombre_equipo: "CD Legan&eacute;s", abreviatura: "LEG", url_escudo: "../view/img/LEG.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 120, nombre_equipo: "Deportivo Alav&eacute;s SAD", abreviatura: "ALA", url_escudo: "../view/img/ALA.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id_equipo: 119, nombre_equipo: "Desconocido", abreviatura: "DES", url_escudo: "../view/img/NONE.png", competiciones: []});
	return equipos;
}

function getEquiposCompeticion(id_competicion){
	var equipos_competicion = getAjaxSync('ServicioEquipos', 'GetEquiposByCompeticion', JSON.stringify({id_competicion: id_competicion}));
	return equipos_competicion;
}
function getEquiposCompeticionMockup(id_competicion){
	alert("EquiposCompeticion es mockup");
	var equipos = getEquiposMockup();
	var equipos_competicion = $.grep(equipos, function(equipo, index){
		var pertenece_competicion = false;
		if (equipo.competiciones.length === 0){
			pertenece_competicion = true;
		} else {
			$.each(equipo.competiciones, function(index, competicion){
				if (competicion.id_competicion === id_competicion){
					pertenece_competicion = true;
				}
			});
		}
		return pertenece_competicion;
	});
	return equipos_competicion;
}

function getEquiposGrupo(id_grupo){
	var equipos_grupo = getAjaxSync('ServicioEquipos', 'GetEquiposByGrupo', JSON.stringify({id_grupo: id_grupo}));
	return equipos_grupo;
}
function getEquiposGrupoMockup(id_grupo){
	alert("EquiposGrupo es mockup");
	
	var equipos = getEquiposMockup();
	var equipos_grupo = $.grep(equipos, function(equipo, index){
		var pertenece_grupo = false;
		if (equipo.competiciones.length === 0){
			pertenece_grupo = true;
		} else {
			$.each(equipo.competiciones, function(index, competicion){
				if (competicion.id_grupo === id_grupo){
					pertenece_grupo = true;
				}
			});
		}
		return pertenece_grupo;
	});
	return equipos_grupo;
}

function getEstadios(){
	var estadios = getAjaxSync('ServicioEstadios', 'GetEstadios');
	return estadios;
}
function getEstadiosMockup(){
	alert("Estadios es mockup");

	var estadios = [];
	estadios.push({ id_estadio: 1, nombre_estadio: "Beira R&iacute;o", ciudad_estadio: "Porto Alegre"});
	estadios.push({ id_estadio: 2, nombre_estadio: "Estadio Castel&atilde;o", ciudad_estadio: "Fortaleza"});
	estadios.push({ id_estadio: 3, nombre_estadio: "Arena Fonte Nova", ciudad_estadio: "Salvador de Bah&iacute;a"});
	estadios.push({ id_estadio: 4, nombre_estadio: "Estadio Mineirao", ciudad_estadio: "Belo Horizonte"});
	estadios.push({ id_estadio: 5, nombre_estadio: "Estadio Nacional", ciudad_estadio: "Brasilia"});
	estadios.push({ id_estadio: 6, nombre_estadio: "Estadio Das Dunas", ciudad_estadio: "Natal"});
	estadios.push({ id_estadio: 7, nombre_estadio: "Estadio Maracan&aacute;", ciudad_estadio: "R&iacute;o de Janeiro"});
	estadios.push({ id_estadio: 8, nombre_estadio: "Arena da Baixada", ciudad_estadio: "Curitiba"});
	estadios.push({ id_estadio: 9, nombre_estadio: "Arena Pantanal", ciudad_estadio: "Cuiab&aacute;"});
	estadios.push({ id_estadio: 10, nombre_estadio: "Arena de S&atilde;o Paulo", ciudad_estadio: "S&atilde;o Paulo"});
	estadios.push({ id_estadio: 11, nombre_estadio: "Arena de Pernambuco", ciudad_estadio: "Recife"});
	estadios.push({ id_estadio: 12, nombre_estadio: "Arena Amazonia", ciudad_estadio: "Manaos"});
	estadios.push({ id_estadio: 13, nombre_estadio: "Juegos Mediterr&aacute;neos", ciudad_estadio: "Almer&iacute;", id_equipo_local: 66});
	estadios.push({ id_estadio: 14, nombre_estadio: "San Mam&eacute;s", ciudad_estadio: "Bilbao", id_equipo_local: 67});
	estadios.push({ id_estadio: 15, nombre_estadio: "Vicente Calder&oacute;n", ciudad_estadio: "Madrid", id_equipo_local: 68});
	estadios.push({ id_estadio: 16, nombre_estadio: "Camp Nou", ciudad_estadio: "Barcelona", id_equipo_local: 69});
	estadios.push({ id_estadio: 17, nombre_estadio: "Bala&iacute;dos", ciudad_estadio: "Vigo", id_equipo_local: 70});
	estadios.push({ id_estadio: 18, nombre_estadio: "Nuevo Arc&aacute;ngel", ciudad_estadio: "C&oacute;rdoba", id_equipo_local: 71});
	estadios.push({ id_estadio: 19, nombre_estadio: "Riazor", ciudad_estadio: "La Coru�a", id_equipo_local: 72});
	estadios.push({ id_estadio: 20, nombre_estadio: "Ipur&uacute;a", ciudad_estadio: "Eibar", id_equipo_local: 73});
	estadios.push({ id_estadio: 21, nombre_estadio: "Mart&iacute;nez Valero", ciudad_estadio: "Elche", id_equipo_local: 74});
	estadios.push({ id_estadio: 22, nombre_estadio: "Montjuic", ciudad_estadio: "Barcelona", id_equipo_local: 75});
	estadios.push({ id_estadio: 23, nombre_estadio: "Alfonso P&eacute;rez", ciudad_estadio: "Getafe", id_equipo_local: 76});
	estadios.push({ id_estadio: 24, nombre_estadio: "Nuevo Los C&aacute;rmenes", ciudad_estadio: "Granada", id_equipo_local: 77});
	estadios.push({ id_estadio: 25, nombre_estadio: "Ciutat de Valencia", ciudad_estadio: "Valencia", id_equipo_local: 78});
	estadios.push({ id_estadio: 26, nombre_estadio: "La Rosaleda", ciudad_estadio: "M&aacute;laga", id_equipo_local: 79});
	estadios.push({ id_estadio: 27, nombre_estadio: "Santiago Bernab&eacute;u", ciudad_estadio: "Madrid", id_equipo_local: 80});
	estadios.push({ id_estadio: 28, nombre_estadio: "Anoeta", ciudad_estadio: "San Sebasti&aacute;n", id_equipo_local: 81});
	estadios.push({ id_estadio: 29, nombre_estadio: "Vallecas", ciudad_estadio: "Madrid", id_equipo_local: 82});
	estadios.push({ id_estadio: 30, nombre_estadio: "S&aacute;nchez Pizju&aacute;n", ciudad_estadio: "Sevilla", id_equipo_local: 83});
	estadios.push({ id_estadio: 31, nombre_estadio: "Mestalla", ciudad_estadio: "Valencia", id_equipo_local: 84});
	estadios.push({ id_estadio: 32, nombre_estadio: "El Madrigal", ciudad_estadio: "Villarreal", id_equipo_local: 85});
	estadios.push({ id_estadio: 33, nombre_estadio: "El Molinon", ciudad_estadio: "Gij&oacute;n", id_equipo_local: 87});
	estadios.push({ id_estadio: 34, nombre_estadio: "Benito Villamar&iacute;n", ciudad_estadio: "Sevilla", id_equipo_local: 86});
	estadios.push({ id_estadio: 35, nombre_estadio: "Insular", ciudad_estadio: "Las Palmas de Gran Canaria", id_equipo_local: 88});
	estadios.push({ id_estadio: 36, nombre_estadio: "Stade de France", ciudad_estadio: "Saint-Denis"});
	estadios.push({ id_estadio: 37, nombre_estadio: "Parc des Princes", ciudad_estadio: "Par&iacute;s"});
	estadios.push({ id_estadio: 38, nombre_estadio: "Stade de Lyon", ciudad_estadio: "Lyon"});
	estadios.push({ id_estadio: 39, nombre_estadio: "Stade Velodrome", ciudad_estadio: "Marsella"});
	estadios.push({ id_estadio: 40, nombre_estadio: "Stade Pierre-Mauroy", ciudad_estadio: "Lille"});
	estadios.push({ id_estadio: 41, nombre_estadio: "Stade Bollaert-Delelis", ciudad_estadio: "Lens"});
	estadios.push({ id_estadio: 42, nombre_estadio: "Stade de Bordeaux", ciudad_estadio: "Burdeos"});
	estadios.push({ id_estadio: 43, nombre_estadio: "Stade Geoffroy-Guichard", ciudad_estadio: "Saint-Etienne"});
	estadios.push({ id_estadio: 44, nombre_estadio: "Stade de Toulouse", ciudad_estadio: "Toulouse"});
	estadios.push({ id_estadio: 45, nombre_estadio: "Stade de Nice", ciudad_estadio: "Niza"});
	estadios.push({ id_estadio: 46, nombre_estadio: "Mendizorroza", ciudad_estadio: "Vitoria", id_equipo_local: 120});
	estadios.push({ id_estadio: 47, nombre_estadio: "Butarque", ciudad_estadio: "Legan&eacute;s", id_equipo_local: 121});
	estadios.push({ id_estadio: 48, nombre_estadio: "El Sadar", ciudad_estadio: "Pamplona", id_equipo_local: 122});
	return estadios;
}

function getJornadas(){
	var jornadas = getAjaxSync('ServicioJornadas', 'GetJornadas');
	return jornadas;
}
function getJornadasMockup(){
	alert("Jornadas es Mockup");
	var jornadas = [];
	var id_jornada = 1;
	
	// Jornadas Mundial
	jornadas.push({id: id_jornada++, numero: 1, nombre: 'Jornada 01', nombre_corto: 'J01', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 2, nombre: 'Jornada 02', nombre_corto: 'J02', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 3, nombre: 'Jornada 03', nombre_corto: 'J03', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 4, nombre: 'Octavos de final', nombre_corto: 'OF', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 5, nombre: 'Cuartos de final', nombre_corto: 'QF' , fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 6, nombre: 'Semifinales', nombre_corto: 'SF', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 1});
	jornadas.push({id: id_jornada++, numero: 7, nombre: 'Final', nombre_corto: 'F', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 1});
	
	// Jornadas liga 14-15
	for (i = 1; i <= 38; i++){
		jornadas.push({id: id_jornada++, numero: i, nombre: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 2});
	}
	
	// Jornada liga 15-16
	for (i = 1; i <= 38; i++){
		jornadas.push({id: id_jornada++, numero: i, nombre: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 6});
	}
	
	// Jornadas Eurocopa
	jornadas.push({id: id_jornada++, numero: 1, nombre: 'Jornada 01', nombre_corto: 'J01', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 7});
	jornadas.push({id: id_jornada++, numero: 2, nombre: 'Jornada 02', nombre_corto: 'J02', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 7});
	jornadas.push({id: id_jornada++, numero: 3, nombre: 'Jornada 03', nombre_corto: 'J03', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 7});
	jornadas.push({id: id_jornada++, numero: 4, nombre: 'Cuartos de final', nombre_corto: 'QF' , fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 7});
	jornadas.push({id: id_jornada++, numero: 5, nombre: 'Semifinales', nombre_corto: 'SF', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 7});
	jornadas.push({id: id_jornada++, numero: 6, nombre: 'Final', nombre_corto: 'F', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 7});
	
	// Jornadas liga 16-17
	for (i = 1; i <= 38; i++){
		jornadas.push({id: id_jornada++, numero: i, nombre: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 8});
	}
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
	var partidos = [];
	partidos.push({id: 1,  equipo_1: 1,  equipo_2: 2,  goles_equipo_1: 1, goles_equipo_2: 1, estadio: 1, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 2,  equipo_1: 3,  equipo_2: 4,  goles_equipo_1: 2, goles_equipo_2: 1, estadio: 2, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 3,  equipo_1: 5,  equipo_2: 6,  goles_equipo_1: 6, goles_equipo_2: 2, estadio: 3, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 4,  equipo_1: 7,  equipo_2: 8,  goles_equipo_1: 1, goles_equipo_2: 1, estadio: 4, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 5,  equipo_1: 9,  equipo_2: 10, goles_equipo_1: 6, goles_equipo_2: 4, estadio: 5, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 6,  equipo_1: 11, equipo_2: 12, goles_equipo_1: 2, goles_equipo_2: 1, estadio: 6, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 7,  equipo_1: 13, equipo_2: 14, goles_equipo_1: 0, goles_equipo_2: 3, estadio: 7, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 8,  equipo_1: 15, equipo_2: 16, goles_equipo_1: 1, goles_equipo_2: 1, estadio: 8, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 9,  equipo_1: 17, equipo_2: 18, goles_equipo_1: 0, goles_equipo_2: 1, estadio: 9, fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 10, equipo_1: 19, equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, estadio: 10, fecha_hora: '19-08-2016 20:45'});
	return partidos;
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