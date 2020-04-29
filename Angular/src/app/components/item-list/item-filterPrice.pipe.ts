import { PipeTransform, Pipe } from '@angular/core';
import { Item } from 'src/app/models/itemElements';


@Pipe({ name: 'searchPipePrice' })
export class SearchPipePrice implements PipeTransform {
    transform(items: Item[], searchTermPrice: string): Item[] {
        if (!items)
            return [];
        if (!searchTermPrice)
            return items;
        const searchTerm = searchTermPrice.toString();
        return items.filter(item => {
            return item.price.toString().includes(searchTerm);
        });
    }
}
