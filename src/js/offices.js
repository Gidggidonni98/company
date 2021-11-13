

const fill = listOffice => {
    let table = "";

    if (listOffice.length > 0) {
        for (let i = 0; i < listOffice.length; i++) {
            table += `
            <tr>
                <td>${i + 1}</td>
                <td>${listOffice[i].office_code}</td>
                <td>${listOffice[i].adress}</td>
                <td style="text-align: center;">
                    <button type="button" onclick= getDetails(${listOffice[i].id}) class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#details"><i class="far fa-file-alt"></i></button>
                </td>
                <td style="text-align: center;">
                <button type="button" onclick= getInfoUpdate(${listOffice[i].id}) class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#update"><i class="fa fa-edit"></i></button>
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

const getOffices = () => {
    $.ajax({
        type: 'GET',
        
        url: 'http://localhost:4000/offices'
    }).done(res => {

        fill(res.listOffice);
    });
};
const registerEmployee = async() =>{
    let office_code = document.getElementById('office_code_register').value;
    let adress = document.getElementById('adress_register').value;
  

    await $.ajax({
        type: 'POST',
        url: 'http://localhost:4000/offices/create' ,
        data:  {office_code, adress }
    }).done(function(res){
        getOffices();
        
    });
};

getOffices();