var usuario = null;

$(document).ready(function(){
	var usuario_conexion = usuarioConectado();
	
	generarMenu();
	usuario = getUsuario(usuario_conexion.id_usuario);
	
	if (usuario !== null){
		if (usuario.hasOwnProperty('id')) $('.usr-id').val(usuario.id);
		if (usuario.hasOwnProperty('login')) $('.usr-login').val(usuario.login);
		if (usuario.hasOwnProperty('nombre')) $('.usr-name').val(usuario.nombre);
		if (usuario.hasOwnProperty('apellidos')) $('.usr-surname').val(usuario.apellidos);
		if (usuario.hasOwnProperty('comentarios')) $('.usr-comments').val(usuario.comentarios);
		if (usuario.hasOwnProperty('email')) $('.usr-email').val(usuario.email);
	}
	
});