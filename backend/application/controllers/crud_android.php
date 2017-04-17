<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Crud_android extends CI_Controller {




public function listar(){

$this->db->select('id,modelo,marca,color,placa,precio,ano,tipo');
$this->db->from('vehiculos');
$consulta=$this->db->get();
$resultado = $consulta->result_array();

echo json_encode($resultado);

}

  public function insertar($cedula ,$nombre ,$apellidos,$area,$semestre,$descripcion){

  $this->db->insert('monitores', array('cedula'=> $cedula,'nombre'=>$nombre ,'apellidos'=>$apellidos , 'area' => $area , 'semestre'=>$semestre , 'descripcion' => $descripcion));

  }

    public function editar($id , $cedula ,$nombre ,$apellidos,$area,$semestre,$descripcion ){

    $this->db->from('monitores');
    $this->db->where('id',$id);
    $this->db->update('monitores',array('cedula'=> $cedula,'nombre'=>$nombre ,'apellidos'=>$apellidos , 'area' => $area , 'semestre'=>$semestre , 'descripcion' => $descripcion));

    }

    
    public function eliminar($id){
      $this->db->where('id',$id);
      $this->db->delete('monitores');
      }









}


 ?>
