var estadios = [];
var equipos = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click', '.editar-estadio', function(){
		$('.dato-estadio').val('');
		var id_estadio = parseInt($(this).attr('data-id-estadio'));
		if (id_estadio !== null){
			var estadio_editar = $.grep(estadios, function(estadio, index){
				return estadio.id === id_estadio;
			});
			if (estadio_editar !== null && estadio_editar.length === 1){
				$('.form-editar-estadio').show();
				$('.estadio_id').val(estadio_editar[0].id);
				$('.estadio_nombre').val(estadio_editar[0].nombre);
				$('.estadio_ciudad').val(estadio_editar[0].ciudad);
				$('.estadio_equipo').val(estadio_editar[0].equipo_local);
			}
		}
	});
	
	$('body').on('click', '.crear-estadio', function(){
		$('.dato-estadio').val('');
		$('.form-editar-estadio').show();
	});
	
	equipos = getEquipos();
	$('.estadio_equipo').append('<option value="">(Seleccionar uno)</option>');
	$.each(equipos, function(index, equipo){
		$('.estadio_equipo').append('<option value="' + equipo.id + '">' + equipo.nombre + '</option>');
	});
	
	estadios = getEstadios();
	$('.tabla-estadios').find('tr').remove();
	if (estadios !== null && estadios.length > 0){
		$.each(estadios, function(index, estadio){
			var row = $('<tr>');
			row.append('<td>' + estadio.id + '</td>');
			row.append('<td>' + estadio.nombre + '</td>');
			row.append('<td>' + estadio.ciudad + '</td>');
			row.append('<td><button class="editar-estadio" data-id-estadio="' + estadio.id + '">Editar</button></td>');
			row.append('<td><button class="borrar-estadio" data-id-estadio="' + estadio.id + '">Borrar</button></td>');
			$('.tabla-estadios').append(row);
		});
	}
	$('.form-editar-estadio').hide();

});