class ItemController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);


        this.onSubmit();
    }

    onSubmit() {

        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let values = this.getValues();

            if (!values) return false;

            this.addLine(values);

        });

    }

    getValues(formEl) {

        let item = {};
        let isValid = true;

        [...this.formEl.elements].forEach((field, index) => {

            if (['descricao', 'quantidade'].indexOf(field.name) > -1 && !field.value) {

                field.classList.add('is-invalid');
                isValid = false;
            }

            if (field.name) {
                item[field.name] = field.value;
            }

        });

        if (!isValid) {

            return false;
        }

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