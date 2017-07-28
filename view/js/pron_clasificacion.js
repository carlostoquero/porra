var usuarios = null;
var jornadas = null;

$(document).ready(function(){
	generarMenu();
	
	usuarios = getUsuarios();
	jornadas = getJornadasCompeticion(1);
	
	$('.tabla-clasificacion').find('tr').remove();
	var row = $('<tr>');
	row.append($('<th>'));
	$.each(jornadas, function(index, jornada){
		row.append('<th>' + jornada.nombre_corto + '</th>');
	});
	$('.tabla-clasificacion').append(row);
	
	var puntos = getPuntos();
	$.each(usuarios, function(index, usuario){
		var row = $('<tr>');
		row.append('<td>' + usuario.login + '</td>');
		
		$.each(jornadas, function(index, jornada){
			var puntosJornada = null;
			if (puntos !== null && puntos.length > 0){
				puntosJornada = $.grep(puntos, function(punto, index){
					return punto.id_usuario === usuario.id && punto.id_jornada === jornada.id;
				});
			};
			row.append('<td>' + (puntosJornada === null || puntosJornada.length === 0 ? '-' : puntosJornada[0].valor) + '</td>');
		});
		$('.tabla-clasificacion').append(row);
	});


});