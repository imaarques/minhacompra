class ItemController {

    constructor(formId, tableId) {

        this.formEl = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        this.checado = document.getElementById('check');

        this.onSubmit();
        this.clickLimpar();
        this.selectAll();
        this.getChecked();
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

    getChecked() {

        var ls = localStorage.getItem("box");
        if (ls) {
            var b = ls.split(",");
            for (var x = 0; x < b.length; x++) {
                document.getElementById(b[x]).checked = true;
            }
            var checados = b;
        } else {
            var checados = [];
        }

        var boxes = document.querySelectorAll("#table-items [name='check']");
        for (var x = 0; x < boxes.length; x++) {
            boxes[x].onchange = function() {
                var idx = checados.indexOf(this.id);
                if (this.checked && !~idx) {
                    checados.push(this.id);

                } else {
                    checados.splice(idx, 1);
                }
                localStorage.setItem("box", checados);
            }
        }

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
                <td><input id="check" type="checkbox" name='check' value='${dataItem.check}'></td>
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