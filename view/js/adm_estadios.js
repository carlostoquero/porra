var estadios = [];
var equipos = [];

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(true); // SI necesario administrador
	generarMenu();
	generarFooter();
	
	$('body').on('click', '.editar-estadio', function(){
		$('.dato-estadio').val('');
		var id_estadio = parseInt($(this).attr('data-id-estadio'));
		if (id_estadio !== null){
			var estadio_editar = findElementByField(estadios, "id_estadio", id_estadio);
			if (estadio_editar !== null){
				$('.form-editar-estadio').show();
				$('.estadio_id').val(estadio_editar.id_estadio);
				$('.estadio_nombre').val(estadio_editar.nombre_estadio);
				$('.estadio_ciudad').val(estadio_editar.ciudad_estadio);
				$('.estadio_equipo').val(estadio_editar.id_equipo_local);
			}
		}
	});
	
	$('body').on('click', '.borrar-estadio', function(){
		var id_estadio = parseInt($(this).attr('data-id-estadio'));
		if (id_estadio !== null){
			var estadio_borrar = findElementByField(estadios, "id_estadio", id_estadio);
			if (estadio_borrar !== null){
				if (confirm("Borrar el estadio '" + estadio_borrar.nombre_estadio + "'?")){
					var resultado_borrado = getAjaxSync('BorrarEstadio', JSON.stringify({id: estadio_borrar.id_estadio}));
					if (resultado_borrado === "ok") loadEstadios();
				}
			}
		}
	});

	$('body').on('click', '.crear-estadio', function(){
		$('.dato-estadio').val('');
		$('.form-editar-estadio').show();
	});

	$('body').on('click', '.guardar-estadio', function(){
		$('.errores').html('');
		if (checkInput()){
			var datos_estadio = {};
			if ($('.estadio_id').val() !== null && $('.estadio_id').val() !== "") datos_estadio.id = parseInt($('.estadio_id').val());
			datos_estadio.nombre = $('.estadio_nombre').val();
			datos_estadio.ciudad = $('.estadio_ciudad').val();
			if ($('.estadio_equipo').val() !== null && $('.estadio_equipo').val() !== "") datos_estadio.equipo_local = parseInt($('.estadio_equipo').val());
			
			var resultado_guardado = getAjaxSync('GuardarEstadio', JSON.stringify(datos_estadio));
			if (resultado_guardado === "ok") loadEstadios();
		}
	});
	
	equipos = getEquipos();
	$('.estadio_equipo').append('<option value="">(Seleccionar uno)</option>');
	$.each(equipos, function(index, equipo){
		$('.estadio_equipo').append('<option value="' + equipo.id_equipo + '">' + equipo.nombre_equipo + '</option>');
	});
	loadEstadios();
	
	function loadEstadios(){
		estadios = getEstadios();
		$('.tabla-estadios').find('tr').remove();
		if (estadios !== null && estadios.length > 0){
			$.each(estadios, function(index, estadio){
				var row = $('<tr>');
				row.append('<td>' + estadio.id_estadio + '</td>');
				row.append('<td>' + estadio.nombre_estadio + '</td>');
				row.append('<td>' + estadio.ciudad_estadio + '</td>');
				row.append('<td><button class="editar-estadio" data-id-estadio="' + estadio.id_estadio + '">Editar</button></td>');
				row.append('<td><button class="borrar-estadio" data-id-estadio="' + estadio.id_estadio + '">Borrar</button></td>');
				$('.tabla-estadios').append(row);
			});
		}
		$('.form-editar-estadio').hide();
	}
	
	function checkInput(){
		var correct_input = true;
		if ($('.estadio_nombre').val() === null || $('.estadio_nombre').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo nombre</div>');
		}
		if ($('.estadio_ciudad').val() === null || $('.estadio_ciudad').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo ciudad</div>');
		}
		return correct_input;
	}

});