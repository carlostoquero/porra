$(document).ready(function(){
	var correctLogout = TRABAJANDO_EN_LOCAL ? "ok" : getAjaxSync('ServicioUsuarios', 'Logout');
	if (correctLogout === "ok") location.href = './login.html';
	else location.href = './reglas.html';
});