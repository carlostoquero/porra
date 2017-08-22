var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];
var usuarios = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = parseInt($(this).attr('data-id-jornada'));
		if (usuarios != null && usuarios.length > 0){
			partidos = getPartidosJornada(jornada_seleccionada);
			if (partidos && partidos.length > 0){
				$('.tabla-pronosticos').find('tr').remove();
				var thead = $('<thead>');
				var head_row = $('<tr>');
				head_row.append($('<th>'));
				$.each(partidos, function(index, partido){
					var equipo_1 = findElementByField(equipos, "id_equipo", partido.id_equipo_1);
					var equipo_2 = findElementByField(equipos, "id_equipo", partido.id_equipo_2);
					if (equipo_1 !== null && equipo_2 !== null){					
						head_row.append('<th><img src="' + equipo_1.url_escudo + '">' + equipo_1.abreviatura + '-' + equipo_2.abreviatura + '<img src="' + equipo_2.url_escudo + '">');
					}
				});
				thead.append(head_row);
				$('.tabla-pronosticos').append(thead);

				var pronosticos = getPronosticos(jornada_seleccionada);
				$.each(usuarios, function(index, usuario){
					var row = $('<tr>');
					row.append('<td>' + usuario.login + '</td>');
					$.each(partidos, function(index, partido){
						var pronosticoPartido = null;
						if (pronosticos !== null && pronosticos.length > 0){
							pronosticoPartido = $.grep(pronosticos, function(pronostico, index){
								return pronostico.id_usuario === usuario.id_usuario && pronostico.id_partido === partido.id_partido;
							});
						}
						row.append('<td>' + (pronosticoPartido === null || pronosticoPartido.length === 0 ? '-' : pronosticoPartido[0].goles_equipo_1 + '-' + pronosticoPartido[0].goles_equipo_2) + '</td>');
					});
					$('.tabla-pronosticos').append(row);
				});
			}
		}
	});
	
	competicion_seleccionada = getCompeticionSeleccionada();
	usuarios = getUsuariosCompeticion(competicion_seleccionada.id_competicion);
	equipos = getEquiposCompeticion(competicion_seleccionada.id_competicion);

	var jornadas = getJornadasCompeticion(competicion_seleccionada.id_competicion);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id_jornada + '"><a href="#" data-numero-jornada="' + jornada.numero_jornada + '">' + jornada.nombre_corto + '</a></div>'));
	});
	
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});