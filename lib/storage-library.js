const StorageLibrary = {

    get(key) {
        return JSON.parse(
            localStorage.getItem(key)
        ) || [];
    },

    save(key, data) {
        localStorage.setItem(
            key,
            JSON.stringify(data)
        );
    },

    add(key, item) {
        const items = this.get(key);

        item.id = Date.now().toString();

        items.push(item);

        this.save(key, items);
    },

    remove(key, id) {
        const items = this.get(key);

        const updated = items.filter(
            item => item.id !== id
        );

        this.save(key, updated);
    },

    count(key) {
        return this.get(key).length;
    }

};