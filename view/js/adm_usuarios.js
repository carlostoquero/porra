var competiciones = [];
var usuarios = [];
var estados_usuario = [];
var accesos_usuario = [];

$(document).ready(function(){
	generarMenu();
	
	accesos_usuario = getAccesosUsuarioMockup();
	estados_usuario = getEstadosUsuarioMockup();
	competiciones = getCompeticiones();
	usuarios = getUsuarios();
	$('.tabla-usuarios').find('tr').remove();
	if (competiciones !== null && competiciones.length > 0 && usuarios !== null && usuarios.length > 0){
		// Cabecera
		var row = $('<tr>');
		row.append('<th></th>');
		row.append('<th>Estado</th>');
		row.append('<th>Acceso</th>');
		$.each(competiciones, function(index, competicion){
			row.append('<th>' + competicion.nombre + '</th>');
		});
		$('.tabla-usuarios').append(row);
		
		// Contenido tabla
		$.each(usuarios, function(index, usuario){
			var row = $('<tr>');
			row.append('<td>' + usuario.login + '</td>');
			row.append('<td><select class="estado-usuario" data-id-usuario="' + usuario.id + '"/></td>');
			row.append('<td><select class="acceso-usuario" data-id-usuario="' + usuario.id + '"/></td>');
			$.each(competiciones, function(index, competicion){
				var column = $('<td>');
				column.append('<input type="checkbox" class="participa-competicion" data-id-usuario="' + usuario.id + '" data-id-competicion="' + competicion.id + '" />');
				column.append('<input type="checkbox" class="pagada-competicion" data-id-usuario="' + usuario.id + '" data-id-competicion="' + competicion.id + '" />');
				row.append(column);
			});
			
			$('.tabla-usuarios').append(row);
		});
	}
	
	$('.acceso-usuario').append('<option value="">(Seleccione)</option>');
	if (accesos_usuario !== null && accesos_usuario.length > 0){
		$.each(accesos_usuario, function(index, acceso){
			$('.acceso-usuario').append('<option value="' + acceso.id_acceso + '">' + acceso.nombre_acceso + '</option>');
		});
	}

	$('.estado-usuario').append('<option value="">(Seleccione)</option>');
	if (estados_usuario !== null && estados_usuario.length > 0){
		$.each(estados_usuario, function(index, estado){
			$('.estado-usuario').append('<option value="' + estado.id_estado + '">' + estado.nombre_estado + '</option>');
		});
	}
	
	$.each(usuarios, function(index, usuario){
		$('.estado-usuario[data-id-usuario="' + usuario.id + '"]').val(usuario.id_estado);
		$('.acceso-usuario[data-id-usuario="' + usuario.id + '"]').val(usuario.id_acceso);
		$.each(usuario.competiciones, function(index, competicion){
			$('.participa-competicion[data-id-usuario="' + usuario.id + '"][data-id-competicion="' + competicion + '"]').prop('checked', true);
			$('.pagada-competicion[data-id-usuario="' + usuario.id + '"][data-id-competicion="' + competicion + '"]').prop('checked', true);
		});
	});
});