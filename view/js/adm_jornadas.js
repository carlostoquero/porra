var jornadas = [];
var tipos_jornada = [];
var equipos = [];
var estadios = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('change', '.competicion', function(){
		$('.jornadas').show();
	
		var id_competicion = parseInt($('.competicion').val());
		jornadas = getJornadasCompeticion(id_competicion);
		equipos = getEquiposCompeticion(id_competicion);
		
		$('.part_equipo').find('option').remove();
		if (equipos !== null && equipos.length > 0){
			$('.part_equipo').append('<option value="">(Seleccione uno)</option>');
			$.each(equipos, function(index, equipo){
				$('.part_equipo').append('<option value="' + equipo.id + '">' + equipo.nombre + '</option>');
			});
		}
		
		$('.tabla-jornadas').find('tr').remove();
		if (jornadas !== null && jornadas.length > 0){
			$.each(jornadas, function(index, jornada){
				var row = $('<tr>');
				row.append('<td>' + jornada.id + '</td>');
				row.append('<td>' + jornada.numero + '</td>');
				row.append('<td>' + jornada.nombre + '</td>');
				row.append('<td>' + jornada.nombre_corto + '</td>');
				row.append('<td>' + jornada.fecha_hora + '</td>');
				row.append('<td>' + jornada.tipo_jornada.nombre + '</td>');
				row.append('<td><button class="editar-jornada" data-id-jornada="' + jornada.id + '">Editar</button></td>');
				row.append('<td><button class="borrar-jornada" data-id-jornada="' + jornada.id + '">Borrar</button></td>');
				$('.tabla-jornadas').append(row);
			});
		}
	});

	$('body').on('click', '.editar-jornada', function(){
		$('.dato').val('');
		var id_jornada = parseInt($(this).attr('data-id-jornada'));
		if (id_jornada !== null){
			var jornada_editar = findElementByField(jornadas, "id", id_jornada);
			if (jornada_editar !== null){
				$('.form-editar-jornada').show();
				$('.form-editar-partido').hide();
				$('.jorn_id').val(jornada_editar.id);
				$('.jorn_numero').val(jornada_editar.numero);
				$('.jorn_nombre').val(jornada_editar.nombre);
				$('.jorn_nombre_corto').val(jornada_editar.nombre_corto);
				$('.jorn_fecha_hora').val(jornada_editar.fecha_hora);
				$('.jorn_tipo_jornada').val(jornada_editar.tipo_jornada.id);

				$('.tabla-partidos').find('tr').remove();
				partidos_jornada = getPartidosJornada(jornada_editar.id);
				if (partidos_jornada !== null && partidos_jornada.length > 0){
					$.each(partidos_jornada, function(index, partido){
						var equipo_1 = findElementByField(equipos, "id", partido.equipo_1);
						var equipo_2 = findElementByField(equipos, "id", partido.equipo_2);
						
						if (equipo_1 !== null && equipo_2 !== null){
							var row = $('<tr>');
							row.append('<td>' + partido.id + '</td>');
							row.append('<td><img src="' + equipo_1.escudo + '"/></td>');
							row.append('<td>' + equipo_1.nombre + '</td>');
							row.append('<td>' + equipo_2.nombre + '</td>');
							row.append('<td><img src="' + equipo_2.escudo + '"/></td>');
							row.append('<td>' + partido.estadio + '</td>');
							row.append('<td>' + partido.fecha_hora + '</td>');
							row.append('<td><button class="editar-partido" data-id-partido="' + partido.id + '">Editar</button></td>');
							row.append('<td><button class="borrar-partido" data-id-partido="' + partido.id + '">Borrar</button></td>');
							$('.tabla-partidos').append(row);
						}
					});
				}
			}
		}
	});
	
	$('body').on('click', '.crear-jornada', function(){
		$('.dato-jornada').val('');
		$('.tabla-partidos').find('tr').remove();
		$('.form-editar-jornada').show();
		$('.form-editar-partido').hide();
	});
	
	$('body').on('click', '.editar-partido', function(){
		$('.dato-partido').val('');
		var id_partido = parseInt($(this).attr('data-id-partido'));
		if (id_partido !== null){
			var partido_editar = findElementByField(partidos_jornada, "id", id_partido);
			if (partido_editar !== null){
				$('.form-editar-partido').show();
				$('.part_equipo_1').val(partido_editar.equipo_1);
				$('.part_equipo_2').val(partido_editar.equipo_2);
				$('.part_estadio').val(partido_editar.estadio);
				$('.part_fecha_hora').val(partido_editar.fecha_hora);
			}
		}
	});

	$('body').on('click', '.crear-partido', function(){
		$('.dato-partido').val('');
		$('.form-editar-partido').show();
	});

	estadios = getEstadios();
	if (estadios !== null && estadios.length > 0){
		$.each(estadios, function(index, estadio){
			$('.part_estadio').append('<option value="' + estadio.id + '">' + estadio.nombre + '</option>');
		});
	}

	var competiciones = getCompeticiones();
	if (competiciones !== null && competiciones.length > 0){
		$.each(competiciones, function(index, competicion){
			$('.competicion').append('<option value="' + competicion.id + '">' + competicion.nombre + '</option>');
		});
	}
	
	$('.jornadas').hide();
	$('.form-editar-jornada').hide();
	$('.form-editar-partido').hide();

});