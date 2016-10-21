export class LocalStorageService {
    constructor() {
        window.onbeforeunload = () => localStorage.setItem(LocalStorageService.id, JSON.stringify(this._items))
    }

    private static _instance;

    public static id = "[Local Storage Service]";

    public static get Instance(): LocalStorageService {
        if (!LocalStorageService._instance) {
            LocalStorageService._instance = new LocalStorageService();
        }

        return LocalStorageService._instance;
    }

    private _items = null;

    public get items() {
        if (this._items === null) {
            var storageItems = localStorage.getItem(LocalStorageService.id);
            if (storageItems === "null") {
                storageItems = null;
            }
            this._items = JSON.parse(storageItems || "[]");
        }

        return this._items;
    }

    public set items(value: Array<any>) {
        this._items = value;
    }

    public get = (options: { name: string }) => {
        var storageItem = null;
        for (var i = 0; i < this.items.length; i++) {
            if (options.name === this.items[i].name)
                storageItem = this.items[i].value;
        }
        return storageItem;
    }

    public put = (options: any) => {
        var itemExists = false;

        this._items.forEach((item: any) => {
            if (options.name === item.name) {
                itemExists = true;
                item.value = options.value
            }
        });

        if (!itemExists) {
            var items = this.items;
            items.push({ name: options.name, value: options.value });
            this.items = items;
            items = null;
        }
    }

    public clear = () => {
        this._items = [];
    }
}