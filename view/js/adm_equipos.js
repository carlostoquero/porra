var grupos = [];
var equipos = [];
var competiciones_equipo = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(true); // SI necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click', '.editar-equipo', function(){
		$('.errores').html('');
		$('.dato-equipo').val('');
		var id_equipo = parseInt($(this).attr('data-id-equipo'));
		if (id_equipo !== null){
			var equipo_editar = findElementByField(equipos, "id_equipo", id_equipo);
			if (equipo_editar !== null){
				$('.form-editar-equipo').show();
				$('.datos-competiciones').show();
				$('.form-editar-competiciones').hide();
				
				$('.equipo_id').val(equipo_editar.id_equipo);
				$('.equipo_nombre').val(equipo_editar.nombre_equipo);
				$('.equipo_abreviatura').val(equipo_editar.abreviatura);
				$('.equipo_escudo').val(equipo_editar.url_escudo);
				$('.equipo_img_escudo').attr('src', equipo_editar.url_escudo);

				$('.crear-competicion').attr('data-id-equipo', equipo_editar.id_equipo);
				
				loadCompeticionesEquipo(equipo_editar.id_equipo);
			}
		}
	});
	
	$('body').on('click', '.borrar-equipo', function(){
		var id_equipo = parseInt($(this).attr('data-id-equipo'));
		if (id_equipo !== null){
			var equipo_borrar = findElementByField(equipos, "id_equipo", id_equipo);
			if (equipo_borrar !== null){
				if (confirm("Borrar el equipo '" + equipo_borrar.nombre_equipo + "'?")){
					var resultado_borrado = getAjaxSync('ServicioEquipos', 'BorrarEquipo', JSON.stringify({id: equipo_borrar.id_equipo}));
					if (resultado_borrado === "ok") loadEquipos();
				}
			}
		}
	});
	
	$('body').on('click', '.crear-equipo', function(){
		$('.errores').html('');
		$('.dato-equipo').val('');
		$('.tabla-competiciones').find('tr').remove();
		$('.form-editar-equipo').show();
		$('.datos-competiciones').hide();
		$('.form-editar-competiciones').hide();
	});
	
	$('body').on('click', '.guardar-equipo', function(){
		$('.errores').html('');
		if (checkInputEquipo()){
			var datos_equipo = {};
			if ($('.equipo_id').val() !== null && $('.equipo_id').val() !== "") datos_equipo.id = parseInt($('.equipo_id').val());
			datos_equipo.nombre = $('.equipo_nombre').val();
			datos_equipo.abreviatura = $('.equipo_abreviatura').val();
			datos_equipo.url = $('.equipo_escudo').val();
			
			var resultado_guardado = getAjaxSync('ServicioEquipos', 'GuardarEquipo', JSON.stringify(datos_equipo));
			if (resultado_guardado === "ok") loadEquipos();
		}
	});

	$('body').on('click', '.editar-competicion', function(){
		$('.errores').html('');
		$('.dato-competicion').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = findElementByField(competiciones_equipo, "id_competicion", id_competicion);
			if (competicion_editar !== null){
				$('.form-editar-competiciones').show();
				$('.comp_equipo').val(competicion_editar.id_equipo);
				$('.comp_competicion').val(competicion_editar.id_competicion);
				$('.comp_competicion').trigger('change');
				$('.comp_grupo').val(competicion_editar.id_grupo);
				$('.comp_competicion').attr('disabled', true);
			}
		}
	});

	$('body').on('click', '.borrar-competicion', function(){
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_borrar = findElementByField(competiciones_equipo, "id_competicion", id_competicion);
			if (competicion_borrar !== null){
				var competicion = findElementByField(competiciones, "id_competicion", competicion_borrar.id_competicion);
				if (confirm("Borrar el equipo '" + competicion.nombre_competicion + "'?")){
					var datos_competicion_equipo = {id_equipo: competicion_borrar.id_equipo, id_competicion: competicion_borrar.id_competicion};
					var resultado_borrado = getAjaxSync('ServicioEquipos', 'BorrarCompeticionEquipo', JSON.stringify(datos_competicion_equipo));
					if (resultado_borrado === "ok") loadCompeticionesEquipo(competicion_borrar.id_equipo);
				}
			}
		}
	});

	$('body').on('click', '.crear-competicion', function(){
		$('.errores').html('');
		$('.dato-competicion').val('');
		$('.form-editar-competiciones').show();
		$('.comp_competicion').attr('disabled', false);
		$('.comp_grupo').find('option').remove();
		$('.comp_equipo').val(parseInt($('.crear-competicion').attr('data-id-equipo')));
	});
	
	$('body').on('change', '.comp_competicion', function(){
		$('.comp_grupo').find('option').remove();
		var id_competicion = parseInt($(this).val());
		if (id_competicion !== null && id_competicion !== ""){
			var grupos_competicion = $.grep(grupos, function(grupo, index){
				return grupo.id_competicion === id_competicion;
			});
			
			if (grupos_competicion !== null && grupos_competicion.length > 0){
				$.each(grupos_competicion, function(index, grupo_comp){
					$('.comp_grupo').append('<option value="' + grupo_comp.id_grupo + '">' + grupo_comp.nombre_grupo + '</option>');
				});
			}
		}
	});
	
	$('body').on('click', '.guardar-competicion', function(){
		$('.errores').html('');
		if (checkInputCompeticion()){
			var id_equipo = parseInt($('.comp_equipo').val());
			var datos_competicion = {};
			datos_competicion.id_equipo = id_equipo;
			datos_competicion.id_competicion = parseInt($('.comp_competicion').val());
			datos_competicion.id_grupo = parseInt($('.comp_grupo').val());
			
			var resultado_guardado = getAjaxSync('ServicioEquipos', 'GuardarCompeticionEquipo', JSON.stringify(datos_competicion));
			if (resultado_guardado === "ok") loadCompeticionesEquipo(id_equipo);
		}
	});


	competiciones = getCompeticiones();
	$('.comp_competicion').append('<option value="">(Seleccionar una)</option>');
	$.each(competiciones, function(index, competicion){
		$('.comp_competicion').append('<option value="' + competicion.id_competicion + '">' + competicion.nombre_competicion + '</option>');
	});
	
	grupos = getGrupos();
	loadEquipos();
	
	function loadEquipos(){
		equipos = getEquipos();
		$('.tabla-equipos').find('tr').remove();
		if (equipos !== null && equipos.length > 0){
			$.each(equipos, function(index, equipo){
				var row = $('<tr>');
				row.append('<td>' + equipo.id_equipo + '</td>');
				row.append('<td>' + equipo.nombre_equipo + '</td>');
				row.append('<td>' + equipo.abreviatura + '</td>');
				row.append('<td><img src="' + equipo.url_escudo + '"/></td>');
				row.append('<td><button class="editar-equipo" data-id-equipo="' + equipo.id_equipo + '">Editar</button></td>');
				row.append('<td><button class="borrar-equipo" data-id-equipo="' + equipo.id_equipo + '">Borrar</button></td>');
				$('.tabla-equipos').append(row);
			});
		}
		$('.form-editar-equipo').hide();
		$('.datos-competiciones').hide();
		$('.form-editar-competiciones').hide();
	}
	
	function loadCompeticionesEquipo(id_equipo){
		competiciones_equipo = getCompeticionesEquipo(id_equipo);

		$('.tabla-competiciones').find('tr').remove();
		if (competiciones_equipo !== null && competiciones_equipo.length > 0){
			$.each(competiciones_equipo, function(index, competicion_equipo){
				var competicion = findElementByField(competiciones, "id_competicion", competicion_equipo.id_competicion);
				var grupo = findElementByField(grupos, "id_grupo", competicion_equipo.id_grupo);
				if (competicion !== null && grupo !== null){
					var row = $('<tr>');
					row.append('<td>' + competicion.nombre_competicion + '</td>');
					row.append('<td>' + grupo.nombre_grupo + '</td>');
					row.append('<td><button class="editar-competicion" data-id-competicion="' + competicion_equipo.id_competicion + '">Editar</button></td>');
					row.append('<td><button class="borrar-competicion" data-id-competicion="' + competicion_equipo.id_competicion + '">Borrar</button></td>');
					$('.tabla-competiciones').append(row);
				}
			});
		}
		$('.form-editar-competiciones').hide();
	}

	function checkInputEquipo(){
		var correct_input = true;
		if ($('.equipo_nombre').val() === null || $('.equipo_nombre').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo nombre</div>');
		}
		if ($('.equipo_abreviatura').val() === null || $('.equipo_abreviatura').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo abreviatura</div>');
		} else {
			// Comprobar que no está repetida
			var id_equipo = $('.equipo_id').val() === null || $('.equipo_id').val() === "" ? null : parseInt($('.equipo_id').val());
			var abreviatura_repetida = $.grep(equipos, function(equipo, index){
				return equipo.abreviatura === $('.equipo_abreviatura').val() && (id_equipo === null || equipo.id_equipo !== id_equipo );
			});
			
			if (abreviatura_repetida !== null && abreviatura_repetida.length > 0){
				correct_input = false;
				$('.errores').append('<div>Abreviatura repetida.</div>');
			}
			
		}
		if ($('.equipo_escudo').val() === null || $('.equipo_escudo').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo escudo</div>');
		}
		
		return correct_input;
	}
	
	function checkInputCompeticion(){
		var correct_input = true;
		if ($('.comp_competicion').val() === null || $('.comp_competicion').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo competicion</div>');
		}
		if ($('.comp_grupo').val() === null || $('.comp_grupo').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo grupo</div>');
		}
		
		return correct_input;
	}
});