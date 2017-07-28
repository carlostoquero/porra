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
							'<li><a href="./adm_usuarios.html">Validar</a></li>' + 
						'</ul>' + 
					'</li>');
	
	var actions = $('<ul>');
	actions.append('<li><a href="./gest_editar.html">Editar perfil</a></li>' + 
				   '<li><a href="./comp_cambiar.html">Cambiar competicion</a></li>' + 
				   '<li><a href="./logout.html">Salir</a></li>');

	$('.menu').append(mainMenu);
	$('.menu').append(actions);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getTiposCompeticion(){
	var tipos_competicion = [];
	tipos_competicion.push({id: 1, nombre: "Liga"});
	tipos_competicion.push({id: 2, nombre: "Copa"});
	tipos_competicion.push({id: 3, nombre: "Mixto"});
	return tipos_competicion;
}

function getTiposJornada(){
	var tipos_jornada = [];
	tipos_jornada.push({id: 1, nombre: "Liga"});
	tipos_jornada.push({id: 2, nombre: "Copa"});
	return tipos_jornada;
}

function getAccesosUsuario() {
	var accesos_usuario = [];
	accesos_usuario.push({id: 1, nombre: "Usuario"});
	accesos_usuario.push({id: 2, nombre: "Administrador"});
	return accesos_usuario;
}

