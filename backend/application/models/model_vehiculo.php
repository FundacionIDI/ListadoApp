<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class model_vehiculo extends CI_Model {

	public function listar()
	{
		$Vehiculos=array();

		$this->db->select('*');
		$this->db->order_by('modelo ASC');
		$this->db->from('vehiculo');
		$retorno=$this->db->get();
		$Vehiculos=$retorno->result_array();

		return $Vehiculos;
	}

	public function actualizar($id, $modelo, $marca, $color, $placa, $precio, $ano, $tipo)
	{
     	$this->db->from('vehiculo');
        $this->db->where('id', $id);
	    $this->db->update('vehiculo', array(
			"modelo"=>$modelo,
			"marca"=>$marca,
		    "color"=>$color,
		    "placa"=>$placa,
		    "precio"=>$precio,
		    "ano"=>$ano,
		    "tipo"=>$tipo));
	}

	public function eliminar($id)
    {
	 $this->db->where('id', $id);
	 $this->db->delete('vehiculo');
    }

	public function guardar($modelo, $marca, $color, $placa, $precio, $ano, $tipo)
	{
		$retorno=false;

        $this->db->select('count(*) as cantidad');
		$this->db->from('vehiculo');
		$this->db->where('id', NULL);
		$result=$this->db->get();
		$cantidad=$result->result_array();
		if($cantidad[0]["cantidad"]==0){
			$this->db->insert('vehiculo', array(
				"modelo"=>$modelo,
				"marca"=>$marca,
			    "color"=>$color,
			    "placa"=>$placa,
			    "precio"=>$precio,
			    "ano"=>$ano,
			    "tipo"=>$tipo));

			$retorno=true;
		}
		return $retorno;
	}

}
