import { Injectable } from '@angular/core';

import {RifaCartItem} from './cart-item-model';
import { RifaItem } from '../rifa-item.model';

@Injectable()
export class RifasCartService {

    items: RifaItem[] = [];

    clear() {
        this.items = [];
    }

    addItem(item: RifaCartItem) {
        const foundItem = this.items.find((mItem) => mItem.rifaItem.id === item.id);
        if (foundItem) {
            this.increaseQty(foundItem);
        } else {
            this.items.push(new RifaItem(item));
        }
       // this.notificationService.notify(`Você adicionou o item ${item.name}`)
    }

    increaseQty(item: RifaItem) {
        item.quantity = item.quantity + 1;
    }

    decreaseQty(item: RifaItem) {
        item.quantity = item.quantity - 1;
        if (item.quantity === 0) {
            this.removeItem(item);
        }
    }

    removeItem(item: RifaItem) {
        this.items.splice(this.items.indexOf(item), 1);
      //  this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number {
        return this.items
            .map(item => item.value())
            .reduce((prev, value) => prev + value, 0);
    }
}
