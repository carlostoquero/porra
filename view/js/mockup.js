function getTiposCompeticionMockup(){
	var tipos_competicion = [];
	tipos_competicion.push({id_tipo_competicion: 1, nombre_tipo_competicion: "Liga"});
	tipos_competicion.push({id_tipo_competicion: 2, nombre_tipo_competicion: "Copa"});
	tipos_competicion.push({id_tipo_competicion: 3, nombre_tipo_competicion: "Mixto"});
	return tipos_competicion;
}

function getTiposJornadaMockup(){
	var tipos_jornada = [];
	tipos_jornada.push({id_tipo_jornada: 1, nombre_tipo_jornada: "Liga"});
	tipos_jornada.push({id_tipo_jornada: 2, nombre_tipo_jornada: "Copa"});
	return tipos_jornada;
}

function getAccesosUsuarioMockup() {
	var accesos_usuario = [];
	accesos_usuario.push({id_acceso: 1, nombre_acceso: "Usuario"});
	accesos_usuario.push({id_acceso: 2, nombre_acceso: "Administrador"});
	return accesos_usuario;
}

function getEstadosUsuarioMockup(){
	var estados_usuario = [];
	estados_usuario.push({id_estado: 0, nombre_estado: "PENDIENTE"});
	estados_usuario.push({id_estado: 1, nombre_estado: "VALIDADO"});
	estados_usuario.push({id_estado: 2, nombre_estado: "RECHAZADO"});
	return estados_usuario;
}

function getCompeticionesMockup(){
	var competiciones = [];
	competiciones.push({id_competicion: 1, nombre_competicion: "Mundial Brasil 2014", 			titulo: "La porra del mundial", subtitulo: "FIFA World Cup Brasil 2014", siglas: "wc-14", id_tipo_competicion: 3, reglas: "Prueba de contenido para reglas"});
	competiciones.push({id_competicion: 2, nombre_competicion: "Liga BBVA 2014 - 2015", 		titulo: "Porra Liga BBVA 2014 - 2015", subtitulo: "LFP", siglas: "le-14", id_tipo_competicion: 1, reglas: "Prueba de contenido para reglas"});
	competiciones.push({id_competicion: 6, nombre_competicion: "Liga BBVA 2015 - 2016", 		titulo: "Porra Liga BBVA 2015 - 2016", subtitulo: "LFP", siglas: "le-15", id_tipo_competicion: 1, reglas: "Prueba de contenido para reglas"});
	competiciones.push({id_competicion: 7, nombre_competicion: "Eurocopa Francia 2016", 		titulo: "La porra de la Eurocopa", subtitulo: "UEFA Euro 2016", siglas: "ec-16", id_tipo_competicion: 3, reglas: "Prueba de contenido para reglas"});
	competiciones.push({id_competicion: 8, nombre_competicion: "La Liga Santander 2016-2017", 	titulo: "Porra Liga 2016-2017", subtitulo: "LFP", siglas: "le-16", id_tipo_competicion: 1, reglas: "Prueba de contenido para reglas"});
	return competiciones;
}

