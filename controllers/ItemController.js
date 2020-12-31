class ItemController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);


        this.onSubmit();
    }

    onSubmit() {

        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            this.addLine(this.getValues());

        });

    }

    getValues(formEl) {

        let item = {};
        let isValid = true;

        [...this.formEl.elements].forEach((field, index) => {

            if (['descricao', 'quantidade'].indexOf(field.name) > -1 && !field.value) {

                field.classList.add('is-invalid');
                return this.addLine() = false;

            }

            if (field.name) {
                item[field.name] = field.value;
            }

        });

        return new Item(item.descricao, item.quantidade);

    }

    addLine(dataItem) {

        this.tableEl.innerHTML = `
            <tr>
                <td>01</td>
                <td>${dataItem.descricao}</td>
                <td>${dataItem.quantidade}</td>
                <td>
                <button type="button " class="btn btn-danger btn-sm ">Excluir</button>
                </td>
            </tr>
        `;


    }

}