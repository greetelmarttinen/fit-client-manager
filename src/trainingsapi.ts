import type { TrainingsDataType } from "./components/Trainings";

// GET / treenien haku
export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings")
            return response.json();
        })
}

// DELETE
export const deleteTraining = (id: number) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training")
            return response;
        })
}

// POST / tietojen tallennus
export const saveTraining = (training) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!Response.ok)
                throw new Error("Error when adding training");

            return Response.json();
        });
}