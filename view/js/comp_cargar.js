var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];
var grupos = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(true); // SI necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click','.selector-jornada', function(){
		var idJornada = parseInt($(this).attr('data-id-jornada'));
		jornada_seleccionada = findElementByField(jornadas, "id_jornada", idJornada);
		if (jornada_seleccionada !== null){
			var editable = moment(jornada_seleccionada.fecha_fin).add(1, 'days').isAfter(moment());
			$('.jornada.title').html('Resultados - ' + jornada_seleccionada.nombre_jornada);
			partidos = getPartidosJornada(jornada_seleccionada.id_jornada);
			if (partidos && partidos.length > 0){
				$('.tabla-partidos').find('tr').remove();
				$.each(grupos, function(index, grupo){
					var partidos_grupo = $.grep(partidos, function(partido, index){
						return partido.id_grupo === grupo.id_grupo;
					});
					if (partidos_grupo && partidos_grupo.length > 0) {
						var num_partidos = partidos_grupo.length;
						$.each(partidos_grupo, function(index, partido){
							var equipo_1 = findElementByField(equipos, "id_equipo", partido.id_equipo_1);
							var equipo_2 = findElementByField(equipos, "id_equipo", partido.id_equipo_2);
							if (equipo_1 !== null && equipo_2 !== null){
								var row = $('<tr class="jornada">');
								if (index === 0) row.append('<td rowspan="' + num_partidos + '">' + grupo.nombre_grupo + '</td>');
								row.append('<td><img src="' + equipo_1.url_escudo + '" title="' + equipo_1.nombre_equipo + '"></td>');
								row.append('<td>' + equipo_1.abreviatura + '</td>');
								row.append('<td>' + (editable ? '<input type="text" value="' + partido.goles_equipo_1 + '" />' : partido.goles_equipo_1 ) + '</td>');
								row.append('<td>-</td>');
								row.append('<td>' + (editable ? '<input type="text" value="' + partido.goles_equipo_2 + '" />' : partido.goles_equipo_2 ) + '</td>');
								row.append('<td>' + equipo_2.abreviatura + '</td>');
								row.append('<td><img src="' + equipo_2.url_escudo + '" title="' + equipo_2.nombre_equipo + '"></td>');
								$('.tabla-partidos').append(row);
							}
						});
					}
				});
			}
		}
	});

	competicion_seleccionada = getCompeticionSeleccionada();
	equipos = getEquiposCompeticion(competicion_seleccionada.id_competicion);
	grupos = getGruposCompeticion(competicion_seleccionada.id_competicion);

	var jornadas = getJornadasCompeticion(competicion_seleccionada.id_competicion);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id_jornada + '"><a href="#" data-numero-jornada="' + jornada.numero_jornada + '">' + jornada.nombre_corto + '</a></div>'));
	});
	
	jornada_seleccionada = getJornadaActual(competicion_seleccionada.id_competicion);
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada.id_jornada + '"]').trigger('click');
	
});