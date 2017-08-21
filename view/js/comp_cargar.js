var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = parseInt($(this).attr('data-id-jornada'));
		partidos = getPartidosJornada(jornada_seleccionada);
		if (partidos && partidos.length > 0){
			$('.tabla-partidos').find('tr').remove();
			$.each(partidos, function(index, partido){
				var equipo_1 = findElementByField(equipos, "id_equipo", partido.equipo_1);
				var equipo_2 = findElementByField(equipos, "id_equipo", partido.equipo_2);
				if (equipo_1 !== null && equipo_2 !== null){
					var row = $('<tr class="jornada">');
					row.append('<td><img src="' + equipo_1.url_escudo + '" title="' + equipo_1.nombre_equipo + '"></td>');
					row.append('<td>' + equipo_1.abreviatura + '</td>');
					row.append('<td><input type="text" value="' + partido.goles_equipo_1 + '" /></td>');
					row.append('<td>-</td>');
					row.append('<td><input type="text" value="' + partido.goles_equipo_2 + '" /></td>');
					row.append('<td>' + equipo_2.abreviatura + '</td>');
					row.append('<td><img src="' + equipo_2.url_escudo + '" title="' + equipo_2.nombre_equipo + '"></td>');
					$('.tabla-partidos').append(row);
				}
			});
		}
	});

	competicion_seleccionada = getCompeticionSeleccionada();
	equipos = getEquiposCompeticion(competicion_seleccionada);

	var jornadas = getJornadasCompeticion(competicion_seleccionada);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id_jornada + '"><a href="#" data-numero-jornada="' + jornada.numero_jornada + '">' + jornada.nombre_corto + '</a></div>'));
	});
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});