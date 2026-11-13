const form = document.getElementById("subscription-form");

const subscriptionList = document.getElementById(
    "subscription-list"
);

const totalSubscriptions = document.getElementById(
    "total-subscriptions"
);

const expiredSubscriptions = document.getElementById(
    "expired-subscriptions"
);


// Add Subscription Page
if (form) {

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const subscription = {

            service: document.getElementById("service").value.trim(),

            provider: document.getElementById("provider").value.trim(),

            subscriber: document.getElementById("subscriber").value.trim(),

            renewalDate: document.getElementById("renewal-date").value,

            category: document.getElementById("category").value
        };

        if (!subscription.service ||
            !subscription.provider ||
            !subscription.subscriber ||
            !subscription.renewalDate ||
            !subscription.category) {

            alert("Please complete all fields.");
            return;
        }

        SubscriptionLibrary.add(subscription);

        form.reset();

        alert("Subscription added successfully!");

        window.location.href = "subscriptions.html";

    });

}


// View Subscriptions Page
function renderSubscriptions() {

    const subscriptions = SubscriptionLibrary.getAll();

    subscriptionList.innerHTML = "";

    subscriptions.forEach(function (subscription) {

        const status = SubscriptionLibrary.getStatus(
            subscription.renewalDate
        );

        const row = document.createElement("tr");

        const values = [
            subscription.service,
            subscription.provider,
            subscription.subscriber,
            subscription.renewalDate,
            subscription.category,
            status
        ];

        values.forEach(function (value, index) {

            const cell = document.createElement("td");

            cell.textContent = value;

            if (index === 5) {

                cell.className = status === "Expired"
                    ? "status-expired"
                    : "status-active";
            }

            row.appendChild(cell);

        });


        // Delete button
        const actionCell = document.createElement("td");

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "btn btn-danger";

        deleteButton.addEventListener("click", function () {

            SubscriptionLibrary.remove(subscription.id);

            renderSubscriptions();

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        subscriptionList.appendChild(row);

    });

    updateSummary();
}


// Update Summary
function updateSummary() {

    totalSubscriptions.textContent =
        SubscriptionLibrary.getTotal();

    expiredSubscriptions.textContent =
        SubscriptionLibrary.getExpired();
}


// Run only on subscriptions.html
if (subscriptionList) {

    renderSubscriptions();

}