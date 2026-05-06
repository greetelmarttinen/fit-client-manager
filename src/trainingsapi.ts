import type { TrainingsDataType } from "./components/Trainings";

export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings")
            return response.json();
        })
}

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