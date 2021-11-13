<?php
namespace App\Controller;
header('Access-Control-Allow-Origin:*');
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;  
use Symfony\Component\Request\HttpFoundation; 
use Symfony\Component\HttpFoundation\Request;

class EmployeesController extends AbstractController{
  
    //    Función para encontrar todos los registros   //
    
    public function findAll () {
        $em = $this -> getDoctrine() -> getManager();
        $query = $em -> createQuery (
            'SELECT e.id, e.name, e.adress, e.salary, e.registered, e.updated, e.status, e.id_office 
            FROM App:Employees e'
            );
            $listEmployees = $query ->getResult();
            $data = [
                'status' => 200,
                'message' => 'No se encontraron resultados'
            ];
            if(count($listEmployees) > 0 ){
                $data = [
                    'status' => 200,
                    'message' => 'Se encontraron ' .count  ($listEmployees) . 'resultados' ,
                    'listEmployees' => $listEmployees
                ];
            }
            return new JSonResponse($data);
    }

    //    Función para crear un nuevo registro  //

    public function create_employee(Request $request){
        $em = $this -> getDoctrine()-> getManager();

        $name = $request ->get('name', null);
        $adress = $request -> get('adress', null);
        $salary = $request -> get('salary', null);
        $registered = $request -> get('registered', null);
        $updated = $request -> get('updated', null);
        $id_office = $request -> get('id_office', null);
        $dtTmp = new \DateTime('now');

        $employee = new \App\Entity\Employees();

        $employee ->setName($name);
        $employee ->setAdress($adress);
        $employee ->setSalary($salary);
        $employee ->setRegistered($dtTmp);
        $employee ->setUpdated(null);
        $employee ->setStatus(1);
        $employee ->setId_office($id_office);

        $em -> persist($employee);
        $em -> flush();
        $data = [
            'status' => 200,
            'message' => 'Se ha creado correctamente'
        
        ];
        return new JSonResponse($data);
    }

    //    Función para hacer una baja lógica del sistema    //
    
    public function delete_employee($id){
        $em=$this->getDoctrine()->getManager();

        $query=$em->createQuery('UPDATE App:Employees e SET e.status = 0 WHERE e.id = :id');
        $query->setParameter(':id', $id);
        $employee=$query->getResult();
        $data = [
            'status' => 200,
            'message' => 'Se ha dado de baja el empleado correctamente',
            'employee' => $employee
        ];
        return new JsonResponse ($data);
    }

    //   Función para encontrar un registro por id   //

    public function employee_by_id($id){
        $em = $this ->getDoctrine()->getManager();

        $query=$em->createQuery(
            'SELECT e.id, e.name, e.adress, e.salary, e.registered, e.updated, e.status, e.id_office FROM App:Employees e WHERE e.id = :s');
        $query ->setParameter(':s' , $id);
        $employee = $query -> getResult();
        $data = [
            'status' => 200,
            'message' => 'Se encontró el empleado',
            'employee' => $employee
        ];
        return new JsonResponse ($data);
    }

    //   Función para actualizar un registro del sistema    //

    public function update_employee(Request $request, $id){
        $em =$this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $adress = $request->get('adress', null);
        $salary = $request->get('salary', null);
        $id_office = $request->get('id_office', null);
        $dtTmp = new \DateTime('now');

        $query = $em->createQuery('UPDATE App:Employees e SET e.name = :name, e.adress = :adress, e.salary = :salary, e.updated = :updated, e.id_office = :id_office WHERE e.id = :id');
        $query ->setParameter('name', $name);
        $query -> setParameter('adress', $adress);
        $query -> setParameter('salary', $salary);
        $query -> setParameter('updated', $dtTmp);
        $query -> setParameter('id_office', $id_office);
        $query -> setParameter(':id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [ 'status' => 200, 'message' => 'Se ha actualizado correctamente.' ];
        } else {
            $data = [ 'status' => 400, 'message' => 'No se ha actualizado correctamente.' ];
        }

        return new JsonResponse($data);

    } 
}
