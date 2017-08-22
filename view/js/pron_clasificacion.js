var competicion_seleccionada = null;
var usuarios = null;
var jornadas = null;

$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();

	competicion_seleccionada = getCompeticionSeleccionada();
	usuarios = getUsuariosCompeticion(competicion_seleccionada.id_competicion);
	jornadas = getJornadasCompeticion(competicion_seleccionada.id_competicion);
	
	$('.tabla-clasificacion').find('tr').remove();
	var row = $('<tr>');
	row.append($('<th>'));
	$.each(jornadas, function(index, jornada){
		row.append('<th>' + jornada.nombre_corto + '</th>');
	});
	$('.tabla-clasificacion').append(row);
	
	var puntos = getClasificacionUsuarios();
	$.each(usuarios, function(index, usuario){
		var row = $('<tr>');
		row.append('<td>' + usuario.login + '</td>');
		
		$.each(jornadas, function(index, jornada){
			var puntosJornada = null;
			if (puntos !== null && puntos.length > 0){
				puntosJornada = $.grep(puntos, function(punto, index){
					return punto.id_usuario === usuario.id_usuario && punto.id_jornada === jornada.id_jornada;
				});
			};
			row.append('<td>' + (puntosJornada === null || puntosJornada.length === 0 ? '-' : puntosJornada[0].valor) + '</td>');
		});
		$('.tabla-clasificacion').append(row);
	});


});