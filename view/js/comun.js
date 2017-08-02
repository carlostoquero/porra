function generarMenu() {
	var mainMenu = $('<ul>');
	mainMenu.append('<li><a href="./reglas.html">Reglas</a></li>' + 
					'<li><a href="#">Competici&oacute;n</a>' + 
						'<ul>' + 
							'<li><a href="./comp_resultados.html">Resultados</a></li>' + 
							'<li><a href="./comp_clasificacion.html">Clasificaci&oacute;n</a></li>' + 
							'<li><a href="./comp_cargar.html">Cargar</a></li>' + 
						'</ul>' + 
					'</li>' + 
					'<li><a href="#">Pron&oacute;sticos</a>' + 
						'<ul>' + 
							'<li><a href="./pron_cargar.html">Cargar</a></li>' + 
							'<li><a href="./pron_ver.html">Ver</a></li>' + 
							'<li><a href="./pron_clasificacion.html">Clasificacion</a></li>' + 
						'</ul>' + 
					'</li>' + 
					'<li><a href="#">Administraci&oacute;n</a>' + 
						'<ul>' + 
							'<li><a href="./adm_competiciones.html">Competiciones</a></li>' + 
							'<li><a href="./adm_equipos.html">Equipos</a></li>' + 
							'<li><a href="./adm_estadios.html">Estadios</a></li>' + 
							'<li><a href="./adm_jornadas.html">Jornadas</a></li>' + 
							'<li><a href="./adm_usuarios.html">Usuarios</a></li>' + 
						'</ul>' + 
					'</li>');
	
	var actions = $('<ul>');
	actions.append('<li><a href="./gest_editar.html">Editar perfil</a></li>' + 
				   '<li><a href="./comp_cambiar.html">Cambiar competicion</a></li>' + 
				   '<li><a href="./logout.html">Salir</a></li>');

	$('.menu-div').append(mainMenu);
	$('.menu-div').append(actions);
}

