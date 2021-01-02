class Item {

    constructor(check, descricao, quantidade) {

        this._descricao = descricao;
        this._quantidade = quantidade;
        this._check = check;
        this._id;

    }

    get descricao() {
        return this._descricao;
    }

    get quantidade() {
        return this._quantidade;
    }

    get check() {
        return this._check;
    }

    loadFromJSON(json) {

        for (let name in json) {

            this[name] = json[name];

        }

    }

    static getItemsStorage() {

        let items = [];

        if (localStorage.getItem("items")) {

            items = JSON.parse(localStorage.getItem("items"));

        }

        return items;

    }

    getNewID() {

        let itemsID = parseInt(localStorage.getItem("itemsID"));

        if (!itemsID > 0) itemsID = 0;

        itemsID++;

        localStorage.setItem("itemsID", itemsID);

        return itemsID;

    }

    save() {

        let items = Item.getItemsStorage();

        if (this.id > 0) {

            items.map(u => {

                if (u._id == this.id) {

                    Object.assign(u, this);

                }

                return u;

            });

        } else {

            this._id = this.getNewID();

            items.push(this);

        }

        localStorage.setItem("items", JSON.stringify(items));

    }

    remove() {

        let items = Item.getItemsStorage();

        items.forEach((itemData, index) => {

            if (this._id == itemData._id) {

                items.splice(index, 1);

            }

        });

        localStorage.setItem("items", JSON.stringify(items));

    }

}