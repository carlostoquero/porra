var usuario_conexion = null;
$(document).ready(function(){
	usuario_conexion = usuarioConectado(false); // No necesario administrador
	generarMenu();
	generarFooter();
	loadUsuario();
	
	$('body').on('click', '.guardar-usuario', function(){
		$('.errores').html('');
		if (checkInput()){
			var datos_usuario = {};
			datos_usuario.id = parseInt($('.usr-id').val());
			datos_usuario.password = $('.new-pwd').val();
			datos_usuario.nombre = $('.usr-name').val();
			datos_usuario.apellidos = $('.usr-surname').val();
			datos_usuario.comentarios = $('.usr-comments').val();
			datos_usuario.email = $('.usr-email').val();
			
			var resultado_guardado = getAjaxSync('ServicioUsuarios', 'ActualizarUsuario', JSON.stringify(datos_usuario));
			if (resultado_guardado === "ok") loadUsuario();
		}
	});
	
	function loadUsuario(){
		var usuario = getUsuario(usuario_conexion.id_usuario);
		if (usuario !== null){
			if (usuario.hasOwnProperty('id_usuario')) $('.usr-id').val(usuario.id_usuario);
			if (usuario.hasOwnProperty('login')) $('.usr-login').val(usuario.login);
			if (usuario.hasOwnProperty('nombre')) $('.usr-name').val(usuario.nombre);
			if (usuario.hasOwnProperty('apellidos')) $('.usr-surname').val(usuario.apellidos);
			if (usuario.hasOwnProperty('comentarios')) $('.usr-comments').val(usuario.comentarios);
			if (usuario.hasOwnProperty('email')) $('.usr-email').val(usuario.email);
			$('.new-pwd').val('');
			$('.conf-pwd').val('');
		}
	}
	
	function checkInput(){
		var correct_input = true;
		
		// Validar nombre 		
		if ($('.usr-name').val() === null || $('.usr-name').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo nombre</div>');
		}

		// Validar apellidos
		if ($('.usr-surname').val() === null || $('.usr-surname').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo apellidos</div>');
		}

		// Validar correo		$('.usr-email')
		if ($('.usr-email').val() === null || $('.usr-email').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el campo email</div>');
		} else {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!regex.test($('.usr-email').val())){
				correct_input = false;
				$('.errores').append('<div>Email incorrecto</div>');
			}
		}

		// Validar password
		if (($('.new-pwd').val() === null || $('.new-pwd').val() === "" || $('.conf-pwd').val() === null || $('.conf-pwd').val() === "" ) &&
		    (!($('.new-pwd').val() === "") && ($('.conf-pwd').val() === ""))){
			correct_input = false;
			$('.errores').append('<div>Deben informarse ambos campos de password</div>');
		} else {
			if ($('.new-pwd').val() !== $('.conf-pwd').val()) {
				correct_input = false;
				$('.errores').append('<div>Los passwords no coinciden</div>');
			}
		}
		return correct_input;
	}

});