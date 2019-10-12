const Node = require('./node');

class LinkedList {
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var node = new Node(data);

    if (this.length) {
        this._tail.next = node;
        node.prev = this._tail;
        this._tail = node;
    } else {
        this._head = node;
        this._tail = node;
    }

    this.length++;

    return node;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var current_node = this._head,
        length = this.length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};

    // 1-ый случай: неверная позиция 
    if (length === 0 || index < 1 || index > length) {
        throw new Error(message.failure);
    }

    // 2-ой случай: верная позиция 
    while (count < index) {
        current_node = current_node.next;
        count++;
    }

    return current_node;
    }

    insertAt(index, data) {
        let new_c = new Node(data);
        let current = new Node();
        current = this._head;
        let position = 0;
        if( index == 0 ) {
            this._head.prev = new_c;
            new_c.next = this._head
            this._head = new_c;
        } else  {
            while (current != null) {
                if (position == index) {
                    new_c.next = current;
                    new_c.prev = current.prev;
                    current.prev.next = new_c;
                    current.prev = new_c;
                    current = new_c;
                    this.length++;
                }
                current = current.next;
                position++;
            }
        }
    }

    isEmpty() {
        if(this._head==null){
            return true;
        } else return false;
    }

    clear() {
        this._head.data = null;
        this._head.next.data = null;
        this.length = 0;
    }

    deleteAt(index) {
        var currentNode = this._head,
        length = this.length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

    // 1-ый случай: неверная позиция
    if (length === 0 || index < 1 || index > length) {
        throw new Error(message.failure);
    }

    // 2-ой случай: первый узел удален
    if (index === 1) {
        this._head = currentNode.next;

        // 2-ой случай: существует второй узел
        if (!this._head) {
            this._head.prev = null;
        // 2-ой случай: второго узла не существует
        } else {
            this._tail = null;
        }

    // 3-ий случай: последний узел удален
    } else if (index === this.length) {
        this._tail = this._tail.prev;
        this._tail.next = null;
    // 4-ый случай: средний узел удален
    } else {
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }

        beforeNodeToDelete = currentNode.prev;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.prev = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this.length--;

    return message.success;
    }

    reverse() {
        let current = new Node();
        current = this._head;
        let temp = null;
        while (current) {
            let next = current.next;
            current.next = temp;
            current.prev = next;
            temp = current;
            current = next;
        }
        this._tail = this._head;
        this._head = temp;
    }

    indexOf(data) {
        let current = this._head;
        let position = 0;
        while (current) {
            if (current.data === data) {
                return position;
            }
            current = current.next;
            position++;
        }
        return -1;
    
    }
}

module.exports = LinkedList;
