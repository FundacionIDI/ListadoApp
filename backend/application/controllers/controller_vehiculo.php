<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class controller_vehiculo extends CI_Controller {


	public function index()
	{
    	$this->load->view('index');

	}

	public function listar()
	{
		$this->load->model("model_vehiculo");
		$vehiculos=$this->model_vehiculo->listar();
        echo json_encode(array(array('data' => $vehiculos)));
	}

	public function add()
	{
		$data = json_decode($_POST['data']);
		$this->load->model("model_vehiculo");
		$this->usuario->guardar($data->modelo, $data->marca, $data->color, $data->placa, $data->precio, $data->ano, $data->tipo);
	}

	public function update()
	{
		$data = json_decode($_POST['data']);
		$this->load->model("model_vehiculo");
		$this->usuario->actualizar($data->modelo, $data->marca, $data->color, $data->placa, $data->precio, $data->ano, $data->tipo);
	}

	public function delete()
	{
		$data = json_decode($_POST['data']);
		$this->load->model("model_vehiculo");
		if (is_array($data)) {
			for ($i=0; $i <count($data) ; $i++) {
    		  $this->usuario->eliminar($data[$i]->id);
    		}
		}else{
			  $this->usuario->eliminar($data->id);
		}

	}

}
