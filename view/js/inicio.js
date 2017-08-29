$(document).ready(function(){
	var usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	
	if (usuario_conexion.id_acceso === 2) $('.administrador').show();

});

