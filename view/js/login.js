$(document).ready(function(){
	$('.btn_login').on('click', function(){
		$('.errores').html('');
		if (checkInput()){
			var login = $('#in_user').val();
			var password = $('#in_password').val();
			
			var correctLogin = TRABAJANDO_EN_LOCAL ? "ok" : getAjaxSync('ServicioUsuarios', 'Login', JSON.stringify({login: login, password : password}));
			if (correctLogin === "ok") location.href = './inicio.html';
			else $('.errores').append('<div>Login incorrecto.</div>');
		}
	});
	generarFooter();
	
	function checkInput(){
		var correct_input = true;
		if ($('#in_user').val() === null || $('#in_user').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse el nombre de usuario</div>');
		} 
		if ($('#in_password').val() === null || $('#in_password').val() === ""){
			correct_input = false;
			$('.errores').append('<div>Debe informarse la contraseña</div>');
		} 
		return correct_input;

	}
});