function generarFooter() {
	$('.footer-div').append('<span class="footer">2017 - La Web de la Porra</span>');
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
	var competiciones = [];
	competiciones.push({id: 1, nombre: "Mundial Brasil 2014", 			titulo: "La porra del mundial", subtitulo: "FIFA World Cup Brasil 2014", siglas: "wc-14", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id: 2, nombre: "Liga BBVA 2014 - 2015", 		titulo: "Porra Liga BBVA 2014 - 2015", subtitulo: "LFP", siglas: "le-14", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id: 6, nombre: "Liga BBVA 2015 - 2016", 		titulo: "Porra Liga BBVA 2015 - 2016", subtitulo: "LFP", siglas: "le-15", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id: 7, nombre: "Eurocopa Francia 2016", 		titulo: "La porra de la Eurocopa", subtitulo: "UEFA Euro 2016", siglas: "ec-16", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id: 8, nombre: "La Liga Santander 2016-2017", 	titulo: "Porra Liga 2016-2017", subtitulo: "LFP", siglas: "le-16", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	return competiciones;
}

function getGrupos(){
	var grupos = [];
	grupos.push({ id: 1,  nombre: "A", id_competicion: 1});
	grupos.push({ id: 2,  nombre: "B", id_competicion: 1});
	grupos.push({ id: 3,  nombre: "C", id_competicion: 1});
	grupos.push({ id: 4,  nombre: "D", id_competicion: 1});
	grupos.push({ id: 5,  nombre: "E", id_competicion: 1});
	grupos.push({ id: 6,  nombre: "F", id_competicion: 1});
	grupos.push({ id: 7,  nombre: "G", id_competicion: 1});
	grupos.push({ id: 8,  nombre: "H", id_competicion: 1});
	grupos.push({ id: 9,  nombre: "Primera Division", id_competicion: 2});
	grupos.push({ id: 10, nombre: "Primera Division", id_competicion: 6});
	grupos.push({ id: 11, nombre: "A", id_competicion: 7});
	grupos.push({ id: 12, nombre: "B", id_competicion: 7});
	grupos.push({ id: 13, nombre: "C", id_competicion: 7});
	grupos.push({ id: 14, nombre: "D", id_competicion: 7});
	grupos.push({ id: 15, nombre: "E", id_competicion: 7});
	grupos.push({ id: 16, nombre: "F", id_competicion: 7});
	grupos.push({ id: 17, nombre: "Primera Division", id_competicion: 8});
	return grupos;
}

function getGruposCompeticion(id_competicion){
	var grupos = getGrupos();
	var grupos_competicion = $.grep(grupos, function(grupo, index){
		return grupo.id_competicion === id_competicion;
	});
	return grupos_competicion;
}

function getCompeticionesUsuario(id_usuario){
	var competiciones_usuario = getCompeticiones();
	$.each(competiciones_usuario, function(item, competicion){
		competicion.id_usuario = id_usuario;
	});
	return competiciones_usuario;
}

function getEquipos(){
	var equipos = [];
	equipos.push({ id: 1, nombre: "Brasil", abreviatura: "BRA", escudo: "../view/img/BRA.png", competiciones: [{id_competicion: 1, id_grupo: 1}] });
	equipos.push({ id: 2, nombre: "Croacia", abreviatura: "CRO", escudo: "../view/img/CRO.png", competiciones: [{id_competicion: 1, id_grupo: 1}, {id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id: 3, nombre: "M&eacute;xico", abreviatura: "MEX", escudo: "../view/img/MEX.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id: 4, nombre: "Camer&uacute;n", abreviatura: "CMR", escudo: "../view/img/CMR.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id: 5, nombre: "Espa&ntilde;a", abreviatura: "SPA", escudo: "../view/img/ESP.png", competiciones: [{id_competicion: 1, id_grupo: 2}, {id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id: 6, nombre: "Holanda", abreviatura: "HOL", escudo: "../view/img/HOL.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 7, nombre: "Chile", abreviatura: "CHI", escudo: "../view/img/CHI.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 8, nombre: "Australia", abreviatura: "AUS", escudo: "../view/img/AUS.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 9, nombre: "Colombia", abreviatura: "COL", escudo: "../view/img/COL.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 10, nombre: "Grecia", abreviatura: "GRE", escudo: "../view/img/GRE.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 11, nombre: "Costa de Marfil", abreviatura: "CIV", escudo: "../view/img/CIV.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 12, nombre: "Jap&oacute;n", abreviatura: "JPN", escudo: "../view/img/JPN.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 13, nombre: "Uruguay", abreviatura: "URU", escudo: "../view/img/URU.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id: 14, nombre: "Costa Rica", abreviatura: "CRC", escudo: "../view/img/CRC.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id: 15, nombre: "Inglaterra", abreviatura: "ING", escudo: "../view/img/ING.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id: 16, nombre: "Italia", abreviatura: "ITA", escudo: "../view/img/ITA.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id: 17, nombre: "Suiza", abreviatura: "SUI", escudo: "../view/img/SUI.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id: 18, nombre: "Ecuador", abreviatura: "ECU", escudo: "../view/img/ECU.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id: 19, nombre: "Francia", abreviatura: "FRA", escudo: "../view/img/FRA.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id: 20, nombre: "Honduras", abreviatura: "HON", escudo: "../view/img/HON.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id: 21, nombre: "Argentina", abreviatura: "ARG", escudo: "../view/img/ARG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 22, nombre: "Bosnia y Herzegovina", abreviatura: "BIH", escudo: "../view/img/BIH.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 23, nombre: "Ir&aacute;n", abreviatura: "IRN", escudo: "../view/img/IRN.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 24, nombre: "Nigeria", abreviatura: "NIG", escudo: "../view/img/NIG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 25, nombre: "Alemania", abreviatura: "ALE", escudo: "../view/img/ALE.png", competiciones: [{id_competicion: 1, id_grupo: 7}, {id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id: 26, nombre: "Portugal", abreviatura: "POR", escudo: "../view/img/POR.png", competiciones: [{id_competicion: 1, id_grupo: 7},  {id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id: 27, nombre: "Ghana", abreviatura: "GHA", escudo: "../view/img/GHA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id: 28, nombre: "Estados Unidos", abreviatura: "USA", escudo: "../view/img/USA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id: 29, nombre: "B&eacute;lgica", abreviatura: "BEL", escudo: "../view/img/BEL.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id: 30, nombre: "Argelia", abreviatura: "ALG", escudo: "../view/img/ALG.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id: 31, nombre: "Rusia", abreviatura: "RUS", escudo: "../view/img/RUS.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id: 32, nombre: "Corea", abreviatura: "KOR", escudo: "../view/img/KOR.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id: 71, nombre: "C&oacute;rdoba", abreviatura: "COR", escudo: "../view/img/COR.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 66, nombre: "Almer&iacute;a", abreviatura: "ALM", escudo: "../view/img/ALM.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 67, nombre: "Athletic de Bilbao", abreviatura: "ATH", escudo: "../view/img/ATH.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 68, nombre: "Atl&eacute;tico de Madrid", abreviatura: "ATM", escudo: "../view/img/ATM.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 69, nombre: "Barcelona", abreviatura: "FCB", escudo: "../view/img/FCB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 70, nombre: "Celta", abreviatura: "CEL", escudo: "../view/img/CEL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 72, nombre: "Deportivo de la Coru�a", abreviatura: "DEP", escudo: "../view/img/DEP.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 73, nombre: "Eibar", abreviatura: "EIB", escudo: "../view/img/EIB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 74, nombre: "Elche", abreviatura: "ELC", escudo: "../view/img/ELC.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 75, nombre: "Espanyol", abreviatura: "ESP", escudo: "../view/img/ESY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 76, nombre: "Getafe", abreviatura: "GET", escudo: "../view/img/GET.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id: 77, nombre: "Granada", abreviatura: "GRA", escudo: "../view/img/GRA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 78, nombre: "Levante", abreviatura: "LEV", escudo: "../view/img/LEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id: 79, nombre: "M&aacute;laga", abreviatura: "MAL", escudo: "../view/img/MAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 80, nombre: "Real Madrid", abreviatura: "RMA", escudo: "../view/img/RMA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 81, nombre: "Real Sociedad", abreviatura: "RSO", escudo: "../view/img/RSO.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 82, nombre: "Rayo Vallecano", abreviatura: "RAY", escudo: "../view/img/RAY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}]});
	equipos.push({ id: 83, nombre: "Sevilla", abreviatura: "SEV", escudo: "../view/img/SEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 84, nombre: "Valencia", abreviatura: "VAL", escudo: "../view/img/VAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 85, nombre: "Villarreal", abreviatura: "VIL", escudo: "../view/img/VIL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 86, nombre: "Real Betis", abreviatura: "BET", escudo: "../view/img/BET.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 87, nombre: "Sporting de Gij&oacute;n", abreviatura: "SPO", escudo: "../view/img/SPO.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 88, nombre: "Las Palmas", abreviatura: "LPA", escudo: "../view/img/LPA.png", competiciones: [{id_competicion: 6, id_grupo: 10}, {id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 89, nombre: "Rumania", abreviatura: "RUM", escudo: "../view/img/RUM.png", competiciones: [{id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id: 90, nombre: "Albania", abreviatura: "ALB", escudo: "../view/img/ALB.png", competiciones: [{id_competicion: 7, id_grupo: 11}]});
	equipos.push({ id: 91, nombre: "Gales", abreviatura: "WAL", escudo: "../view/img/WAL.png", competiciones: [{id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id: 92, nombre: "Eslovaquia", abreviatura: "SVK", escudo: "../view/img/SVK.png", competiciones: [{id_competicion: 7, id_grupo: 12}]});
	equipos.push({ id: 93, nombre: "Polonia", abreviatura: "POL", escudo: "../view/img/POL.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id: 94, nombre: "Irlanda del Norte", abreviatura: "NIR", escudo: "../view/img/NIR.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id: 95, nombre: "Ucrania", abreviatura: "UKR", escudo: "../view/img/UKR.png", competiciones: [{id_competicion: 7, id_grupo: 13}]});
	equipos.push({ id: 96, nombre: "Republica checa", abreviatura: "CZK", escudo: "../view/img/CZK.png", competiciones: [{id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id: 97, nombre: "Turquia", abreviatura: "TUR", escudo: "../view/img/TUR.png", competiciones: [{id_competicion: 7, id_grupo: 14}]});
	equipos.push({ id: 98, nombre: "Irlanda", abreviatura: "IRL", escudo: "../view/img/IRL.png", competiciones: [{id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id: 99, nombre: "Suecia", abreviatura: "SWE", escudo: "../view/img/SWE.png", competiciones: [{id_competicion: 7, id_grupo: 15}]});
	equipos.push({ id: 100, nombre: "Islandia", abreviatura: "ISL", escudo: "../view/img/ISL.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id: 101, nombre: "Austria", abreviatura: "AUT", escudo: "../view/img/AUT.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id: 102, nombre: "Hungria", abreviatura: "HUN", escudo: "../view/img/HUN.png", competiciones: [{id_competicion: 7, id_grupo: 16}]});
	equipos.push({ id: 122, nombre: "At.Osasuna", abreviatura: "OSA", escudo: "../view/img/OSA.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 121, nombre: "CD Legan&eacute;s", abreviatura: "LEG", escudo: "../view/img/LEG.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 120, nombre: "Deportivo Alav&eacute;s SAD", abreviatura: "ALA", escudo: "../view/img/ALA.png", competiciones: [{id_competicion: 8, id_grupo: 17}]});
	equipos.push({ id: 119, nombre: "Desconocido", abreviatura: "DES", escudo: "../view/img/NONE.png", competiciones: []});
	return equipos;
}

function getEquiposCompeticion(id_competicion){
	var equipos = getEquipos();
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
	var equipos = getEquipos();
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

function getJornadas(){
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
	var jornadas = getJornadas();
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
					  if( !('error' in obj) ) {
						  resultado = obj.result;
					  }
					  else {
						  console.log(obj.error);
					  }
				}
	});
	return resultado;

}