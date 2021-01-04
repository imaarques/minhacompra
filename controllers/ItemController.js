class ItemController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.checado = document.getElementById('check');

        this.onSubmit();
        this.clickLimpar();
        this.selectAll();
        this.setupBox();
    }

    onSubmit() {

        this.formEl.addEventListener('submit', event => {

            event.preventDefault();

            let values = this.getValues(this.formEl);

            if (!values) return false;

            values.save();


            this.formEl.reset();

            this.addLine(values);
        });
    }

    setupBox() {

        jQuery($ => {
            var arr = JSON.parse(localStorage.getItem('checked')) || [];
            arr.forEach((c, i) => $('.check').eq(i).prop('checked', c));

            $(".check").click(() => {
                var arr = $('.check').map((i, el) => el.checked).get();
                localStorage.setItem("checked", JSON.stringify(arr));
            });
        });

    }



    getValues(formEl) {

        let item = {};
        let isValid = true;

        [...this.formEl.elements].forEach((field, index) => {

            if (['check', 'descricao', 'quantidade'].indexOf(field.name) > -1 && !field.value) {

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

                    this.removeItem();



                }

            }

        });


    }

    removeItem(id) {
        let index = -1;
        let obj = JSON.parse(localStorage.getItem("items")) || {}; //localStorage Nome
        let items = obj || []; //get todos produtos
        for (var i = 0; i < items.length; i++) { //loop para buscar o id
            if (items[i].id === id) { //verifica id
                items.splice(i, 1); //remove item
                break; //finaliza o loop
            }
        }
        localStorage.setItem("items", JSON.stringify(obj)); //reescreve a localStorage
    }


    selectAll() {
        let items = Item.getItemsStorage();

        items.forEach(dataItem => {
            let item = new Item();

            item.loadFromJSON(dataItem);

            this.addLine(item);

        });


    }


    addLine(dataItem) {

        let tr = document.createElement('tr');

        tr.dataset.item = JSON.stringify(dataItem);

        tr.classList.add('trRemove');

        tr.innerHTML = `
                <td><input id="check" class="check" type="checkbox" name='check' value='${dataItem.check}'></td>
                <td>${dataItem.descricao}</td>
                <td>${dataItem.quantidade}</td>
                <td>
                <button type="button " class="btn btn-danger btn-sm btn-remove">Excluir</button>
                </td>`;

        this.tableEl.appendChild(tr);


        tr.querySelector('.btn-remove').addEventListener('click', e => {

            if (confirm('Deseja realmente excluir?')) {

                let item = new Item();

                item.loadFromJSON(JSON.parse(tr.dataset.item));

                tr.remove();

                item.remove();


            }

        });



    }

}