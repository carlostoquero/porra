var jornadas = [];
var tipos_jornada = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar', function(){
		$('.dato').val('');
		var id_jornada = parseInt($(this).attr('data-id-jornada'));
		if (id_jornada !== null){
			var jornada_editar = $.grep(jornadas, function(jornada, index){
				return jornada.id === id_jornada;
			});
			if (jornada_editar !== null && jornada_editar.length === 1){
				$('.form-editar').show();
				$('.jorn_id').val(jornada_editar[0].id);
				$('.jorn_numero').val(jornada_editar[0].numero);
				$('.jorn_nombre').val(jornada_editar[0].nombre);
				$('.jorn_nombre_corto').val(jornada_editar[0].nombre_corto);
				$('.jorn_fecha_hora').val(jornada_editar[0].fecha_hora);
				$('.jorn_tipo_jornada').val(jornada_editar[0].tipo_jornada.id);
			}
		}
	});
	
	$('body').on('change', '.competicion', function(){
		$('.jornadas').show();
	
		var id_competicion = parseInt($('.competicion').val());
		jornadas = getJornadasCompeticion(id_competicion);
		
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
				row.append('<td><button class="editar" data-id-jornada="' + jornada.id + '">Editar</button></td>');
				row.append('<td><button class="borrar" data-id-jornada="' + jornada.id + '">Borrar</button></td>');
				$('.tabla-jornadas').append(row);
			});
		}
	});

	tipos_jornada = getTiposJornada();
	if (tipos_jornada !== null && tipos_jornada.length > 0){
		$.each(tipos_jornada, function(index, tipo_jornada){
			$('.jorn_tipo_jornada').append('<option value="' + tipo_jornada.id + '">' + tipo_jornada.nombre + '</option>');
		});
	}

	var competiciones = getCompeticiones();
	if (competiciones !== null && competiciones.length > 0){
		$.each(competiciones, function(index, competicion){
			$('.competicion').append('<option value="' + competicion.id + '">' + competicion.nombre + '</option>');
		});
	}
	
	$('.jornadas').hide();
	$('.form-editar').hide();

});