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
        echo json_encode(array('data' => $vehiculos));
	}

	public function listarTipos(){
        $this->load->model("model_vehiculo");
        $tipos=$this->model_vehiculo->cargarTipos();
        //$query = $this->db->query("SHOW COLUMNS FROM vehiculo LIKE 'tipo'");

        echo json_encode(array('data' => $tipos));

    }

    public function listarMarcas(){
        $this->load->model("model_vehiculo");
        $tipos=$this->model_vehiculo->cargarMarcas();
        //$query = $this->db->query("SHOW COLUMNS FROM vehiculo LIKE 'tipo'");

        echo json_encode(array('data' => $tipos));

    }

	public function add()
	{
		$data = json_decode($_POST['data']);
		$this->load->model("model_vehiculo");
		$this->model_vehiculo->guardar($data->modelo, $data->marca, $data->color, $data->placa, $data->precio, $data->ano, $data->tipo);
	}

	public function update()
	{
		$data = $this->input->post();

		$this->load->model("model_vehiculo");
		$this->model_vehiculo->actualizar($data["id"], $data["modelo"], $data["marca"], $data["color"], $data["placa"], $data["precio"], $data["ano"], $data["tipo"]);

	}

	public function delete()
	{
		 $data = $this->input->post();

		 $this->load->model("model_vehiculo");
		 $id = (int) $data["id"];
	     $this->model_vehiculo->eliminar($id);

	}

	public function marca(){
        $data = $this->input->post();
        $this->load->model("model_vehiculo");
        $vehiculos=$this->model_vehiculo->CanyPrePorMarca($data["marca"]);
        echo json_encode(array('data' => $vehiculos));
    }

    public function tipo(){
        $data = $this->input->post();
        $this->load->model("model_vehiculo");
        $vehiculos=$this->model_vehiculo->CanyPrePorTipo( $data["tipo"]);
        echo json_encode(array('data' => $vehiculos));

    }
}
