$(document).ready(function(){
	var correctLogout = TRABAJANDO_EN_LOCAL ? "ok" : getAjaxSync('Logout');
	if (correctLogout === "ok") location.href = './login.html';
	else location.href = './reglas.html';
});