var fields = document.querySelectorAll("#form-item-create [name]");
var item = {};


function addLine(dataItem) {
    var tr = document.createElement("tr");

    tr.innerHTML = `
    <tr>
        <td>01</td>
        <td>${dataItem.name}</td>
        <td>02</td>
        <td>
        <button type="button " class="btn btn-danger btn-sm ">Excluir</button>
        </td>
    </tr>
`;

    document.getElementById('table-items').appendChild(tr);

}

document.getElementById('form-item-create').addEventListener('submit', function(event) {

    event.preventDefault();

    fields.forEach(function(field, index) {

        if (field.name) {
            item[field.name] = field.value;
        }


    });

    addLine(item);

});