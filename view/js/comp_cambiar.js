$(document).ready(function(){
	generarMenu();
	
	var competiciones = getCompeticionesUsuario(1);
	if (competiciones !== null && competiciones.length > 0){
		$('.competiciones').html('');
		$.each(competiciones, function(index, competicion) {
			var divCompeticion = '';
			divCompeticion += '<div class="form-button">';
			divCompeticion += 	'<a href="./reglas.html" class="btn_login">' + competicion.nombre + '</a>';
			divCompeticion += '</div>';

			$('.competiciones').append(divCompeticion);
		});
	}
});

