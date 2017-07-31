var competicion_seleccionada = null;
var jornada_seleccionada = null;
var partidos = [];
var equipos = [];
var usuarios = [];

$(document).ready(function(){
	generarMenu();
	
	$('body').on('click','.selector-jornada', function(){
		jornada_seleccionada = $(this).attr('data-id-jornada');
		if (usuarios != null && usuarios.length > 0){
			partidos = getPartidosJornada(jornada_seleccionada);
			if (partidos && partidos.length > 0){
				$('.tabla-pronosticos').find('tr').remove();
				var thead = $('<thead>');
				var head_row = $('<tr>');
				head_row.append($('<th>'));
				$.each(partidos, function(index, partido){
					var equipo_1 = $.grep(equipos, function(equipo, index) { return equipo.id === partido.equipo_1; });
					var equipo_2 = $.grep(equipos, function(equipo, index) { return equipo.id === partido.equipo_2; });
					if (equipo_1 !== null && equipo_1.length === 1 && equipo_2 !== null && equipo_2.length === 1){					
						head_row.append('<th><img src="' + equipo_1[0].escudo + '">' + equipo_1[0].abreviatura + '-' + equipo_2[0].abreviatura + '<img src="' + equipo_2[0].escudo + '">');
					}
				});
				thead.append(head_row);
				$('.tabla-pronosticos').append(thead);

				var pronosticos = getPronosticos(jornada_seleccionada);
				$.each(usuarios, function(index, usuario){
					var row = $('<tr>');
					row.append('<td>' + usuario.login + '</td>');
					$.each(partidos, function(index, partido){
						var pronosticoPartido = null;
						if (pronosticos !== null && pronosticos.length > 0){
							pronosticoPartido = $.grep(pronosticos, function(pronostico, index){
								return pronostico.id_usuario === usuario.id && pronostico.id_partido === partido.id;
							});
						}
						row.append('<td>' + (pronosticoPartido === null || pronosticoPartido.length === 0 ? '-' : pronosticoPartido[0].goles_equipo_1 + '-' + pronosticoPartido[0].goles_equipo_2) + '</td>');
					});
					$('.tabla-pronosticos').append(row);
				});
			}
		}
	});
	
	usuarios = getUsuarios();
	competicion_seleccionada = getCompeticionSeleccionada();
	equipos = getEquiposCompeticion(competicion_seleccionada);

	var jornadas = getJornadasCompeticion(competicion_seleccionada);
	$.each(jornadas, function(index, jornada){
		$('.jornadas').append($('<div class="selector-jornada" data-id-jornada="' + jornada.id + '"><a href="#" data-numero-jornada="' + jornada.numero + '">' + jornada.nombre_corto + '</a></div>'));
	});
	
	jornada_seleccionada = getJornadaActual();
	$('.selector-jornada[data-id-jornada="' + jornada_seleccionada + '"]').trigger('click');
	
});