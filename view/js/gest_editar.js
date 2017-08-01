var usuario = null;

$(document).ready(function(){
	generarMenu();
	usuario = getUsuario(8);
	
	if (usuario !== null){
		if (usuario.hasOwnProperty('id')) $('.usr-id').val(usuario.id);
		if (usuario.hasOwnProperty('login')) $('.usr-login').val(usuario.login);
		if (usuario.hasOwnProperty('nombre')) $('.usr-name').val(usuario.nombre);
		if (usuario.hasOwnProperty('apellidos')) $('.usr-surname').val(usuario.apellidos);
		if (usuario.hasOwnProperty('comentarios')) $('.usr-comments').val(usuario.comentarios);
		if (usuario.hasOwnProperty('email')) $('.usr-email').val(usuario.email);
	}
	
});