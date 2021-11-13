const getEmployeeById = async id => {
    return await $.ajax({
        type: 'GET',
        url: 'http://localhost/company/employees/public/index.php/employee/' + id
    }).done(res => res);
};
const getId = async id => {
    document.getElementById("id_delete").value = id;

};
const getDetails = async id =>{
    let employee = await getEmployeeById(id);
    var f = new Date(employee.employee[0].registered.date).toLocaleString();
    if(employee.employee[0].updated == null){
        var h= "No ha habido actualización";
     }else{
        var h = new Date(employee.employee[0].updated.date).toLocaleString() ;
     };
 
 
    document.getElementById('name').value = employee.employee[0].name;
    document.getElementById('adress').value = employee.employee[0].adress;
    document.getElementById('salary').value = employee.employee[0].salary;
    document.getElementById('registered').value = f;
    document.getElementById('updated').value = h;
    document.getElementById('status').value = employee.employee[0].status ? "Activo" : "Inactivo";
    document.getElementById('id_office').value = employee.employee[0].id_office;
 }
 const getInfoUpdate = async id =>{
    let employee = await getEmployeeById(id);
    var f = new Date(employee.employee[0].registered.date).toLocaleString();
   if(employee.employee[0].updated == null){
       var h= "No ha habido actualización";
    }else{
       var h = new Date(employee.employee[0].updated.date).toLocaleString() ;
    };

    document.getElementById('id_update').value = id;
    document.getElementById('name_update').value = employee.employee[0].name;
    document.getElementById('adress_update').value = employee.employee[0].adress;
    document.getElementById('salary_update').value = employee.employee[0].salary;
    document.getElementById('registered_update').value = f;
    document.getElementById('updated_update').value = h;
    document.getElementById('id_office_update').value = employee.employee[0].id_office;
};
const fill = listEmployees => {
    let table = "";

    if (listEmployees.length > 0) {
        for (let i = 0; i < listEmployees.length; i++) {
            var f = new Date(listEmployees[i].registered.date).toLocaleString();
            if (listEmployees[i].updated == null) {
                var h = "No ha habido actualización";
            } else {
                var h = new Date(listEmployees[i].updated.date).toLocaleString();
            };



            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${listEmployees[i].name}</td>
                <td>${listEmployees[i].adress}</td>
                <td>${listEmployees[i].salary}</td>
                <td>${f}</td>
                <td>${h}</td>
                <td>${listEmployees[i].status ? "Activo" : "Inactivo"}</td>
                <td>${listEmployees[i].id_office}</td>
                <td style="text-align: center;">
                    <button type="button" onclick= getDetails(${listEmployees[i].id}) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details"><i class="far fa-file-alt"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getInfoUpdate(${listEmployees[i].id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getId(${listEmployees[i].id}) class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete"><i class="fas fa-trash-alt"></i></button>                
                </td>
            </tr>
            `;
        }
    } else {
        table = `
        <tr class="text-center">
            <td colspan="5">No hay registros para mostrar</td>
        </tr>
        `;
    }
    $(`#table > tbody`).html(table);
};
const getEmployees = () => {
    $.ajax({
        type: 'GET',
        url: 'http://localhost/company/employees/public/index.php/employees'
    }).done(res => {

        fill(res.listEmployees);
    });
};
const updateEmployee = async () => {
    let id = document.getElementById('id_update').value;
    let name = document.getElementById('name_update').value;
    let adress = document.getElementById('adress_update').value;
    let salary = document.getElementById('salary_update').value;
    let id_office = document.getElementById('id_office_update').value;

    $.ajax({
        type: 'POST',
        url: 'http://localhost/company/employees/public/index.php/employee/update/' + id,
        data: { name, adress, salary, id_office }
    }).done(function (res) {
        getEmployees();
    });
};
const deleteEmployee = async (id) => {
    await $.ajax({
        type: 'DELETE',
        url: 'http://localhost/company/employees/public/index.php/employee/delete/' + id,
    }).done(res => {
        console.log("holis");
        getEmployees();
    
    });
};
const registerEmployee = async() =>{
    let name = document.getElementById('name_register').value;
    let adress = document.getElementById('adress_register').value;
    let salary = document.getElementById('salary_register').value;
    let id_office = document.getElementById('id_office_register').value;

    await $.ajax({
        type: 'POST',
        url: 'http://localhost/company/employees/public/index.php/employee/create' ,
        data: {name, adress,salary, id_office}
    }).done(function(res){
        getEmployees();
        
    });
};

getEmployees();