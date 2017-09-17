var competiciones = [];
var grupos_competicion = [];
var tipos_competicion = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(true); // SI necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click', '.editar-competicion', function(){
		$('.dato-competicion').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = findElementByField(competiciones, "id_competicion", id_competicion);
			if (competicion_editar !== null){
				$('.form-editar-competicion').show();
				$('.datos-grupos').show();
				$('.form-editar-grupo').hide();
				
				$('.comp_id').val(competicion_editar.id_competicion);
				$('.comp_nombre').val(competicion_editar.nombre_competicion);
				$('.comp_siglas').val(competicion_editar.siglas);
				$('.comp_titulo').val(competicion_editar.titulo);
				$('.comp_subtitulo').val(competicion_editar.subtitulo);
				$('.comp_reglas').val(competicion_editar.reglas);
				$('.comp_inicio').val(moment(competicion_editar.fecha_inicio).format('YYYY-MM-DDTHH:mm'));
				$('.comp_fin').val(moment(competicion_editar.fecha_fin).format('YYYY-MM-DDTHH:mm'));
				$('.comp_tipo_competicion').val(competicion_editar.id_tipo_competicion);
				
				$('.crear-grupo').attr('data-id-competicion', competicion_editar.id_competicion);

				loadGrupos(competicion_editar.id_competicion);
			}
		}
	});
	
	$('body').on('click', '.borrar-competicion', function(){
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_borrar = findElementByField(competiciones, "id_competicion", id_competicion);
			if (competicion_borrar !== null){
				if (confirm("Borrar la competicion '" + competicion_borrar.nombre_competicion + "'?")){
					var resultado_borrado = getAjaxSync('BorrarCompeticion', JSON.stringify({id: competicion_borrar.id_competicion}));
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
		if (checkInputCompeticion()){
			var datos_competicion = {};
			if ($('.comp_id').val() !== null && $('.comp_id').val() !== "") datos_competicion.id = parseInt($('.comp_id').val());
			datos_competicion.nombre = $('.comp_nombre').val();
			datos_competicion.siglas = $('.comp_siglas').val();
			datos_competicion.titulo = $('.comp_titulo').val();
			datos_competicion.subtitulo = $('.comp_subtitulo').val();
			datos_competicion.reglas = $('.comp_reglas').val();
			datos_competicion.inicio = moment($('.comp_inicio').val()).format('YYYY-MM-DD HH:mm:SS');
			datos_competicion.fin = moment($('.comp_fin').val()).format('YYYY-MM-DD HH:mm:SS');
			datos_competicion.tipo_competicion = parseInt($('.comp_tipo_competicion').val());
			
			var resultado_guardado = getAjaxSync('GuardarCompeticion', JSON.stringify(datos_competicion));
			if (resultado_guardado === "ok") loadCompeticiones();
		}
	});
	
	$('body').on('click', '.editar-grupo', function(){
		$('.dato-grupo').val('');
		var id_grupo = parseInt($(this).attr('data-id-grupo'));
		if (id_grupo !== null){
			var grupo_editar = findElementByField(grupos_competicion, "id_grupo", id_grupo);
			if (grupo_editar !== null){
				$('.form-editar-grupo').show();
				$('.grupo_id').val(grupo_editar.id_grupo);
				$('.grupo_nombre').val(grupo_editar.nombre_grupo);
				$('.grupo_competicion').val(grupo_editar.id_competicion);
			}
		}
	});
	
	$('body').on('click', '.borrar-grupo', function(){
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		var id_grupo = parseInt($(this).attr('data-id-grupo'));
		if (id_grupo !== null){
			var grupo_borrar = findElementByField(grupos_competicion, "id_grupo", id_grupo);
			if (grupo_borrar !== null){
				if (confirm("Borrar el grupo '" + grupo_borrar.nombre_grupo + "'?")){
					var resultado_borrado = getAjaxSync('BorrarGrupo', JSON.stringify({id: grupo_borrar.id_grupo}));
					if (resultado_borrado === "ok") loadGrupos(id_competicion);
				}
			}
		}
	});

	$('body').on('click', '.crear-grupo', function(){
		$('.dato-grupo').val('');
		$('.form-editar-grupo').show();
		$('.grupo_competicion').val(parseInt($('.crear-grupo').attr('data-id-competicion')));
	});
	
	$('body').on('click', '.guardar-grupo', function(){
		$('.errores').html('');
		if (checkInputGrupo()){
			var id_competicion = parseInt($('.grupo_competicion').val());
			var datos_grupo = {};
			if ($('.grupo_id').val() !== null && $('.grupo_id').val() !== "") datos_grupo.id = parseInt($('.grupo_id').val());
			datos_grupo.nombre = $('.grupo_nombre').val();
			datos_grupo.id_competicion = id_competicion;
			
			var resultado_guardado = getAjaxSync('GuardarGrupo', JSON.stringify(datos_grupo));
			if (resultado_guardado === "ok") loadGrupos(id_competicion);
		}
	});

	tipos_competicion = getTiposCompeticion();
	if (tipos_competicion !== null && tipos_competicion.length > 0){
		$.each(tipos_competicion, function(index, tipo_competicion){
			$('.comp_tipo_competicion').append('<option value="' + tipo_competicion.id_tipo_competicion + '">' + tipo_competicion.nombre_tipo_competicion + '</option>');
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
	
	function loadGrupos(id_competicion){
		grupos_competicion = getGruposCompeticion(id_competicion);
		$('.tabla-grupos').find('tr').remove();
		if (grupos_competicion !== null && grupos_competicion.length > 0){
			$.each(grupos_competicion, function(index, grupo){
				var row = $('<tr>');
				row.append('<td>' + grupo.id_grupo + '</td>');
				row.append('<td>' + grupo.nombre_grupo + '</td>');
				row.append('<td><button class="editar-grupo" data-id-competicion="' + id_competicion + '" data-id-grupo="' + grupo.id_grupo + '">Editar</button></td>');
				row.append('<td><button class="borrar-grupo" data-id-competicion="' + id_competicion + '" data-id-grupo="' + grupo.id_grupo + '">Borrar</button></td>');
				$('.tabla-grupos').append(row);
			});
		}
		$('.form-editar-grupo').hide();
	}
	
	function checkInputCompeticion(){
		var correct_input = true;
		
		if ($('.comp_nombre').val() === null || $('.comp_nombre').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo nombre</div>');
		}
		
		if ($('.comp_siglas').val() === null || $('.comp_siglas').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo siglas</div>');
		} else {
			// Comprobar que no están repetidas
			var id_competicion = $('.comp_id').val() === null || $('.comp_id').val() === "" ? null : parseInt($('.comp_id').val());
			var siglas_repetidas = $.grep(competiciones, function(competicion, index){
				return competicion.siglas === $('.comp_siglas').val() && (id_competicion === null || competicion.id_competicion !== id_competicion );
			});
			
			if (siglas_repetidas !== null && siglas_repetidas.length > 0){
				correct_input = false;
				$('.errores').append('<div>Siglas repetidas.</div>');
			}
		}
		
		if ($('.comp_titulo').val() === null || $('.comp_titulo').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo titulo</div>');
		}
		
		if ($('.comp_subtitulo').val() === null || $('.comp_subtitulo').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo subtitulo</div>');
		}
		
		if ($('.comp_reglas').val() === null || $('.comp_reglas').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo reglas</div>');
		}
		
		//TODO: Comprobar que cumple formato YYYY-MM-DD HH:MM
		var fecha_inicio = null;
		if ($('.comp_inicio').val() === null || $('.comp_inicio').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo Fecha inicio</div>');
		} else {
			fecha_inicio = moment($('.comp_inicio').val());
		}
		
		//TODO: Comprobar que cumple formato YYYY-MM-DD HH:MM
		var fecha_fin = null;
		if ($('.comp_fin').val() === null || $('.comp_fin').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo Fecha fin</div>');
		} else {
			fecha_fin = moment($('.comp_fin').val());
		}
		
		if (fecha_inicio !== null && fecha_fin !== null && fecha_inicio.isAfter(fecha_fin)){
			correct_input = false;
			$('.errores').append('<div>Fecha inicio debe ser anterior a Fecha fin</div>');
		}
		
		if ($('.comp_tipo_competicion').val() === null || $('.comp_tipo_competicion').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo tipo de competicion</div>');
		}
		
		return correct_input;
	}
	
	function checkInputGrupo(){
		var correct_input = true;
		//TODO: Comprobar unicidad en la competición?
		if ($('.grupo_nombre').val() === null || $('.grupo_nombre').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo nombre</div>');
		} 
		return correct_input;
	}
});