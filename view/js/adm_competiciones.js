var competiciones = [];
var grupos_competicion = [];
var tipos_competicion = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar-competicion', function(){
		$('.dato-competicion').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = $.grep(competiciones, function(competicion, index){
				return competicion.id === id_competicion;
			});
			if (competicion_editar !== null && competicion_editar.length === 1){
				$('.form-editar-competicion').show();
				$('.form-editar-grupo').hide();
				$('.comp_id').val(competicion_editar[0].id);
				$('.comp_nombre').val(competicion_editar[0].nombre);
				$('.comp_siglas').val(competicion_editar[0].siglas);
				$('.comp_titulo').val(competicion_editar[0].titulo);
				$('.comp_subtitulo').val(competicion_editar[0].subtitulo);
				$('.comp_reglas').val(competicion_editar[0].reglas);
				$('.comp_tipo_competicion').val(competicion_editar[0].tipo_competicion.id);

				$('.tabla-grupos').find('tr').remove();
				grupos_competicion = getGruposCompeticion(competicion_editar[0].id);
				if (grupos_competicion !== null && grupos_competicion.length > 0){
					$.each(grupos_competicion, function(index, grupo){
						var row = $('<tr>');
						row.append('<td>' + grupo.id + '</td>');
						row.append('<td>' + grupo.nombre + '</td>');
						row.append('<td><button class="editar-grupo" data-id-grupo="' + grupo.id + '">Editar</button></td>');
						row.append('<td><button class="borrar-grupo" data-id-grupo="' + grupo.id + '">Borrar</button></td>');
						$('.tabla-grupos').append(row);
					});
				}
			}
		}
	});
	
	$('body').on('click', '.crear-competicion', function(){
		$('.dato-competicion').val('');
		$('.tabla-grupos').find('tr').remove();
		$('.form-editar-competicion').show();
		$('.form-editar-grupo').hide();
	});
	
	$('body').on('click', '.editar-grupo', function(){
		$('.dato-grupo').val('');
		var id_grupo = parseInt($(this).attr('data-id-grupo'));
		if (id_grupo !== null){
			var grupo_editar = $.grep(grupos_competicion, function(grupo, index){
				return grupo.id === id_grupo;
			});
			if (grupo_editar !== null && grupo_editar.length === 1){
				$('.form-editar-grupo').show();
				$('.grupo_id').val(grupo_editar[0].id);
				$('.grupo_nombre').val(grupo_editar[0].nombre);
				$('.grupo_competicion').val(grupo_editar[0].id_competicion);
			}
		}
	});

	$('body').on('click', '.crear-grupo', function(){
		$('.dato-grupo').val('');
		$('.form-editar-grupo').show();
	});

	tipos_competicion = getTiposCompeticion();
	if (tipos_competicion !== null && tipos_competicion.length > 0){
		$.each(tipos_competicion, function(index, tipo_competicion){
			$('.comp_tipo_competicion').append('<option value="' + tipo_competicion.id + '">' + tipo_competicion.nombre + '</option>');
		});

		competiciones = getCompeticiones();
		$('.tabla-competiciones').find('tr').remove();
		if (competiciones !== null && competiciones.length > 0){
			$.each(competiciones, function(index, competicion){
				var row = $('<tr>');
				row.append('<td>' + competicion.id + '</td>');
				row.append('<td>' + competicion.nombre + '</td>');
				row.append('<td>' + competicion.siglas + '</td>');
				row.append('<td>' + competicion.titulo + '</td>');
				row.append('<td>' + competicion.subtitulo + '</td>');
				row.append('<td>' + competicion.tipo_competicion.nombre + '</td>');
				row.append('<td><button class="editar-competicion" data-id-competicion="' + competicion.id + '">Editar</button></td>');
				row.append('<td><button class="borrar-competicion" data-id-competicion="' + competicion.id + '">Borrar</button></td>');
				$('.tabla-competiciones').append(row);
			});
		}
		$('.form-editar-competicion').hide();
		$('.form-editar-grupo').hide();
		
	}
});