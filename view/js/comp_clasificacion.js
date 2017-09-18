$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	var competicion_seleccionada = getCompeticionSeleccionada();
	var equipos = getEquiposCompeticion(competicion_seleccionada.id_competicion);
	var grupos = getGruposCompeticion(competicion_seleccionada.id_competicion);
	var jornadas = getJornadasCompeticion(competicion_seleccionada.id_competicion);
	
	$('.container-clasificacion-liga').hide();
	$('.container-clasificacion-copa').hide();
	
	if (competicion_seleccionada.id_tipo_competicion === 1 || competicion_seleccionada.id_tipo_competicion === 3){
		$('.container-clasificacion-liga').show();
		var clasificacion_liga = getClasificacionLigaEquipos(competicion_seleccionada.id_competicion);
		
		if (grupos !== null && grupos.length > 0 && clasificacion_liga !== null){
			var row = null;
			$.each(grupos, function(index, grupo){
				if (grupos.length === 1 || index % 2 === 0){
					if (row !== null) $('.container-clasificacion-liga').append(row);
					row = $('<div class="row">');
				}
				var clasif_grupo = clasificacion_liga[grupo.id_grupo];
				if (clasif_grupo && clasif_grupo.length > 0){
					var cell = $('<div class="col-xs-12 col-sm-' + (grupos.length > 1 ? '6' : '12') + ' col-md-' + (grupos.length > 1 ? '6' : '12') + '">');
					var cellContent = $('<div class="row">');
					cellContent.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-3"></div>');
					var div = $('<div class="col-xs-10 col-sm-8 col-md-6 col-lg-6">');
					div.append('<div><h3 class="title">' + grupo.nombre_grupo + '</h3></div>');
					
					var table = $('<table class="clasificacion-equipos" data-id-grupo="' + grupo.id_grupo + '">');

					var header = $('<thead>');
					header.append('<th></th><th class="coVC-pais">Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>PTS</th>');
					table.append(header);

					var body = $('<tbody>');
					$.each(clasif_grupo, function(index, clasif_equipo){
						var equipo = findElementByField(equipos, "id_equipo", clasif_equipo.id_equipo);
						var tr = $('<tr>');
						tr.append('<td><img src="' + equipo.url_escudo + '"/></td>');
						tr.append('<td class="coVC-pais">' + equipo.nombre_equipo + '</td>');
						tr.append('<td>' + clasif_equipo.jugados + '</td>');
						tr.append('<td>' + clasif_equipo.ganados + '</td>');
						tr.append('<td>' + clasif_equipo.empatados + '</td>');
						tr.append('<td>' + clasif_equipo.perdidos + '</td>');
						tr.append('<td>' + clasif_equipo.goles_favor + '</td>');
						tr.append('<td>' + clasif_equipo.goles_contra + '</td>');
						tr.append('<td>' + clasif_equipo.puntos + '</td>');
						body.append(tr);
					});
					table.append(body);

					div.append(table);
					cellContent.append(div);
					cellContent.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-3"></div>');
					
					cell.append(cellContent);
					row.append(cell);
				}
			});
			$('.container-clasificacion-liga').append(row);
		}
	}
	
	if (competicion_seleccionada.id_tipo_competicion === 2 || competicion_seleccionada.id_tipo_competicion === 3){
		$('.container-clasificacion-copa').show();
		var clasificacion_copa = getClasificacionCopaEquipos(competicion_seleccionada.id_competicion);
		if (clasificacion_copa !== null){
			var row = $('<div class="row">');
			row.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-3"></div>');
			var rowContent = $('<div class="col-xs-10 col-sm-8 col-md-6 col-lg-6">');
			var anchura = 12 / Object.keys(clasificacion_copa).length;
			var posicion = 0;
			for (var key in clasificacion_copa){
				var jornada = findElementByField(jornadas, "id_jornada", parseInt(key));
				if (jornada !== null) {
					var cell = $('<div class="col-md-' + anchura + '">');
					cell.append('<h3>' + jornada.nombre_corto + '</h3>');
					$.each(clasificacion_copa[key], function(index, partido){
						var equipo_1 = findElementByField(equipos, "id_equipo", partido.id_equipo_1);
						var equipo_2 = findElementByField(equipos, "id_equipo", partido.id_equipo_2);
						
						for (i = 0; i < posicion; i++) cell.append('<div class="row">&nbsp;</div>');

						var rowEquipo1 = $('<div class="row">');
						rowEquipo1.append('<img src="' + (equipo_1 === null ? '../img/NONE.png' : equipo_1.url_escudo) + '"/>');
						rowEquipo1.append(equipo_1 === null ? 'Desconocido' : equipo_1.nombre_equipo);
						rowEquipo1.append(partido.goles_equipo_1);
						cell.append(rowEquipo1);

						var rowEquipo2 = $('<div class="row">');
						rowEquipo2.append('<img src="' + (equipo_2 === null ? '../img/NONE.png' : equipo_2.url_escudo) + '"/>');
						rowEquipo2.append(equipo_2 === null ? 'Desconocido' : equipo_2.nombre_equipo);
						rowEquipo2.append(partido.goles_equipo_2);
						cell.append(rowEquipo2);
						
						for (i = 0; i < posicion; i++) cell.append('<div class="row">&nbsp;</div>');
					});
					rowContent.append(cell);
					posicion++;
				}
			}
			row.append(rowContent);
			row.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-3"></div>');
			$('.container-clasificacion-copa').append(row);
		}
	}
});