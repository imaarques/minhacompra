class ItemController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.contagem = 0;


        this.onSubmit();
        this.clickLimpar();
    }

    onSubmit() {

        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let values = this.getValues();

            if (!values) return false;

            this.contagem = this.contagem + 1;

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

    clickLimpar() {
        document.querySelector('.btn-limpar').addEventListener('click', evento => {

            let trRemove = document.getElementsByClassName('trRemove');

            if (confirm('Deseja realmente limpar?')) {

                for (var r = 0; r < trRemove.length; r + trRemove.length) {
                    trRemove[r].remove();
                }

            }

        });

    }


    addLine(dataItem) {

        let tr = document.createElement('tr');

        tr.classList.add('trRemove');

        tr.innerHTML = `
                <td>${this.contagem}</td>
                <td>${dataItem.descricao}</td>
                <td>${dataItem.quantidade}</td>
                <td>
                <button type="button " class="btn btn-danger btn-sm btn-remove">Excluir</button>
                </td>`;

        this.tableEl.appendChild(tr);


        tr.querySelector('.btn-remove').addEventListener('click', e => {

            if (confirm('Deseja realmente escluir?')) {

                tr.remove();

            }

        });



    }

}