<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class CrudM_android extends CI_MODEL {





  public function listar(){

  $this->db->select('id,modelo,marca,color,placa,precio,ano,tipo');
  $this->db->from('vehiculos');
  $consulta=$this->db->get();
  $resultado = $consulta->result_array();
  return $resultado;


  }


  public function insert($modelo,$marca,$color,$placa,$precio,$ano,$tipo){
  $data = array('modelo'=> $modelo,'marca'=>$marca ,'color'=>$color , 'placa' => $placa , 'precio'=>$precio , 'ano' => $ano,'tipo'=>$tipo);
  $this->db->insert('vehiculos', $data);

}


  public function editar($id,$modelo,$marca,$color,$placa,$precio,$ano,$tipo ){
  $data = array('modelo'=> $modelo,'marca'=>$marca ,'color'=>$color , 'placa' => $placa , 'precio'=>$precio , 'ano' => $ano,'tipo'=>$tipo);
  $this->db->where('id',$id);
  $this->db->update('vehiculos', $data);
  }


  public function eliminar($id){
  $this->db->where('id',$id);
  $this->db->delete('vehiculos');
  }




  public function rtipo(){

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos WHERE tipo = 'carro' ");

    $q1 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos WHERE tipo = 'camioneta' ");
    $q2 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos WHERE tipo = 'camion' ");
    $q3 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos WHERE tipo = 'bus' ");
    $q4 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos WHERE tipo = 'buseta' ");
    $q5 = $this->db->get()->result();

    $this->db->select("COUNT(id) as totalotro, AVG(precio) as promediootro FROM vehiculos WHERE tipo = 'otro' ");
    $q6 = $this->db->get()->result();

    return array_merge($q1,$q2,$q3,$q4,$q5,$q6);

  }


  public function rmarca(){

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','mazda' );
    $q1 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','chevrolet' );
    $q2 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','renault' );
    $q3 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','audi' );
    $q4 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','mercedez' );
    $q5 = $this->db->get()->result();

    $this->db->select("COUNT(id) as total, AVG(precio) as promedio FROM vehiculos ");
    $this->db->like ('marca','hyundai' );
    $q6 = $this->db->get()->result();


    return array_merge($q1,$q2,$q3,$q4,$q5,$q6);

  }







}











 ?>
