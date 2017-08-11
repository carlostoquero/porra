<?php
class CUsuario {
  public $id_usuario;
  public $login;
  public $password;
  public $nombre;
  public $apellidos;
  public $comentarios;
  public $email;
  public $id_estado;
  public $id_acceso;

  public function CUsuario($id, $login, $password, $nombre, $apellidos, $comentarios, $email, $estado, $acceso ){
    $this->id_usuario = $id;
    $this->login = $login;
    $this->password = $password;
    $this->nombre = $nombre;
    $this->apellidos = $apellidos;
    $this->comentarios = $comentarios;
    $this->email = $email;
    $this->id_estado = $estado;
    $this->id_acceso = $acceso;
  }
}

class CCompeticionUsuario{
	public $id_usuario;
	public $id_competicion;
	public $pagado;
	
	public function CCompeticionUsuario($usuario, $competicion, $pagado){
		$this->id_usuario = $usuario;
		$this->id_competicion = $competicion;
		$this->pagado = $pagado;
	}
}
?>