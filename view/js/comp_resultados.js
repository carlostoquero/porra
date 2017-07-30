var jornada_seleccionada = null;
var partidos = [];
var equipos = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = $(this).attr('data-id-jornada');
		partidos = getPartidosJornada(jornada_seleccionada);
		if (partidos && partidos.length > 0){
			$('.tabla-partidos').find('tr').remove();
			$.each(partidos, function(index, partido){
				var equipo_1 = $.grep(equipos, function(equipo, index) { return equipo.id === partido.equipo_1; });
				var equipo_2 = $.grep(equipos, function(equipo, index) { return equipo.id === partido.equipo_2; });
				var estadio = $.grep(estadios, function(estadio, index) { return estadio.id === partido.estadio });
				if (equipo_1 !== null && equipo_1.length === 1 && equipo_2 !== null && equipo_2.length === 1 && estadio !== null && estadio.length === 1){
					var row = $('<tr class="jornada">');
					row.append('<td><img src="' + equipo_1[0].escudo + '" title="' + equipo_1[0].nombre + '"></td>');
					row.append('<td>' + equipo_1[0].abreviatura + '</td>');
					row.append('<td>' + partido.goles_equipo_1 + '</td>');
					row.append('<td>-</td>');
					row.append('<td>' + partido.goles_equipo_2 + '</td>');
					row.append('<td>' + equipo_2[0].abreviatura + '</td>');
					row.append('<td><img src="' + equipo_2[0].escudo + '" title="' + equipo_2[0].nombre + '"></td>');
					row.append('<td>' + estadio[0].nombre + '</td>');
					row.append('<td>' + partido.fecha_hora + '</td>');
					$('.tabla-partidos').append(row);
				}
			});
		}
	});
	
	var competicionSeleccionada = getCompeticionSeleccionada();
	
	equipos = getEquiposCompeticion(competicionSeleccionada);
	estadios = getEstadios();
	
	var jornadas = getJornadasCompeticion(competicionSeleccionada);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id + '"><a href="#" data-numero-jornada="' + jornada.numero + '">' + jornada.nombre_corto + '</a></div>'));
	});
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});
