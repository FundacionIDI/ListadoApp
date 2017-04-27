<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Crud_android extends CI_Controller {


  public function listar() {

	$this->load->model('crudM_android');
	echo json_encode(array('data' => $this->crudM_android->listar()));

	}


  public function insertar(){
  $data=$this->input->post();
  $this->load->model('crudM_android');
  $this->crudM_android->insert($data['modelo'],$data['marca'],$data['color'],$data['placa'],$data['precio'],$data['ano'],$data['tipo']);
  }

  public function listartipo() {
  $this->load->model('crudM_android');
  echo json_encode(array('data' => $this->crudM_android->rtipo()));
  }

  public function listarmarca() {
  $this->load->model('crudM_android');
  echo json_encode(array('data' => $this->crudM_android->rmarca()));
  }

  public function modificar() {
  $data=$this->input->post();
  $this->load->model('crudM_android');
  $this->crudM_android->editar($data['id'],$data['modelo'],$data['marca'],$data['color'],$data['placa'],$data['precio'],$data['ano'],$data['tipo']);
  }

  public function eliminar(){
  $data=$this->input->post();
  $this->load->model('crudM_android');
  $this->crudM_android->eliminar($data['id'],$data['modelo'],$data['marca'],$data['color'],$data['placa'],$data['precio'],$data['ano'],$data['tipo']);
  }








}
