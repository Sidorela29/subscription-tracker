const SubscriptionLibrary = {

    getAll() {
        return JSON.parse(
            localStorage.getItem("subscriptions")
        ) || [];
    },

    save(subscriptions) {
        localStorage.setItem(
            "subscriptions",
            JSON.stringify(subscriptions)
        );
    },

    add(subscription) {
        const subscriptions = this.getAll();

        subscription.id = crypto.randomUUID();

        subscriptions.push(subscription);

        this.save(subscriptions);
    },

    remove(id) {
        const subscriptions = this.getAll();

        const updated = subscriptions.filter(
            subscription => subscription.id !== id
        );

        this.save(updated);
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
        return this.getAll().length;
    },

    getExpired() {
        return this.getAll().filter(
            subscription =>
                this.getStatus(subscription.renewalDate)
                === "Expired"
        ).length;
    }

};