function getGruposMockup(){
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

function getGruposCompeticionMockup(id_competicion){
	var grupos = getGruposMockup();
	var grupos_competicion = $.grep(grupos, function(grupo, index){
		return grupo.id_competicion === id_competicion;
	});
	return grupos_competicion;
}

function getCompeticionesUsuarioMockup(id_usuario){
	var competiciones_usuario = getCompeticionesMockup();
	$.each(competiciones_usuario, function(item, competicion){
		competicion.id_usuario = id_usuario;
	});
	return competiciones_usuario;
}


function getEquiposMockup(){
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

function getEquiposCompeticionMockup(id_competicion){
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

function getCompeticionesEquipoMockup(id_equipo){
	var competiciones_equipo = [];
	var equipo = findElementByField(getEquiposMockup(), "id_equipo", id_equipo);
	if (equipo !== null){
		competiciones_equipo = equipo.competiciones;
	}
	return competiciones_equipo;
}

function getEquiposGrupoMockup(id_grupo){
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

function getEstadiosMockup(){
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

function getJornadasMockup(){
	var jornadas = [];
	var id_jornada = 1;
	
	// Jornadas Mundial
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 1, nombre_jornada: 'Jornada 01', nombre_corto: 'J01', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 2, nombre_jornada: 'Jornada 02', nombre_corto: 'J02', fecha_inicio: '2018-08-19 20:45:00', fecha_fin: '2018-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 3, nombre_jornada: 'Jornada 03', nombre_corto: 'J03', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 4, nombre_jornada: 'Octavos de final', nombre_corto: 'OF', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 5, nombre_jornada: 'Cuartos de final', nombre_corto: 'QF' , fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 6, nombre_jornada: 'Semifinales', nombre_corto: 'SF', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 1});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 7, nombre_jornada: 'Final', nombre_corto: 'F', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 1});
	
	// Jornadas liga 14-15
	for (i = 1; i <= 38; i++){
		jornadas.push({id_jornada: id_jornada++, numero_jornada: i, nombre_jornada: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 2});
	}
	
	// Jornada liga 15-16
	for (i = 1; i <= 38; i++){
		jornadas.push({id_jornada: id_jornada++, numero_jornada: i, nombre_jornada: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 6});
	}
	
	// Jornadas Eurocopa
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 1, nombre_jornada: 'Jornada 01', nombre_corto: 'J01', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 7});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 2, nombre_jornada: 'Jornada 02', nombre_corto: 'J02', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 7});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 3, nombre_jornada: 'Jornada 03', nombre_corto: 'J03', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 7});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 4, nombre_jornada: 'Cuartos de final', nombre_corto: 'QF' , fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 7});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 5, nombre_jornada: 'Semifinales', nombre_corto: 'SF', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 7});
	jornadas.push({id_jornada: id_jornada++, numero_jornada: 6, nombre_jornada: 'Final', nombre_corto: 'F', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 2, id_competicion: 7});
	
	// Jornadas liga 16-17
	for (i = 1; i <= 38; i++){
		jornadas.push({id_jornada: id_jornada++, numero_jornada: i, nombre_jornada: 'Jornada ' + ('00' + i).slice(-2), nombre_corto: 'J' + ('00' + i).slice(-2), fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 8});
	}
	return jornadas;
}

function getJornadasCompeticionMockup(id_competicion){
	var jornadas = getJornadasMockup();
	var jornadas_competicion = $.grep(jornadas, function(jornada, index){
		return jornada.id_competicion === id_competicion;
	});
	return jornadas_competicion;
}

