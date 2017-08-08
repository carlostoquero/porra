var competiciones = [];
var grupos_competicion = [];
var tipos_competicion = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar-competicion', function(){
		$('.dato-competicion').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = findElementByField(competiciones, "id_competicion", id_competicion);
			if (competicion_editar !== null){
				var fecha_inicio = new Date(competicion_editar.fecha_inicio);
				
				$('.form-editar-competicion').show();
				$('.datos-grupos').show();
				$('.form-editar-grupo').hide();
				
				$('.comp_id').val(competicion_editar.id_competicion);
				$('.comp_nombre').val(competicion_editar.nombre_competicion);
				$('.comp_siglas').val(competicion_editar.siglas);
				$('.comp_titulo').val(competicion_editar.titulo);
				$('.comp_subtitulo').val(competicion_editar.subtitulo);
				$('.comp_reglas').val(competicion_editar.reglas);
				$('.comp_inicio').val(fecha_inicio);
				$('.comp_fin').val(competicion_editar.fecha_fin);
				$('.comp_tipo_competicion').val(competicion_editar.id_tipo_competicion);

				$('.tabla-grupos').find('tr').remove();
				grupos_competicion = getGruposCompeticion(competicion_editar.id);
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
	
	$('body').on('click', '.borrar-competicion', function(){
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_borrar = findElementByField(competiciones, "id_competicion", id_competicion);
			if (competicion_borrar !== null){
				if (confirm("Borrar la competicion '" + competicion_borrar.nombre_competicion + "'?")){
					var resultado_borrado = getAjaxSync('ServicioCompeticiones', 'BorrarCompeticion', JSON.stringify({id: competicion_borrar.id_competicion}));
					if (resultado_borrado === "ok") loadCompeticiones();
				}
			}
		}
	});
	
	$('body').on('click', '.crear-competicion', function(){
		$('.dato-competicion').val('');
		$('.tabla-grupos').find('tr').remove();
		$('.form-editar-competicion').show();
		$('.datos-grupos').hide();
		$('.form-editar-grupo').hide();
	});
	
	$('body').on('click', '.guardar-competicion', function(){
		$('.errores').html('');
		if (checkInput()){
			var datos_competicion = {};
			if ($('.comp_id').val() !== null && $('.comp_id').val() !== "") datos_competicion.id = parseInt($('.comp_id').val());
			datos_competicion.nombre = $('.comp_nombre').val();
			datos_competicion.abreviatura = $('.comp_siglas').val();
			datos_competicion.titulo = $('.comp_titulo').val();
			datos_competicion.subtitulo = $('.comp_subtitulo').val();
			datos_competicion.reglas = $('.comp_reglas').val();
			datos_competicion.inicio = $('.comp_inicio').val();
			datos_competicion.fin = $('.comp_fin').val();
			datos_competicion.tipo_competicion = parseInt($('.comp_tipo_competicion').val());
			
			var resultado_guardado = getAjaxSync('ServicioCompeticiones', 'GuardarCompeticion', JSON.stringify(datos_competicion));
			if (resultado_guardado === "ok") loadCompeticiones();
		}
	});
	
	
	$('body').on('click', '.editar-grupo', function(){
		$('.dato-grupo').val('');
		var id_grupo = parseInt($(this).attr('data-id-grupo'));
		if (id_grupo !== null){
			var grupo_editar = findElementByField(grupos_competicion, "id", id_grupo);
			if (grupo_editar !== null){
				$('.form-editar-grupo').show();
				$('.grupo_id').val(grupo_editar.id);
				$('.grupo_nombre').val(grupo_editar.nombre);
				$('.grupo_competicion').val(grupo_editar.id_competicion);
			}
		}
	});

	$('body').on('click', '.crear-grupo', function(){
		$('.dato-grupo').val('');
		$('.form-editar-grupo').show();
	});

	tipos_competicion = getTiposCompeticionMockup();
	if (tipos_competicion !== null && tipos_competicion.length > 0){
		$.each(tipos_competicion, function(index, tipo_competicion){
			$('.comp_tipo_competicion').append('<option value="' + tipo_competicion.id + '">' + tipo_competicion.nombre + '</option>');
		});
		loadCompeticiones();
	}
	
	function loadCompeticiones(){
		competiciones = getCompeticiones();
		$('.tabla-competiciones').find('tr').remove();
		if (competiciones !== null && competiciones.length > 0){
			$.each(competiciones, function(index, competicion){
				var row = $('<tr>');
				row.append('<td>' + competicion.id_competicion + '</td>');
				row.append('<td>' + competicion.nombre_competicion + '</td>');
				row.append('<td>' + competicion.siglas + '</td>');
				row.append('<td>' + competicion.titulo + '</td>');
				row.append('<td>' + competicion.subtitulo + '</td>');
				row.append('<td><button class="editar-competicion" data-id-competicion="' + competicion.id_competicion + '">Editar</button></td>');
				row.append('<td><button class="borrar-competicion" data-id-competicion="' + competicion.id_competicion + '">Borrar</button></td>');
				$('.tabla-competiciones').append(row);
			});
		}
		$('.form-editar-competicion').hide();
		$('.form-editar-grupo').hide();
	}
	
	function checkInput(){
		var correct_input = true;
		// if ($('.estadio_nombre').val() === null || $('.estadio_nombre').val() === ""){
			// correct_input = false;
			// $('.errores').append('<div>Debe informarse el campo nombre</div>');
		// }
		// if ($('.estadio_ciudad').val() === null || $('.estadio_ciudad').val() === ""){
			// correct_input = false;
			// $('.errores').append('<div>Debe informarse el campo ciudad</div>');
		// }
		return correct_input;
	}
	
});