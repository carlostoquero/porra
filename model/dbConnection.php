<?php
class dbConnection {
	protected static $_instance;
	public $mysqli;

	public function __construct() {
		$host = "164.132.238.193";
		$user = "pucela";
		$pass = "Lario0730#Tok0816";
		$db = "porracomes";

		$this->mysqli = new mysqli($host, $user, $pass, $db)
			or die("There was a problem connecting to the database");
	}

	public function close() {
		$this->mysqli->close();
	}

	public function query($q) {
		return $this->mysqli->query($q);
	}
}
?>