function getPartidosJornadaMockup(id_jornada){
	var partidos = [];
	partidos.push({id_partido: 1,  id_equipo_1: 1,  id_equipo_2: 2,  goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 1, fecha_hora: '2016-08-19 20:45:00', id_grupo: 1});
	partidos.push({id_partido: 2,  id_equipo_1: 3,  id_equipo_2: 4,  goles_equipo_1: 2, goles_equipo_2: 1, id_estadio: 2, fecha_hora: '2016-08-19 20:45:00', id_grupo: 1});
	partidos.push({id_partido: 3,  id_equipo_1: 5,  id_equipo_2: 6,  goles_equipo_1: 6, goles_equipo_2: 2, id_estadio: 3, fecha_hora: '2016-08-19 20:45:00', id_grupo: 2});
	partidos.push({id_partido: 4,  id_equipo_1: 7,  id_equipo_2: 8,  goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 4, fecha_hora: '2016-08-19 20:45:00', id_grupo: 2});
	partidos.push({id_partido: 5,  id_equipo_1: 9,  id_equipo_2: 10, goles_equipo_1: 6, goles_equipo_2: 4, id_estadio: 5, fecha_hora: '2016-08-19 20:45:00', id_grupo: 3});
	partidos.push({id_partido: 6,  id_equipo_1: 11, id_equipo_2: 12, goles_equipo_1: 2, goles_equipo_2: 1, id_estadio: 6, fecha_hora: '2016-08-19 20:45:00', id_grupo: 3});
	partidos.push({id_partido: 7,  id_equipo_1: 13, id_equipo_2: 14, goles_equipo_1: 0, goles_equipo_2: 3, id_estadio: 7, fecha_hora: '2016-08-19 20:45:00', id_grupo: 4});
	partidos.push({id_partido: 8,  id_equipo_1: 15, id_equipo_2: 16, goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 8, fecha_hora: '2016-08-19 20:45:00', id_grupo: 4});
	partidos.push({id_partido: 9,  id_equipo_1: 17, id_equipo_2: 18, goles_equipo_1: 0, goles_equipo_2: 1, id_estadio: 9, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	partidos.push({id_partido: 10, id_equipo_1: 19, id_equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, id_estadio: 10, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	return partidos;
}

function getUsuariosMockup(){
	var usuarios = [];
	usuarios.push({ id_usuario: 8, login: "Tokero", nombre: "Carlos", apellidos: "Toquero", comentarios: " ", email: "carlostoquero@gmail.com", id_estado: 1, id_acceso: 2, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 10, login: "jluzon", nombre: "Jairo", apellidos: "Luz�n", comentarios: "No comment ", email: "jairoluzon@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 11, login: "Lario", nombre: "Alberto", apellidos: "Lario", comentarios: "Dise�ador del sitio ", email: "lariobyte@gmail.com", id_estado: 1, id_acceso: 2, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 13, login: "jorgjim", nombre: "Jorge", apellidos: "Jimenez Pose", comentarios: "Pose campe�n!!", email: "jorgjim@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 14, login: "pinguinino", nombre: "Carlos", apellidos: "Fresno", comentarios: "Nos conocemos de alguna borrachera que otra...", email: "pinguinino@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 15, login: "juanrilla", nombre: "Juan Ram�nn", apellidos: "Garc�a Fern�ndez", comentarios: "Voy a pelar unos cuantos pollos...", email: "juanramongarcia@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 16, login: "juanignaciosl", nombre: "Nacho", apellidos: "S�nchez", comentarios: "Creo que no hay suficientes campos de registro, sexo, color de pelo y talla son fundamentales tambi�n =D", email: "aaa", id_estado: 2, id_acceso: 1, competiciones: [		]});
	usuarios.push({ id_usuario: 19, login: "Pepe", nombre: "Pepe", apellidos: "Toquero S�nchez", comentarios: "", email: "joseatoquero@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 20, login: "Uvekefu", nombre: "Jose A.", apellidos: "Garc�a", comentarios: "Viva el Mister de la PD Hermanos", email: "uvekefu@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 21, login: "Chuchi69", nombre: "Jes�s", apellidos: "Diego G�lvez", comentarios: "", email: "Ewerthon_85@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 22, login: "sofiadenao", nombre: "Sofia", apellidos: "P�rez Gonz�lez ", comentarios: "", email: "sofiadenao@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 23, login: "flipi", nombre: "Miguel", apellidos: "Pena", comentarios: "Los de salinas los mejores", email: "miguel.migeling@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 24, login: "Gaby", nombre: "gabriel", apellidos: "rodr�guez", comentarios: "", email: "gabriel10@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7	]});
	usuarios.push({ id_usuario: 25, login: "jiye", nombre: "Guillermo", apellidos: "Santofan", comentarios: "Lo hablamos", email: "gsimmross@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 26, login: "raujipo", nombre: "Raul ", apellidos: "Jimenez Pose", comentarios: "Hola, soy Raul (Mane), el hermano de Pose de Avila. ", email: "raujipo@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 27, login: "felixuco1981", nombre: "J.Felix", apellidos: "Jimenez Jimenez", comentarios: "Soy Felix de Avila", email: "felixuco533@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 28, login: "ana.g", nombre: "ANA", apellidos: "GONZALEZ ALVARADO", comentarios: "��� VAAAMOS ESPA�A !!!!!", email: "ana.g.alvarado1981@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 29, login: "bpenmar", nombre: "Benito", apellidos: "PM", comentarios: "", email: "bpenmar@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 30, login: "Jesi", nombre: "Jesi", apellidos: "Roman", comentarios: "jesy sexy!", email: "jessy_delfin@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 31, login: "Mario", nombre: "Mario", apellidos: "Martin", comentarios: "", email: "mariete83@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 32, login: "Ginny", nombre: "Virginia", apellidos: "Garc�a Garc�a", comentarios: "", email: "Virginny03@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 33, login: "Mitxelebb", nombre: "Miguel", apellidos: "Gonz�lez Alvarado", comentarios: "", email: "Mitxelebb@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 35, login: "Alberto", nombre: "Alberto", apellidos: "Alvarez Toquero", comentarios: "Primo TOK", email: "ea.alvatok@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 6	]});
	usuarios.push({ id_usuario: 36, login: "Gerardo", nombre: "Gerardo", apellidos: "Marcos gomez", comentarios: "", email: "gmargom@ono.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 37, login: "Angel", nombre: "Angel Luis", apellidos: "Sanchez Mata", comentarios: "Que soy yo. El primo de Pepe", email: "sancmata@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 38, login: "dolphy77", nombre: "AURE VIOREL", apellidos: "ALBU", comentarios: "", email: "aurelviorel21@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 39, login: "juanjo", nombre: "Juanjo", apellidos: "Toquero Nieto", comentarios: "", email: "juanitotok_84@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 40, login: "Luigi", nombre: "Luis", apellidos: "Ferrari Nieto", comentarios: "Amigo pervertido del guiller", email: "lfernie79@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 41, login: "Alvaro", nombre: "A�lvaro", apellidos: "Lario Velasco", comentarios: "", email: "alv_lario@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 7, 8	]});
	usuarios.push({ id_usuario: 42, login: "barrilla", nombre: "Javier", apellidos: "Barra", comentarios: "Hola, Javier Barra para jugar, con el n�mero 11 a la espalda si puede ser! jejeje", email: "jbarra@spanishplayer.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 43, login: "Fran1977", nombre: "FRANCISCO MANUEL", apellidos: "MARTIN ARRABAL", comentarios: "", email: "jatar2000@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 44, login: "Javi", nombre: "Javier", apellidos: "Gonz�lez Alvarado", comentarios: "", email: "Karpkoeman1978@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 6, 7, 8	]});
	usuarios.push({ id_usuario: 45, login: "angelito", nombre: "Angel", apellidos: "rodriguez serrador", comentarios: "Compa�ero Alberto ��lvarez", email: "gil19@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	1	]});
	usuarios.push({ id_usuario: 46, login: "Roman", nombre: "Joni", apellidos: "Rom�n Garc�a", comentarios: "VIVA ESPA�A ", email: "jonimaster2@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 47, login: "kulter84", nombre: "Borja", apellidos: "Martin de Frutos", comentarios: "BORJA PE�A HERMANOS", email: "ajrob1984@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	1, 2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 51, login: "_sabelotodo", nombre: "Usuario", apellidos: "Sabelotodo", comentarios: "", email: "usuario@sabelotodo.com", id_estado: 2, id_acceso: 1, competiciones: [		]});
	usuarios.push({ id_usuario: 52, login: "alber_collantes", nombre: "Alberto", apellidos: "Collantes Z��iga", comentarios: "Amigo Juanra", email: "albertocollantes@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 53, login: "Blanco", nombre: "Rub�n", apellidos: "Blanco", comentarios: "", email: "rubenblanco1979@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 54, login: "Cordo", nombre: "Carlos", apellidos: "Cordob�s Espeja", comentarios: "", email: "cordo_10@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 55, login: "Cristina", nombre: "Cristina", apellidos: "Amo Iglesias", comentarios: "", email: "cristina3581@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 56, login: "Diego", nombre: "Diego", apellidos: "Robert", comentarios: "", email: "diegopucela@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 57, login: "rulopedrajax", nombre: "Raul", apellidos: "Carretero", comentarios: "Primo Fresno", email: "raul.carretero@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2	]});
	usuarios.push({ id_usuario: 58, login: "chavo", nombre: "Rub�n", apellidos: "Casillas", comentarios: "Amigo Pose", email: "rcrcas@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2, 6, 7	]});
	usuarios.push({ id_usuario: 59, login: "Richard", nombre: "Ricardo", apellidos: "Mart�n Frutos", comentarios: "", email: "richarmartin@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	2, 6, 7, 8	]});
	usuarios.push({ id_usuario: 60, login: "Jonastrum", nombre: "Jonatan", apellidos: "Casillas", comentarios: "Hermano de ruben (chavo)", email: "rubio_a3_@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id_usuario: 61, login: "Carletto", nombre: "Carlos augusto", apellidos: "Lopez alonso", comentarios: "", email: "Clopez_alonso@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7	]});
	usuarios.push({ id_usuario: 62, login: "Jotaeme", nombre: "Jose", apellidos: "Perez gonzalez", comentarios: "", email: "Jotaemepuntog@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id_usuario: 63, login: "nando", nombre: "Fernando", apellidos: "Garcinu�o", comentarios: "", email: "nando_gm84@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7, 8	]});
	usuarios.push({ id_usuario: 64, login: "Andrew", nombre: "Andres", apellidos: "Castro Tirados", comentarios: "", email: "leondrew@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	6, 7	]});
	usuarios.push({ id_usuario: 65, login: "samurablack", nombre: "Juan Mamuel", apellidos: "Rodriguez Pedruelo", comentarios: "", email: "samurablack@yahoo.es", id_estado: 1, id_acceso: 1, competiciones: [	6, 8	]});
	usuarios.push({ id_usuario: 66, login: "benjamin", nombre: "benjamin", apellidos: "manrique", comentarios: "", email: "bmanrique@impalag.es", id_estado: 0, id_acceso: 1, competiciones: [	6	]});
	usuarios.push({ id_usuario: 67, login: "olps70", nombre: "Oscar", apellidos: "Pollán  Somoza", comentarios: "Oscar laura", email: "lusgali@hotmail.es", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id_usuario: 68, login: "Guillerkai", nombre: "Guillermo", apellidos: "Garc�a Fern�ndez", comentarios: "Soy el hermano de Juanra, y pod�is ir aflojando la pasta que no ten�is nada que hacer XD", email: "guillergf83@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7	]});
	usuarios.push({ id_usuario: 69, login: "JoseInclam", nombre: "Jose", apellidos: "Rodr�guez de las Heras", comentarios: "Soy Jose, compa�ero de trabajo de Carlos y Juanra!", email: "josrodhe@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id_usuario: 70, login: "jhonete", nombre: "jonatan", apellidos: "fernandez camino", comentarios: "Esa hermanos!!!!!", email: "jhonete85@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8 ]});
	usuarios.push({ id_usuario: 71, login: "miguelmendez000", nombre: "Miguel", apellidos: "M�ndez", comentarios: "", email: "miguelmendez000@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id_usuario: 72, login: "a.gonzalez", nombre: "Alvaro", apellidos: "Gonzalez", comentarios: "", email: "a.gm130888@gmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7, 8	]});
	usuarios.push({ id_usuario: 73, login: "MINGUEZ", nombre: "VICTOR", apellidos: "MINGUEZ ORTEGO", comentarios: "", email: "minguez_atleti_90@hotmail.com", id_estado: 1, id_acceso: 1, competiciones: [	7	]});
	usuarios.push({ id_usuario: 74, login: "antuas", nombre: "antuas", apellidos: "lopez", comentarios: "", email: "tonnocorreo-personal@yahoo.es", id_estado: 0, id_acceso: 1, competiciones: [		]});
	return usuarios;
}

function getUsuariosCompeticionMockup(id_competicion){
	var usuarios = getUsuariosMockup();
	var usuariosCompeticion = $.grep(usuarios, function(usuario, index){
		return usuario.competiciones.indexOf(id_competicion) !== -1;
	});
	return usuariosCompeticion;
}

function getUsuarioMockup(id_usuario){
	return findElementByField(getUsuariosMockup(), "id_usuario", id_usuario);
}

function getCompeticionesUsuariosMockup(){
	var competiciones_usuarios = [];
	$.each(usuarios, function(index, usuario){
		$.each(usuario.competiciones, function(index, competicion){
			competiciones_usuarios.push({id_usuario: usuario.id_usuario, id_competicion: competicion, pagado: (usuario.id_usuario + competicion) % 2 });
		});
	});
	return competiciones_usuarios;
}

function getPronosticosMockup(id_jornada){
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

function getClasificacionUsuariosMockup(){
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

function getClasificacionLigaEquiposMockup(){
	var clasificacion_grupos = [];
	
	var clasificacion_equipos = [];
	clasificacion_equipos.push({id_equipo: 1,  jugados: 38, ganados: 29, empatados: 6, perdidos: 3, goles_favor: 106, goles_contra: 41, puntos: 93 });
	clasificacion_equipos.push({id_equipo: 2,  jugados: 38, ganados: 28, empatados: 6, perdidos: 4, goles_favor: 116, goles_contra: 37, puntos: 90 });
	clasificacion_equipos.push({id_equipo: 3,  jugados: 38, ganados: 23, empatados: 9, perdidos: 6, goles_favor: 70, goles_contra: 27, puntos: 78 });
	clasificacion_equipos.push({id_equipo: 4,  jugados: 38, ganados: 21, empatados: 9, perdidos: 8, goles_favor: 69, goles_contra: 49, puntos: 72 });
	clasificacion_equipos.push({id_equipo: 5,  jugados: 38, ganados: 19, empatados: 10, perdidos: 9, goles_favor: 56, goles_contra: 33, puntos: 67 });
	clasificacion_grupos["1"] = clasificacion_equipos ;

	clasificacion_equipos = [];
	clasificacion_equipos.push({id_equipo: 6,  jugados: 38, ganados: 19, empatados: 7, perdidos: 12, goles_favor: 59, goles_contra: 53, puntos: 64 });
	clasificacion_equipos.push({id_equipo: 7,  jugados: 38, ganados: 19, empatados: 6, perdidos: 13, goles_favor: 53, goles_contra: 43, puntos: 63 });
	clasificacion_equipos.push({id_equipo: 8,  jugados: 38, ganados: 15, empatados: 11, perdidos: 12, goles_favor: 49, goles_contra: 50, puntos: 56 });
	clasificacion_equipos.push({id_equipo: 9,  jugados: 38, ganados: 14, empatados: 13, perdidos: 11, goles_favor: 41, goles_contra: 43, puntos: 55 });
	clasificacion_equipos.push({id_equipo: 10, jugados: 38, ganados: 15, empatados: 9, perdidos: 14, goles_favor: 56, goles_contra: 51, puntos: 54 });
	clasificacion_grupos["2"] = clasificacion_equipos ;

	clasificacion_equipos = [];
	clasificacion_equipos.push({id_equipo: 11, jugados: 38, ganados: 12, empatados: 10, perdidos: 16, goles_favor: 49, goles_contra: 55, puntos: 46 });
	clasificacion_equipos.push({id_equipo: 12, jugados: 38, ganados: 13, empatados: 7, perdidos: 18, goles_favor: 56, goles_contra: 65, puntos: 46 });
	clasificacion_equipos.push({id_equipo: 13, jugados: 38, ganados: 13, empatados: 6, perdidos: 19, goles_favor: 53, goles_contra: 69, puntos: 45 });
	clasificacion_equipos.push({id_equipo: 14, jugados: 38, ganados: 10, empatados: 9, perdidos: 19, goles_favor: 53, goles_contra: 74, puntos: 39 });
	clasificacion_equipos.push({id_equipo: 15, jugados: 38, ganados: 10, empatados: 9, perdidos: 19, goles_favor: 41, goles_contra: 64, puntos: 39 });
	clasificacion_grupos["3"] = clasificacion_equipos ;

	clasificacion_equipos = [];
	clasificacion_equipos.push({id_equipo: 16, jugados: 38, ganados: 8, empatados: 12, perdidos: 18, goles_favor: 43, goles_contra: 61, puntos: 36 });
	clasificacion_equipos.push({id_equipo: 17, jugados: 38, ganados: 8, empatados: 11, perdidos: 19, goles_favor: 36, goles_contra: 55, puntos: 35 });
	clasificacion_equipos.push({id_equipo: 18, jugados: 38, ganados: 7, empatados: 10, perdidos: 21, goles_favor: 42, goles_contra: 72, puntos: 31 });
	clasificacion_equipos.push({id_equipo: 19, jugados: 38, ganados: 4, empatados: 10, perdidos: 24, goles_favor: 40, goles_contra: 94, puntos: 22 });
	clasificacion_equipos.push({id_equipo: 20, jugados: 38, ganados: 4, empatados: 8, perdidos: 26, goles_favor: 30, goles_contra: 82, puntos: 20 });
	clasificacion_grupos["4"] = clasificacion_equipos ;

	return clasificacion_grupos;
}

function getClasificacionCopaEquiposMockup(){
	var clasificacion = [];
	
	var partidos_jornada = [];
	partidos_jornada.push({id_partido: 1,  id_equipo_1: 1,  id_equipo_2: 2,  goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 1, fecha_hora: '2016-08-19 20:45:00', id_grupo: 1});
	partidos_jornada.push({id_partido: 2,  id_equipo_1: 3,  id_equipo_2: 4,  goles_equipo_1: 2, goles_equipo_2: 1, id_estadio: 2, fecha_hora: '2016-08-19 20:45:00', id_grupo: 1});
	partidos_jornada.push({id_partido: 3,  id_equipo_1: 5,  id_equipo_2: 6,  goles_equipo_1: 6, goles_equipo_2: 2, id_estadio: 3, fecha_hora: '2016-08-19 20:45:00', id_grupo: 2});
	partidos_jornada.push({id_partido: 4,  id_equipo_1: 7,  id_equipo_2: 8,  goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 4, fecha_hora: '2016-08-19 20:45:00', id_grupo: 2});
	partidos_jornada.push({id_partido: 5,  id_equipo_1: 9,  id_equipo_2: 10, goles_equipo_1: 6, goles_equipo_2: 4, id_estadio: 5, fecha_hora: '2016-08-19 20:45:00', id_grupo: 3});
	partidos_jornada.push({id_partido: 6,  id_equipo_1: 11, id_equipo_2: 12, goles_equipo_1: 2, goles_equipo_2: 1, id_estadio: 6, fecha_hora: '2016-08-19 20:45:00', id_grupo: 3});
	partidos_jornada.push({id_partido: 7,  id_equipo_1: 13, id_equipo_2: 14, goles_equipo_1: 0, goles_equipo_2: 3, id_estadio: 7, fecha_hora: '2016-08-19 20:45:00', id_grupo: 4});
	partidos_jornada.push({id_partido: 8,  id_equipo_1: 15, id_equipo_2: 16, goles_equipo_1: 1, goles_equipo_2: 1, id_estadio: 8, fecha_hora: '2016-08-19 20:45:00', id_grupo: 4});
	clasificacion["4"] = partidos_jornada;
	
	partidos_jornada = [];
	partidos_jornada.push({id_partido: 9,  id_equipo_1: 17, id_equipo_2: 18, goles_equipo_1: 0, goles_equipo_2: 1, id_estadio: 9, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	partidos_jornada.push({id_partido: 10, id_equipo_1: 19, id_equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, id_estadio: 10, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	partidos_jornada.push({id_partido: 11,  id_equipo_1: 17, id_equipo_2: 18, goles_equipo_1: 0, goles_equipo_2: 1, id_estadio: 9, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	partidos_jornada.push({id_partido: 12, id_equipo_1: 19, id_equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, id_estadio: 10, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	clasificacion["5"] = partidos_jornada;

	partidos_jornada = [];
	partidos_jornada.push({id_partido: 13,  id_equipo_1: 17, id_equipo_2: 18, goles_equipo_1: 0, goles_equipo_2: 1, id_estadio: 9, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	partidos_jornada.push({id_partido: 14, id_equipo_1: 19, id_equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, id_estadio: 10, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	clasificacion["6"] = partidos_jornada;

	partidos_jornada = [];
	partidos_jornada.push({id_partido: 15, id_equipo_1: 19, id_equipo_2: 20, goles_equipo_1: 2, goles_equipo_2: 4, id_estadio: 10, fecha_hora: '2016-08-19 20:45:00', id_grupo: 5});
	clasificacion["7"] = partidos_jornada;

	return clasificacion;
}


function getCompeticionSeleccionadaMockup(){
	return {id_competicion: 1, nombre_competicion: "Mundial Brasil 2014", 			titulo: "La porra del mundial", subtitulo: "FIFA World Cup Brasil 2014", siglas: "wc-14", id_tipo_competicion: 3, reglas: "Prueba de contenido para reglas"};
}

function getJornadaActualMockup(){
	return {id_jornada: 1, numero_jornada: 1, nombre_jornada: 'Jornada 01', nombre_corto: 'J01', fecha_inicio: '2016-08-19 20:45:00', fecha_fin: '2016-08-19 20:45:00', id_tipo_jornada: 1, id_competicion: 1};
}