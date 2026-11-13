const SubscriptionLibrary = {

    getAll() {
        return StorageLibrary.get("subscriptions");
    },

    save(subscriptions) {
        StorageLibrary.save(
            "subscriptions",
            subscriptions
        );
    },

    add(subscription) {
        const subscriptions = this.getAll();

        subscription.id = crypto.randomUUID();

        subscriptions.push(subscription);

        this.save(subscriptions);
    },

    remove(id) {
        StorageLibrary.remove("subscriptions", id);
    },

    getStatus(renewalDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const renewal = new Date(
            renewalDate + "T00:00:00"
        );

        if (renewal < today) {
            return "Expired";
        }

        return "Active";
    },

    getTotal() {
        return StorageLibrary.count("subscriptions");
    },

    getExpired() {
        return this.getAll().filter(
            subscription =>
                this.getStatus(subscription.renewalDate)
                === "Expired"
        ).length;
    }

};