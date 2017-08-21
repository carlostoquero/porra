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
			divCompeticion += 	'<a href="./reglas.html" class="btn_login">' + competicion.nombre_competicion + '</a>';
			divCompeticion += '</div>';

			$('.competiciones').append(divCompeticion);
		});
	}
});

