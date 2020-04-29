export class Item {
    id?: number;
    name?: string;
    price?: number;
    nameOfSeller?: string;
    surnameOfSeller?: string;
    phone?: string;
    imgPath?: string;
    description?: string[];
    public constructor(init?: Partial<Item>) {
        Object.assign(this, init);
    }
}

