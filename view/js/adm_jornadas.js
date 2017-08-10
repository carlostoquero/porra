var jornadas = [];
var tipos_jornada = [];
var equipos = [];
var estadios = [];
var grupos = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('change', '.competicion', function(){
		$('.jornadas').show();
	
		var id_competicion = parseInt($('.competicion').val());
		
		equipos = getEquiposCompeticion(id_competicion);
		$('.part_equipo').find('option').remove();
		if (equipos !== null && equipos.length > 0){
			$.each(equipos, function(index, equipo){
				$('.part_equipo').append('<option value="' + equipo.id_equipo + '">' + equipo.nombre_equipo + '</option>');
			});
		}
		
		grupos = getGruposCompeticion(id_competicion);
		$('.part_grupo').find('option').remove();
		if (grupos !== null && grupos.length > 0){
			$.each(grupos, function(index, grupo){
				$('.part_grupo').append('<option value="' + grupo.id_grupo + '">' + grupo.nombre_grupo + '</option>');
			});
		}
		
		loadJornadas(id_competicion);
	});

	$('body').on('click', '.editar-jornada', function(){
		$('.dato').val('');
		var id_jornada = parseInt($(this).attr('data-id-jornada'));
		if (id_jornada !== null){
			var jornada_editar = findElementByField(jornadas, "id_jornada", id_jornada);
			if (jornada_editar !== null){
				$('.form-editar-jornada').show();
				$('.datos-partidos').show();
				$('.form-editar-partido').hide();
				
				$('.jorn_id').val(jornada_editar.id_jornada);
				$('.jorn_fecha_inicio').val(moment(jornada_editar.fecha_inicio).format('YYYY-MM-DDTHH:mm'));
				$('.jorn_fecha_fin').val(moment(jornada_editar.fecha_fin).format('YYYY-MM-DDTHH:mm'));
				$('.jorn_numero').val(jornada_editar.numero_jornada);
				$('.jorn_nombre').val(jornada_editar.nombre_jornada);
				$('.jorn_nombre_corto').val(jornada_editar.nombre_corto);
				$('.jorn_tipo_jornada').val(jornada_editar.id_tipo_jornada);
				
				$('.crear-partido').attr('data-id-jornada', jornada_editar.id_jornada);

				loadPartidosJornada(jornada_editar.id_jornada);
			}
		}
	});

	$('body').on('click', '.borrar-jornada', function(){
		var id_jornada = parseInt($(this).attr('data-id-jornada'));
		if (id_jornada !== null){
			var jornada_borrar = findElementByField(jornadas, "id_jornada", id_jornada);
			if (jornada_borrar !== null){
				if (confirm("Borrar la jornada '" + jornada_borrar.nombre_jornada + "'?")){
					var resultado_borrado = getAjaxSync('ServicioJornadas', 'BorrarJornada', JSON.stringify({id: jornada_borrar.id_jornada}));
					if (resultado_borrado === "ok"){
						var id_competicion = parseInt($('.competicion').val());
						loadJornadas(id_competicion);
					}
				}
			}
		}
	});
	
	$('body').on('click', '.crear-jornada', function(){
		$('.dato-jornada').val('');
		$('.tabla-partidos').find('tr').remove();
		$('.form-editar-jornada').show();
		$('.datos-partidos').hide();
		$('.form-editar-partido').hide();
	});

	$('body').on('click', '.guardar-jornada', function(){
		$('.errores').html('');
		if (checkInputJornada()){
		
			var id_competicion = parseInt($('.competicion').val());
			var datos_jornada = {};
			if ($('.jorn_id').val() !== null && $('.jorn_id').val() !== "") datos_jornada.id = parseInt($('.jorn_id').val());
			datos_jornada.inicio = moment($('.jorn_fecha_inicio').val()).format('YYYY-MM-DD HH:mm:SS');
			datos_jornada.fin = moment($('.jorn_fecha_fin').val()).format('YYYY-MM-DD HH:mm:SS');
			datos_jornada.numero = parseInt($('.jorn_numero').val());
			datos_jornada.nombre = $('.jorn_nombre').val();
			datos_jornada.nombre_corto = $('.jorn_nombre_corto').val();
			datos_jornada.tipo_jornada = parseInt($('.jorn_tipo_jornada').val());
			datos_jornada.competicion = id_competicion;
			
			var resultado_guardado = getAjaxSync('ServicioJornadas', 'GuardarJornada', JSON.stringify(datos_jornada));
			if (resultado_guardado === "ok") loadJornadas(id_competicion);
		}
	});
	
	$('body').on('click', '.editar-partido', function(){
		$('.dato-partido').val('');
		var id_partido = parseInt($(this).attr('data-id-partido'));
		if (id_partido !== null){
			var partido_editar = findElementByField(partidos_jornada, "id_partido", id_partido);
			if (partido_editar !== null){
				$('.form-editar-partido').show();
				$('.part_id').val(partido_editar.id_partido);
				$('.part_equipo_1').val(partido_editar.id_equipo_1);
				$('.part_equipo_2').val(partido_editar.id_equipo_2);
				$('.part_estadio').val(partido_editar.id_estadio);
				$('.part_grupo').val(partido_editar.id_grupo);
				$('.part_jornada').val(partido_editar.id_jornada);
				$('.part_fecha_hora').val(moment(partido_editar.fecha_hora).format('YYYY-MM-DDTHH:mm'));
			}
		}
	});
	
	$('body').on('click', '.borrar-partido', function(){
		var id_jornada = parseInt($(this).attr('data-id-jornada'));
		var id_partido = parseInt($(this).attr('data-id-partido'));
		if (id_partido !== null){
			var partido_borrar = findElementByField(partidos_jornada, "id_partido", id_partido);
			if (partido_borrar !== null){
				if (confirm("Borrar el partido?")){
					var resultado_borrado = getAjaxSync('ServicioJornadas', 'BorrarPartido', JSON.stringify({id: partido_borrar.id_partido}));
					if (resultado_borrado === "ok") loadPartidosJornada(id_jornada);
				}
			}
		}
	});

	$('body').on('click', '.crear-partido', function(){
		$('.dato-partido').val('');
		$('.form-editar-partido').show();
		$('.part_jornada').val(parseInt($('.crear-partido').attr('data-id-jornada')));
	});
	
	$('body').on('click', '.guardar-partido', function(){
		$('.errores').html('');
		if (checkInputPartido()){
		
			var id_jornada = parseInt($('.part_jornada').val());
			var datos_partido = {};
			if ($('.part_id').val() !== null && $('.part_id').val() !== "") datos_partido.id = parseInt($('.part_id').val());
			datos_partido.equipo_1 = parseInt($('.part_equipo_1').val());
			datos_partido.equipo_2 = parseInt($('.part_equipo_2').val());
			datos_partido.estadio = parseInt($('.part_estadio').val());
			if ($('.part_grupo').val() !== null && $('.part_grupo').val() !== "") datos_partido.grupo = parseInt($('.part_grupo').val());
			datos_partido.fecha_hora = moment($('.part_fecha_hora').val()).format('YYYY-MM-DD HH:mm:SS');
			datos_partido.jornada = id_jornada;
			
			var resultado_guardado = getAjaxSync('ServicioJornadas', 'GuardarPartido', JSON.stringify(datos_partido));
			if (resultado_guardado === "ok") loadPartidosJornada(id_jornada);
		}
	});


	tipos_jornada = getTiposJornada();
	if (tipos_jornada !== null && tipos_jornada.length > 0){
		$.each(tipos_jornada, function(index, tipo_jornada){
			$('.jorn_tipo_jornada').append('<option value="' + tipo_jornada.id_tipo_jornada + '">' + tipo_jornada.nombre_tipo_jornada + '</option>');
		});
	}

	estadios = getEstadios();
	if (estadios !== null && estadios.length > 0){
		$.each(estadios, function(index, estadio){
			$('.part_estadio').append('<option value="' + estadio.id_estadio + '">' + estadio.nombre_estadio + '</option>');
		});
	}

	var competiciones = getCompeticiones();
	if (competiciones !== null && competiciones.length > 0){
		$.each(competiciones, function(index, competicion){
			$('.competicion').append('<option value="' + competicion.id_competicion + '">' + competicion.nombre_competicion + '</option>');
		});
	}
	$('.jornadas').hide();
	$('.form-editar-jornada').hide();
	$('.datos-partidos').hide();
	$('.form-editar-partido').hide();
	
	//TODO: Implementar
	function checkInputJornada(){
		return true;
	}
	//TODO: Implementar
	function checkInputPartido(){
		return true;
	}
	
	function loadJornadas(id_competicion){
		$('.tabla-jornadas').find('tr').remove();
		jornadas = getJornadasCompeticion(id_competicion);

		if (jornadas !== null && jornadas.length > 0){
			$.each(jornadas, function(index, jornada){
				var row = $('<tr>');
				row.append('<td>' + jornada.id_jornada + '</td>');
				row.append('<td>' + jornada.fecha_inicio + '</td>');
				row.append('<td>' + jornada.fecha_fin + '</td>');
				row.append('<td>' + jornada.numero_jornada + '</td>');
				row.append('<td>' + jornada.nombre_jornada + '</td>');
				row.append('<td>' + jornada.nombre_corto + '</td>');
				row.append('<td><button class="editar-jornada" data-id-jornada="' + jornada.id_jornada + '">Editar</button></td>');
				row.append('<td><button class="borrar-jornada" data-id-jornada="' + jornada.id_jornada + '">Borrar</button></td>');
				$('.tabla-jornadas').append(row);
			});
		}
		$('.form-editar-jornada').hide();
		$('.datos-partidos').hide();
		$('.form-editar-partido').hide();
	}
	
	function loadPartidosJornada(id_jornada){
		$('.tabla-partidos').find('tr').remove();
		partidos_jornada = getPartidosJornada(id_jornada);
		if (partidos_jornada !== null && partidos_jornada.length > 0){
			$.each(partidos_jornada, function(index, partido){
				var equipo_1 = findElementByField(equipos, "id_equipo", partido.id_equipo_1);
				var equipo_2 = findElementByField(equipos, "id_equipo", partido.id_equipo_2);
				var estadio = findElementByField(estadios, "id_estadio", partido.id_estadio)
				
				if (equipo_1 !== null && equipo_2 !== null){
					var row = $('<tr>');
					row.append('<td>' + partido.id_partido + '</td>');
					row.append('<td><img src="' + equipo_1.url_escudo + '"/></td>');
					row.append('<td>' + equipo_1.nombre_equipo + '</td>');
					row.append('<td>' + equipo_2.nombre_equipo + '</td>');
					row.append('<td><img src="' + equipo_2.url_escudo + '"/></td>');
					row.append('<td>' + estadio.nombre_estadio + '</td>');
					row.append('<td>' + partido.fecha_hora + '</td>');
					row.append('<td><button class="editar-partido" data-id-jornada="' + partido.id_jornada + '" data-id-partido="' + partido.id_partido + '">Editar</button></td>');
					row.append('<td><button class="borrar-partido" data-id-jornada="' + partido.id_jornada + '" data-id-partido="' + partido.id_partido + '">Borrar</button></td>');
					$('.tabla-partidos').append(row);
				}
			});
		}
		$('.form-editar-partido').hide();
	}

});