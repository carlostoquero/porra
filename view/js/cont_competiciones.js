var competiciones = [];
var tipos_competicion = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar', function(){
		$('.dato').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = findElementByField(competiciones, "id", id_competicion);
			if (competicion_editar !== null){
				$('.form-editar').show();
				$('.comp_id').val(competicion_editar.id);
				$('.comp_nombre').val(competicion_editar.nombre);
				$('.comp_siglas').val(competicion_editar.siglas);
				$('.comp_titulo').val(competicion_editar.titulo);
				$('.comp_subtitulo').val(competicion_editar.subtitulo);
				$('.comp_reglas').val(competicion_editar.reglas);
				$('.comp_tipo_competicion').val(competicion_editar.tipo_competicion.id);
			}
		}
	});

	tipos_competicion = getTiposCompeticion();
	if (tipos_competicion !== null && tipos_competicion.length > 0){
		$.each(tipos_competicion, function(index, tipo_competicion){
			$('.comp_tipo_competicion').append('<option value="' + tipo_competicion.id + '">' + tipo_competicion.nombre + '</option>');
		});

		competiciones = getCompeticiones();
		if (competiciones !== null && competiciones.length > 0){
			$('.tabla-competiciones').find('tr').remove();
			$.each(competiciones, function(index, competicion){
				var row = $('<tr>');
				row.append('<td>' + competicion.id + '</td>');
				row.append('<td>' + competicion.nombre + '</td>');
				row.append('<td>' + competicion.siglas + '</td>');
				row.append('<td>' + competicion.titulo + '</td>');
				row.append('<td>' + competicion.subtitulo + '</td>');
				row.append('<td>' + competicion.tipo_competicion.nombre + '</td>');
				row.append('<td><button class="editar" data-id-competicion="' + competicion.id + '">Editar</button></td>');
				row.append('<td><button class="borrar" data-id-competicion="' + competicion.id + '">Borrar</button></td>');
				$('.tabla-competiciones').append(row);
			});
		}
		$('.form-editar').hide();
		
	}
});