$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	var clasificacion = getClasificacionEquipos();
	if (clasificacion !== null && clasificacion.length > 0){
		$.each(clasificacion, function(index, clasif_grupo){
			var cell = $('<div class="row">');
			cell.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-4"></div>');
			var div = $('<div class="col-xs-10 col-sm-8 col-md-6 col-lg-4">');
			div.append('<div><h3 class="title">' + clasif_grupo.nombre_grupo + '</h3></div>');
			
			var table = $('<table class="clasificacion-equipos" data-id-grupo="' + clasif_grupo.id_grupo + '">');

			var header = $('<thead>');
			header.append('<th></th><th class="coVC-pais">Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>PTS</th>');
			table.append(header);

			var body = $('<tbody>');
			if (clasif_grupo.clasificacion !== null && clasif_grupo.clasificacion.length > 0) {
				$.each(clasif_grupo.clasificacion, function(index, clasif_equipo){
					var tr = $('<tr>');
					tr.append('<td><img src="' + clasif_equipo.url_escudo + '"/></td>');
					tr.append('<td class="coVC-pais">' + clasif_equipo.nombre_equipo + '</td>');
					tr.append('<td>' + clasif_equipo.jugados + '</td>');
					tr.append('<td>' + clasif_equipo.ganados + '</td>');
					tr.append('<td>' + clasif_equipo.empatados + '</td>');
					tr.append('<td>' + clasif_equipo.perdidos + '</td>');
					tr.append('<td>' + clasif_equipo.goles_favor + '</td>');
					tr.append('<td>' + clasif_equipo.goles_contra + '</td>');
					tr.append('<td>' + clasif_equipo.puntos + '</td>');
					body.append(tr);
				});
			}
			table.append(body);

			div.append(table);
			cell.append(div);
			cell.append('<div class="col-xs-1 col-sm-2 col-md-3 col-lg-4"></div>');
			
			$('.container-clasificacion').append(cell);
		});
	}
});