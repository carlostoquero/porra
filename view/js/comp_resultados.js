var jornada_seleccionada = null;

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = $(this).attr('data-id-jornada');
		var partidos = getPartidosJornada(jornada_seleccionada);
		if (partidos && partidos.length > 0){
			$('.tabla-partidos').find('tr').remove();
			$.each(partidos, function(index, partido){
				var row = $('<tr class="jornada">');
				row.append('<td><img src="./img/' + partido.equipo_1.escudo + '" title="' + partido.equipo_1.nombre + '"></td>');
				row.append('<td>' + partido.equipo_1.abreviatura + '</td>');
				row.append('<td>' + partido.goles_equipo_1 + '</td>');
				row.append('<td>-</td>');
				row.append('<td>' + partido.goles_equipo_2 + '</td>');
				row.append('<td>' + partido.equipo_2.abreviatura + '</td>');
				row.append('<td><img src="./img/' + partido.equipo_2.escudo + '" title="' + partido.equipo_2.nombre + '"></td>');
				row.append('<td>' + partido.estadio + '</td>');
				row.append('<td>' + partido.fecha_hora + '</td>');
				$('.tabla-partidos').append(row);
			});
		}
	});
	
	var jornadas = getJornadasCompeticion(1);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id + '"><a href="#" data-numero-jornada="' + jornada.numero + '">' + jornada.nombre_corto + '</a></div>'));
	});
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});