function getEstadosUsuario(){
	var estados_usuario = [];
	estados_usuario.push({id: 0, nombre: "PENDIENTE"});
	estados_usuario.push({id: 1, nombre: "VALIDADO"});
	estados_usuario.push({id: 2, nombre: "RECHAZADO"});
	return estados_usuario;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FIN INFORMACION MAESTRA
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getCompeticiones(){
	var competiciones = [];
	competiciones.push({id: 1, nombre: "Mundial Brasil 2014", 			titulo: "La porra del mundial", subtitulo: "FIFA World Cup Brasil 2014", siglas: "wc-14", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id: 2, nombre: "Liga BBVA 2014 - 2015", 		titulo: "Porra Liga BBVA 2014 - 2015", subtitulo: "LFP", siglas: "le-14", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id: 3, nombre: "Liga BBVA 2015 - 2016", 		titulo: "Porra Liga BBVA 2015 - 2016", subtitulo: "LFP", siglas: "le-15", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
	competiciones.push({id: 4, nombre: "Eurocopa Francia 2016", 		titulo: "La porra de la Eurocopa", subtitulo: "UEFA Euro 2016", siglas: "ec-16", tipo_competicion: {id: 3, nombre: "Mixto"}, reglas: ""});
	competiciones.push({id: 5, nombre: "La Liga Santander 2016-2017", 	titulo: "Porra Liga 2016-2017", subtitulo: "LFP", siglas: "le-16", tipo_competicion: {id: 1, nombre: "Liga"}, reglas: ""});
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
	grupos.push({ id: 10, nombre: "Primera Division", id_competicion: 3});
	grupos.push({ id: 11, nombre: "A", id_competicion: 4});
	grupos.push({ id: 12, nombre: "B", id_competicion: 4});
	grupos.push({ id: 13, nombre: "C", id_competicion: 4});
	grupos.push({ id: 14, nombre: "D", id_competicion: 4});
	grupos.push({ id: 15, nombre: "E", id_competicion: 4});
	grupos.push({ id: 16, nombre: "F", id_competicion: 4});
	grupos.push({ id: 17, nombre: "Primera Division", id_competicion: 5});
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
	equipos.push({ id: 2, nombre: "Croacia", abreviatura: "CRO", escudo: "../view/img/CRO.png", competiciones: [{id_competicion: 1, id_grupo: 1}, {id_competicion: 4, id_grupo: 14}]});
	equipos.push({ id: 3, nombre: "M&eacute;xico", abreviatura: "MEX", escudo: "../view/img/MEX.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id: 4, nombre: "Camer&uacute;n", abreviatura: "CMR", escudo: "../view/img/CMR.png", competiciones: [{id_competicion: 1, id_grupo: 1}]});
	equipos.push({ id: 5, nombre: "Espa&ntilde;a", abreviatura: "SPA", escudo: "../view/img/ESP.png", competiciones: [{id_competicion: 1, id_grupo: 2}, {id_competicion: 4, id_grupo: 14}]});
	equipos.push({ id: 6, nombre: "Holanda", abreviatura: "HOL", escudo: "../view/img/HOL.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 7, nombre: "Chile", abreviatura: "CHI", escudo: "../view/img/CHI.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 8, nombre: "Australia", abreviatura: "AUS", escudo: "../view/img/AUS.png", competiciones: [{id_competicion: 1, id_grupo: 2}]});
	equipos.push({ id: 9, nombre: "Colombia", abreviatura: "COL", escudo: "../view/img/COL.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 10, nombre: "Grecia", abreviatura: "GRE", escudo: "../view/img/GRE.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 11, nombre: "Costa de Marfil", abreviatura: "CIV", escudo: "../view/img/CIV.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 12, nombre: "Jap&oacute;n", abreviatura: "JPN", escudo: "../view/img/JPN.png", competiciones: [{id_competicion: 1, id_grupo: 3}]});
	equipos.push({ id: 13, nombre: "Uruguay", abreviatura: "URU", escudo: "../view/img/URU.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id: 14, nombre: "Costa Rica", abreviatura: "CRC", escudo: "../view/img/CRC.png", competiciones: [{id_competicion: 1, id_grupo: 4}]});
	equipos.push({ id: 15, nombre: "Inglaterra", abreviatura: "ING", escudo: "../view/img/ING.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 4, id_grupo: 12}]});
	equipos.push({ id: 16, nombre: "Italia", abreviatura: "ITA", escudo: "../view/img/ITA.png", competiciones: [{id_competicion: 1, id_grupo: 4}, {id_competicion: 4, id_grupo: 15}]});
	equipos.push({ id: 17, nombre: "Suiza", abreviatura: "SUI", escudo: "../view/img/SUI.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 4, id_grupo: 11}]});
	equipos.push({ id: 18, nombre: "Ecuador", abreviatura: "ECU", escudo: "../view/img/ECU.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id: 19, nombre: "Francia", abreviatura: "FRA", escudo: "../view/img/FRA.png", competiciones: [{id_competicion: 1, id_grupo: 5}, {id_competicion: 4, id_grupo: 11}]});
	equipos.push({ id: 20, nombre: "Honduras", abreviatura: "HON", escudo: "../view/img/HON.png", competiciones: [{id_competicion: 1, id_grupo: 5}]});
	equipos.push({ id: 21, nombre: "Argentina", abreviatura: "ARG", escudo: "../view/img/ARG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 22, nombre: "Bosnia y Herzegovina", abreviatura: "BIH", escudo: "../view/img/BIH.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 23, nombre: "Ir&aacute;n", abreviatura: "IRN", escudo: "../view/img/IRN.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 24, nombre: "Nigeria", abreviatura: "NIG", escudo: "../view/img/NIG.png", competiciones: [{id_competicion: 1, id_grupo: 6}]});
	equipos.push({ id: 25, nombre: "Alemania", abreviatura: "ALE", escudo: "../view/img/ALE.png", competiciones: [{id_competicion: 1, id_grupo: 7}, {id_competicion: 4, id_grupo: 13}]});
	equipos.push({ id: 26, nombre: "Portugal", abreviatura: "POR", escudo: "../view/img/POR.png", competiciones: [{id_competicion: 1, id_grupo: 7},  {id_competicion: 4, id_grupo: 16}]});
	equipos.push({ id: 27, nombre: "Ghana", abreviatura: "GHA", escudo: "../view/img/GHA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id: 28, nombre: "Estados Unidos", abreviatura: "USA", escudo: "../view/img/USA.png", competiciones: [{id_competicion: 1, id_grupo: 7}]});
	equipos.push({ id: 29, nombre: "B&eacute;lgica", abreviatura: "BEL", escudo: "../view/img/BEL.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 4, id_grupo: 15}]});
	equipos.push({ id: 30, nombre: "Argelia", abreviatura: "ALG", escudo: "../view/img/ALG.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id: 31, nombre: "Rusia", abreviatura: "RUS", escudo: "../view/img/RUS.png", competiciones: [{id_competicion: 1, id_grupo: 8}, {id_competicion: 4, id_grupo: 12}]});
	equipos.push({ id: 32, nombre: "Corea", abreviatura: "KOR", escudo: "../view/img/KOR.png", competiciones: [{id_competicion: 1, id_grupo: 8}]});
	equipos.push({ id: 71, nombre: "C&oacute;rdoba", abreviatura: "COR", escudo: "../view/img/COR.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 66, nombre: "Almer&iacute;a", abreviatura: "ALM", escudo: "../view/img/ALM.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 67, nombre: "Athletic de Bilbao", abreviatura: "ATH", escudo: "../view/img/ATH.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 68, nombre: "Atl&eacute;tico de Madrid", abreviatura: "ATM", escudo: "../view/img/ATM.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 69, nombre: "Barcelona", abreviatura: "FCB", escudo: "../view/img/FCB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 70, nombre: "Celta", abreviatura: "CEL", escudo: "../view/img/CEL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 72, nombre: "Deportivo de la Coru�a", abreviatura: "DEP", escudo: "../view/img/DEP.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 73, nombre: "Eibar", abreviatura: "EIB", escudo: "../view/img/EIB.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 74, nombre: "Elche", abreviatura: "ELC", escudo: "../view/img/ELC.png", competiciones: [{id_competicion: 2, id_grupo: 9}]});
	equipos.push({ id: 75, nombre: "Espanyol", abreviatura: "ESP", escudo: "../view/img/ESY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 76, nombre: "Getafe", abreviatura: "GET", escudo: "../view/img/GET.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}]});
	equipos.push({ id: 77, nombre: "Granada", abreviatura: "GRA", escudo: "../view/img/GRA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 78, nombre: "Levante", abreviatura: "LEV", escudo: "../view/img/LEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}]});
	equipos.push({ id: 79, nombre: "M&aacute;laga", abreviatura: "MAL", escudo: "../view/img/MAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 80, nombre: "Real Madrid", abreviatura: "RMA", escudo: "../view/img/RMA.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 81, nombre: "Real Sociedad", abreviatura: "RSO", escudo: "../view/img/RSO.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 82, nombre: "Rayo Vallecano", abreviatura: "RAY", escudo: "../view/img/RAY.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}]});
	equipos.push({ id: 83, nombre: "Sevilla", abreviatura: "SEV", escudo: "../view/img/SEV.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 84, nombre: "Valencia", abreviatura: "VAL", escudo: "../view/img/VAL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 85, nombre: "Villarreal", abreviatura: "VIL", escudo: "../view/img/VIL.png", competiciones: [{id_competicion: 2, id_grupo: 9}, {id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 86, nombre: "Real Betis", abreviatura: "BET", escudo: "../view/img/BET.png", competiciones: [{id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 87, nombre: "Sporting de Gij&oacute;n", abreviatura: "SPO", escudo: "../view/img/SPO.png", competiciones: [{id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 88, nombre: "Las Palmas", abreviatura: "LPA", escudo: "../view/img/LPA.png", competiciones: [{id_competicion: 3, id_grupo: 10}, {id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 89, nombre: "Rumania", abreviatura: "RUM", escudo: "../view/img/RUM.png", competiciones: [{id_competicion: 4, id_grupo: 11}]});
	equipos.push({ id: 90, nombre: "Albania", abreviatura: "ALB", escudo: "../view/img/ALB.png", competiciones: [{id_competicion: 4, id_grupo: 11}]});
	equipos.push({ id: 91, nombre: "Gales", abreviatura: "WAL", escudo: "../view/img/WAL.png", competiciones: [{id_competicion: 4, id_grupo: 12}]});
	equipos.push({ id: 92, nombre: "Eslovaquia", abreviatura: "SVK", escudo: "../view/img/SVK.png", competiciones: [{id_competicion: 4, id_grupo: 12}]});
	equipos.push({ id: 93, nombre: "Polonia", abreviatura: "POL", escudo: "../view/img/POL.png", competiciones: [{id_competicion: 4, id_grupo: 13}]});
	equipos.push({ id: 94, nombre: "Irlanda del Norte", abreviatura: "NIR", escudo: "../view/img/NIR.png", competiciones: [{id_competicion: 4, id_grupo: 13}]});
	equipos.push({ id: 95, nombre: "Ucrania", abreviatura: "UKR", escudo: "../view/img/UKR.png", competiciones: [{id_competicion: 4, id_grupo: 13}]});
	equipos.push({ id: 96, nombre: "Republica checa", abreviatura: "CZK", escudo: "../view/img/CZK.png", competiciones: [{id_competicion: 4, id_grupo: 14}]});
	equipos.push({ id: 97, nombre: "Turquia", abreviatura: "TUR", escudo: "../view/img/TUR.png", competiciones: [{id_competicion: 4, id_grupo: 14}]});
	equipos.push({ id: 98, nombre: "Irlanda", abreviatura: "IRL", escudo: "../view/img/IRL.png", competiciones: [{id_competicion: 4, id_grupo: 15}]});
	equipos.push({ id: 99, nombre: "Suecia", abreviatura: "SWE", escudo: "../view/img/SWE.png", competiciones: [{id_competicion: 4, id_grupo: 15}]});
	equipos.push({ id: 100, nombre: "Islandia", abreviatura: "ISL", escudo: "../view/img/ISL.png", competiciones: [{id_competicion: 4, id_grupo: 16}]});
	equipos.push({ id: 101, nombre: "Austria", abreviatura: "AUT", escudo: "../view/img/AUT.png", competiciones: [{id_competicion: 4, id_grupo: 16}]});
	equipos.push({ id: 102, nombre: "Hungria", abreviatura: "HUN", escudo: "../view/img/HUN.png", competiciones: [{id_competicion: 4, id_grupo: 16}]});
	equipos.push({ id: 122, nombre: "At.Osasuna", abreviatura: "OSA", escudo: "../view/img/OSA.png", competiciones: [{id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 121, nombre: "CD Legan&eacute;s", abreviatura: "LEG", escudo: "../view/img/LEG.png", competiciones: [{id_competicion: 5, id_grupo: 17}]});
	equipos.push({ id: 120, nombre: "Deportivo Alav&eacute;s SAD", abreviatura: "ALA", escudo: "../view/img/ALA.png", competiciones: [{id_competicion: 5, id_grupo: 17}]});
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
		jornadas.push({id: id_jornada++, numero: i, nombre: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 3});
	}
	
	// Jornadas Eurocopa
	jornadas.push({id: id_jornada++, numero: 1, nombre: 'Jornada 01', nombre_corto: 'J01', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 4});
	jornadas.push({id: id_jornada++, numero: 2, nombre: 'Jornada 02', nombre_corto: 'J02', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 4});
	jornadas.push({id: id_jornada++, numero: 3, nombre: 'Jornada 03', nombre_corto: 'J03', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 4});
	jornadas.push({id: id_jornada++, numero: 4, nombre: 'Cuartos de final', nombre_corto: 'QF' , fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 4});
	jornadas.push({id: id_jornada++, numero: 5, nombre: 'Semifinales', nombre_corto: 'SF', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 4});
	jornadas.push({id: id_jornada++, numero: 6, nombre: 'Final', nombre_corto: 'F', fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 2, nombre: 'Copa' }, id_competicion: 4});
	
	// Jornadas liga 16-17
	for (i = 1; i <= 38; i++){
		jornadas.push({id: id_jornada++, numero: i, nombre: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_hora: '19-08-2016 20:45', tipo_jornada: { id: 1, nombre: 'Liga' }, id_competicion: 5});
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
	partidos.push({id: 1, equipo_1: {id: 1, nombre: 'Malaga', abreviatura: 'MAL', escudo: 'MAL.png'}, 					equipo_2: {id: 2, nombre: 'Osasuna', abreviatura: 'OSA', escudo: 'OSA.png'}, 				goles_equipo_1: 1, goles_equipo_2: 1, estadio: "La Rosaleda", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 2,  equipo_1: {id: 3, nombre: 'Deportivo de la Coruña', abreviatura: 'DEP', escudo: 'DEP.png'}, 	equipo_2: {id: 4, nombre: 'Eibar', abreviatura: 'EIB', escudo: 'EIB.png'},					goles_equipo_1: 2, goles_equipo_2: 1, estadio: "Riazor", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 3,  equipo_1: {id: 5, nombre: 'FC Barcelona', abreviatura: 'FCB', escudo: 'FCB.png'}, 			equipo_2: {id: 6, nombre: 'Real Betis', abreviatura: 'BET', escudo: 'BET.png'}, 			goles_equipo_1: 6, goles_equipo_2: 2, estadio: "Camp Nou", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 4,  equipo_1: {id: 7, nombre: 'Granada', abreviatura: 'GRA', escudo: 'GRA.png'}, 				equipo_2: {id: 8, nombre: 'Villarreal', abreviatura: 'VIL', escudo: 'VIL.png'}, 			goles_equipo_1: 1, goles_equipo_2: 1, estadio: "Nuevo Los Cármenes", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 5,  equipo_1: {id: 9, nombre: 'Sevilla', abreviatura: 'SEV', escudo: 'SEV.png'}, 				equipo_2: {id: 10, nombre: 'Español', abreviatura: 'ESP', escudo: 'ESY.png'}, 				goles_equipo_1: 6, goles_equipo_2: 4, estadio: "Sánchez Pizjuán", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 6,  equipo_1: {id: 11, nombre: 'Sporting de Gijón', abreviatura: 'SPO', escudo: 'SPO.png'}, 		equipo_2: {id: 12, nombre: 'Athletic de Bilbao', abreviatura: 'ATH', escudo: 'ATH.png'}, 	goles_equipo_1: 2, goles_equipo_2: 1, estadio: "El Molinón", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 7,  equipo_1: {id: 13, nombre: 'Real Sociedad', abreviatura: 'RSO', escudo: 'RSO.png'}, 			equipo_2: {id: 14, nombre: 'Real Madrid', abreviatura: 'RMA', escudo: 'RMA.png'}, 			goles_equipo_1: 0, goles_equipo_2: 3, estadio: "Anoeta", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 8,  equipo_1: {id: 15, nombre: 'Atlético de Madrid', abreviatura: 'ATM', escudo: 'ATM.png'}, 	equipo_2: {id: 16, nombre: 'Alavés', abreviatura: 'ALA', escudo: 'ALA.png'}, 				goles_equipo_1: 1, goles_equipo_2: 1, estadio: "Vicente Calderón", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 9,  equipo_1: {id: 17, nombre: 'Celta de Vigo', abreviatura: 'CEL', escudo: 'CEL.png'}, 			equipo_2: {id: 18, nombre: 'Leganés', abreviatura: 'LEG', escudo: 'LEG.png'}, 				goles_equipo_1: 0, goles_equipo_2: 1, estadio: "Balaídos", fecha_hora: '19-08-2016 20:45'});
	partidos.push({id: 10, equipo_1: {id: 19, nombre: 'Valencia', abreviatura: 'VAL', escudo: 'VAL.png'}, 				equipo_2: {id: 20, nombre: 'Las Palmas', abreviatura: 'LPA', escudo: 'LPA.png'}, 			goles_equipo_1: 2, goles_equipo_2: 4, estadio: "Mestalla", fecha_hora: '19-08-2016 20:45'});
	return partidos;
}

function getUsuarios(){
	var usuarios = [];
	usuarios.push({id: 1, login: "Lario"});
	usuarios.push({id: 2, login: "Tokero"});
	usuarios.push({id: 3, login: "jluzon"});
	usuarios.push({id: 4, login: "pinguinino"});
	usuarios.push({id: 5, login: "jorgjim"});
	usuarios.push({id: 6, login: "juanrilla"});
	usuarios.push({id: 7, login: "Javi"});
	usuarios.push({id: 8, login: "sofiadenao"});
	usuarios.push({id: 9, login: "alvaro"});
	usuarios.push({id: 10, login: "Angel"});
	usuarios.push({id: 11, login: "Pepe"});
	usuarios.push({id: 12, login: "juanjo"});
	return usuarios;
}

function getPronosticos(id_jornada){
	var pronosticos = [];
	for (idUsuario = 0; idUsuario <= 12; idUsuario++){
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
	for (idUsuario = 0; idUsuario <= 12; idUsuario++){
		if (idUsuario % 7 !== 0){
			for (idJornada = 0; idJornada <= 22; idJornada++){
				puntos.push({id_usuario: idUsuario, id_jornada: idJornada, valor: 5});
			}
		}
	}
	return puntos;
}

function getJornadaActual(){
	return 1;
}