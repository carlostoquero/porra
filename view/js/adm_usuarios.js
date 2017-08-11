var competiciones = [];
var usuarios = [];
var competiciones_usuarios = [];
var estados_usuario = [];
var accesos_usuario = [];

$(document).ready(function(){
	generarMenu();
	
	accesos_usuario = getAccesosUsuario();
	estados_usuario = getEstadosUsuario();
	competiciones = getCompeticiones();
	usuarios = getUsuarios();
	competiciones_usuarios = getCompeticionesUsuarios();
	
	$('.tabla-usuarios').find('tr').remove();
	if (competiciones !== null && competiciones.length > 0 && usuarios !== null && usuarios.length > 0){
		// Cabecera
		var row = $('<tr>');
		row.append('<th></th>');
		row.append('<th>Estado</th>');
		row.append('<th>Acceso</th>');
		$.each(competiciones, function(index, competicion){
			row.append('<th>' + competicion.nombre_competicion + '</th>');
		});
		$('.tabla-usuarios').append(row);
		
		// Contenido tabla
		$.each(usuarios, function(index, usuario){
			var row = $('<tr>');
			row.append('<td>' + usuario.login + '</td>');
			row.append('<td><select class="estado-usuario" data-id-usuario="' + usuario.id_usuario + '"/></td>');
			row.append('<td><select class="acceso-usuario" data-id-usuario="' + usuario.id_usuario + '"/></td>');
			$.each(competiciones, function(index, competicion){
				var div = $('<div class="usr-comp" data-id-usuario="' + usuario.id_usuario + '" data-id-competicion="' + competicion.id_competicion + '">');
				div.append('<input type="checkbox" class="participa-competicion check-usr"/>');
				div.append('<input type="checkbox" class="pagada-competicion check-usr"/>');
				var column = $('<td>');
				column.append(div);
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
	
	$('.check-usr').prop('checked', false);
	$.each(usuarios, function(index, usuario){
		$('.estado-usuario[data-id-usuario="' + usuario.id_usuario + '"]').val(usuario.id_estado);
		$('.acceso-usuario[data-id-usuario="' + usuario.id_usuario + '"]').val(usuario.id_acceso);
		
		var competiciones_usuario = $.grep(competiciones_usuarios, function(usr_comp, index){
			return usr_comp.id_usuario === usuario.id_usuario;
		});
		
		$.each(competiciones_usuario, function(index, comp_usr){
			$('.participa-competicion[data-id-usuario="' + comp_usr.id_usuario + '"][data-id-competicion="' + comp_usr.id_competicion + '"]').prop('checked', true);
			if (comp_usr.pagado) $('.pagada-competicion[data-id-usuario="' + comp_usr.id_usuario + '"][data-id-competicion="' + comp_usr.id_competicion + '"]').prop('checked', true);
		});
	});
});