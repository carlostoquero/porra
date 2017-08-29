var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];
var estadios = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click','.selector-jornada', function(){
		var idJornada = parseInt($(this).attr('data-id-jornada'));
		jornada_seleccionada = findElementByField(jornadas, "id_jornada", idJornada);
		if (jornada_seleccionada !== null){
			$('.jornada.title').html('Resultados - ' + jornada_seleccionada.nombre_jornada);
			partidos = getPartidosJornada(jornada_seleccionada.id_jornada);
			if (partidos && partidos.length > 0){
				$('.tabla-partidos').find('tr').remove();
				$.each(partidos, function(index, partido){
					var equipo_1 = findElementByField(equipos, "id_equipo", partido.id_equipo_1);
					var equipo_2 = findElementByField(equipos, "id_equipo", partido.id_equipo_2);
					var estadio = findElementByField(estadios, "id_estadio", partido.id_estadio);
					if (equipo_1 !== null && equipo_2 !== null && estadio !== null){
						var row = $('<tr class="jornada">');
						row.append('<td><img src="' + equipo_1.url_escudo + '" title="' + equipo_1.nombre_equipo + '"></td>');
						row.append('<td>' + equipo_1.abreviatura + '</td>');
						row.append('<td class="resultado">' + partido.goles_equipo_1 + '</td>');
						row.append('<td class="vs">-</td>');
						row.append('<td class="resultado">' + partido.goles_equipo_2 + '</td>');
						row.append('<td>' + equipo_2.abreviatura + '</td>');
						row.append('<td><img src="' + equipo_2.url_escudo + '" title="' + equipo_2.nombre_equipo + '"></td>');
						row.append('<td class="estadio">' + estadio.nombre_estadio + '</td>');
						row.append('<td class="fecha">' + partido.fecha_hora + '</td>');
						$('.tabla-partidos').append(row);
					}
				});
			}
		}
	});
	
	competicion_seleccionada = getCompeticionSeleccionada();
	equipos = getEquiposCompeticion(competicion_seleccionada.id_competicion);
	estadios = getEstadios();
	
	var jornadas = getJornadasCompeticion(competicion_seleccionada.id_competicion);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id_jornada + '"><a href="#" data-numero-jornada="' + jornada.numero_jornada + '">' + jornada.nombre_corto + '</a></div>'));
	});
	
	jornada_seleccionada = getJornadaActual(competicion_seleccionada.id_competicion);
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada.id_jornada + '"]').trigger('click');
	
});
