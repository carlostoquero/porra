$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	var competicion_seleccionada = getCompeticionSeleccionada();
	var equipos = getEquiposCompeticion(competicion_seleccionada.id_competicion);
	var grupos = getGruposCompeticion(competicion_seleccionada.id_competicion);
	var clasificacion = getClasificacionEquipos(competicion_seleccionada.id_competicion);
	
	if (grupos !== null && grupos.length > 0 && clasificacion !== null){
		var row = null;
		$.each(grupos, function(index, grupo){
			if (grupos.length === 1 || index % 2 === 0){
				if (row !== null) $('.container-clasificacion').append(row);
				row = $('<div class="row">');
			}
			var clasif_grupo = clasificacion[grupo.id_grupo];
			if (clasif_grupo && clasif_grupo.length > 0){
				var cell = $('<div class="col-xs-12 col-sm-' + (grupos.length > 1 ? '6' : '12') + ' col-md-' + (grupos.length > 1 ? '6' : '12') + '">');
				var cellContent = $('<div class="row">');
				cellContent.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-4"></div>');
				var div = $('<div class="col-xs-10 col-sm-8 col-md-6 col-lg-4">');
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
				cellContent.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-4"></div>');
				
				cell.append(cellContent);
				row.append(cell);
			}
		});
		$('.container-clasificacion').append(row);
	}
});