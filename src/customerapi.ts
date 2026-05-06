import type { CustomerDataType } from "./components/Customers";

// GET
export const fetchCustomer = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers");
            return response.json();
        })
}

// POST (tallennus)
export const saveCustomer = (customer: CustomerDataType) => {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST", // vaihdetaan metodi post:iksi kun tallennetaan dataa
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer) // lisätään pyynnön bodyn sisälle dataa
    })

        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new customer");
            return response.json();
        });
};

// PUT (päivitys)
export const updateCustomer = (url: string, customer: CustomerDataType) => {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when updating customers information");
            }
            return response.json();
        });
};

