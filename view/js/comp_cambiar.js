$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	var competiciones = getCompeticionesUsuario(usuario_conexion.id_usuario);
	if (competiciones !== null && competiciones.length > 0){
		$('.competiciones').html('');
		$.each(competiciones, function(index, competicion) {
			var divCompeticion = '';
			divCompeticion += '<div class="form-button">';
			divCompeticion += 	'<a href="#" class="select-competicion" data-id-competicion="' + competicion.id_competicion + '">' + competicion.nombre_competicion + '</a>';
			divCompeticion += '</div>';

			$('.competiciones').append(divCompeticion);
		});
	}
	
	$('body').on('click', '.select-competicion', function(){
		var idCompeticion = $(this).attr('data-id-competicion') !== null && $(this).attr('data-id-competicion') !== "" ? parseInt($(this).attr('data-id-competicion')) : null;
		if (idCompeticion !== null){
			var resultado_cambio = getAjaxSync('ServicioCompeticiones', 'SetCompeticionSeleccionada', JSON.stringify({id: idCompeticion}));
			if (resultado_cambio === "ok") location.href = './reglas.html'; 
		}
	});
});

