var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];
var estadios = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = $(this).attr('data-id-jornada');
		partidos = getPartidosJornada(jornada_seleccionada);
		if (partidos && partidos.length > 0){
			$('.tabla-partidos').find('tr').remove();
			$.each(partidos, function(index, partido){
				var equipo_1 = findElementByField(equipos, "id", partido.equipo_1);
				var equipo_2 = findElementByField(equipos, "id", partido.equipo_2);
				var estadio = findElementByField(estadios, "id", partido.estadio);
				if (equipo_1 !== null && equipo_2 !== null && estadio !== null){
					var row = $('<tr class="jornada">');
					row.append('<td><img src="' + equipo_1.escudo + '" title="' + equipo_1.nombre + '"></td>');
					row.append('<td>' + equipo_1.abreviatura + '</td>');
					row.append('<td>' + partido.goles_equipo_1 + '</td>');
					row.append('<td>-</td>');
					row.append('<td>' + partido.goles_equipo_2 + '</td>');
					row.append('<td>' + equipo_2.abreviatura + '</td>');
					row.append('<td><img src="' + equipo_2.escudo + '" title="' + equipo_2.nombre + '"></td>');
					row.append('<td>' + estadio.nombre + '</td>');
					row.append('<td>' + partido.fecha_hora + '</td>');
					$('.tabla-partidos').append(row);
				}
			});
		}
	});
	
	competicion_seleccionada = getCompeticionSeleccionada();
	equipos = getEquiposCompeticionMockup(competicion_seleccionada);
	estadios = getEstadiosMockup();
	
	var jornadas = getJornadasCompeticion(competicion_seleccionada);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id + '"><a href="#" data-numero-jornada="' + jornada.numero + '">' + jornada.nombre_corto + '</a></div>'));
	});
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});
