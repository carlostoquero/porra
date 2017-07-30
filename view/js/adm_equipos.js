var competiciones = [];
var grupos = [];

var equipos = [];
var competiciones_equipo = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar-equipo', function(){
		$('.dato-equipo').val('');
		var id_equipo = parseInt($(this).attr('data-id-equipo'));
		if (id_equipo !== null){
			var equipo_editar = $.grep(equipos, function(equipo, index){
				return equipo.id === id_equipo;
			});
			if (equipo_editar !== null && equipo_editar.length === 1){
				$('.form-editar-equipo').show();
				$('.form-editar-competiciones').hide();
				$('.equipo_id').val(equipo_editar[0].id);
				$('.equipo_nombre').val(equipo_editar[0].nombre);
				$('.equipo_abreviatura').val(equipo_editar[0].abreviatura);
				$('.equipo_escudo').val(equipo_editar[0].escudo);
				$('.equipo_img_escudo').attr('src', equipo_editar[0].escudo);

				$('.tabla-competiciones').find('tr').remove();
				competiciones_equipo = equipo_editar[0].competiciones;
				if (competiciones_equipo !== null && competiciones_equipo.length > 0){
					$.each(competiciones_equipo, function(index, competicion_equipo){
						var competicion = $.grep(competiciones, function(competicion, index){ return competicion.id === competicion_equipo.id_competicion; });
						var grupo = $.grep(grupos, function(grupo, index) { return grupo.id === competicion_equipo.id_grupo; });
						if (competicion !== null && competicion.length === 1 && grupo !== null && grupo.length === 1){
							var row = $('<tr>');
							row.append('<td>' + competicion[0].nombre + '</td>');
							row.append('<td>' + grupo[0].nombre + '</td>');
							row.append('<td><button class="editar-competicion" data-id-competicion="' + competicion_equipo.id_competicion + '">Editar</button></td>');
							row.append('<td><button class="borrar-competicion" data-id-competicion="' + competicion_equipo.id_competicion + '">Borrar</button></td>');
							$('.tabla-competiciones').append(row);
						}
					});
				}
			}
		}
	});
	
	$('body').on('click', '.crear-equipo', function(){
		$('.dato-equipo').val('');
		$('.tabla-competiciones').find('tr').remove();
		$('.form-editar-equipo').show();
		$('.form-editar-competiciones').hide();
	});
	
	$('body').on('click', '.editar-competicion', function(){
		$('.dato-competicion').val('');
		var id_competicion = parseInt($(this).attr('data-id-competicion'));
		if (id_competicion !== null){
			var competicion_editar = $.grep(competiciones_equipo, function(competicion, index){
				return competicion.id_competicion === id_competicion;
			});
			if (competicion_editar !== null && competicion_editar.length === 1){
				$('.form-editar-competiciones').show();
				$('.comp_competicion').val(competicion_editar[0].id_competicion);
				$('.comp_competicion').trigger('change');
				$('.comp_grupo').val(competicion_editar[0].id_grupo);
				$('.comp_competicion').attr('disabled', true);
			}
		}
	});

	$('body').on('click', '.crear-competicion', function(){
		$('.dato-competicion').val('');
		$('.form-editar-competiciones').show();
		$('.comp_competicion').attr('disabled', false);
		$('.comp_grupo').find('option').remove();
	});
	
	$('body').on('change', '.comp_competicion', function(){
		$('.comp_grupo').find('option').remove();
		var id_competicion = $(this).val();
		if (id_competicion !== null && id_competicion !== ""){
			var grupos_competicion = $.grep(grupos, function(grupo, index){
				return grupo.id_competicion === parseInt(id_competicion);
			});
			
			if (grupos_competicion !== null && grupos_competicion.length > 0){
				$.each(grupos_competicion, function(index, grupo_comp){
					$('.comp_grupo').append('<option value="' + grupo_comp.id + '">' + grupo_comp.nombre + '</option>');
				});
			}
		}
	});

	competiciones = getCompeticiones();
	$('.comp_competicion').append('<option value="">(Seleccionar una)</option>');
	$.each(competiciones, function(index, competicion){
		$('.comp_competicion').append('<option value="' + competicion.id + '">' + competicion.nombre + '</option>');
	});
	
	grupos = getGrupos();
	
	equipos = getEquipos();
	$('.tabla-equipos').find('tr').remove();
	if (equipos !== null && equipos.length > 0){
		$.each(equipos, function(index, equipo){
			var row = $('<tr>');
			row.append('<td>' + equipo.id + '</td>');
			row.append('<td>' + equipo.nombre + '</td>');
			row.append('<td>' + equipo.abreviatura + '</td>');
			row.append('<td><img src="' + equipo.escudo + '"/></td>');
			row.append('<td><button class="editar-equipo" data-id-equipo="' + equipo.id + '">Editar</button></td>');
			row.append('<td><button class="borrar-equipo" data-id-equipo="' + equipo.id + '">Borrar</button></td>');
			$('.tabla-equipos').append(row);
		});
	}
	$('.form-editar-equipo').hide();
	$('.form-editar-competiciones').hide();

});