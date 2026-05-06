import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
// importoidaan päivämääräformatteri
import dayjs from "dayjs";
// määritellään aikavyöhykkeeksi suomen aika
import "dayjs/locale/fi";
import { fetchTrainings, deleteTraining } from "../trainingsapi";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";


// treeniohjelman tyypitys
type TrainingsDataType = {
    id: number;
    activity: string;
    date: string;
    duration: number;
    customer: CustomerDataType | null;
}


export default function Trainings() {

    // harjoitusten tallnnus stateen
    const [trainingData, setTrainingData] = useState<TrainingsDataType[]>([]);

    // alustetaan snackbarin stateksi aluksi false, niin se ei näy sivulla ennen poistotoimintoa
    const [open, setOpen] = useState(false);

    // määritellään datagridissä näytettävä sisältö
    const columns: GridColDef[] = [
        { field: "activity", headerName: "Activity", width: 250 },
        {
            field: "date", headerName: "Date", width: 250, valueFormatter: (params) => {
                return dayjs(params).format("DD.MM.YYYY HH:mm")
            }
        },
        { field: "duration", headerName: "Duration (min)", width: 200 },
        {
            field: "customer", headerName: "Customer", width: 300,
            // muotoillaan datanäkymä renderCellin avulla
            // customer -objektin sisällä oleva data ja näytetään tekstinä
            renderCell: (params) => params.row.customer ? `${params.row.customer.firstname} ${params.row.customer.lastname}` : ""
        },
        {   // harjoituksen poisto
            field: "id",
            headerName: "",
            // tämän columnin mukaan ei ole mahdollista sortata tai filtteröidä rivejä
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                    DELETE
                </Button>
        }
    ];

    // harjoituksen poistaminen
    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure that you want to delete this training?"))
            deleteTraining(id)
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting training");
                    return response.json();
                })
                // poiston jälkeen uusi get -pyyntö harjoituksille -> päivitetyt tiedot
                .then(() => {
                    getTrainings();
                    setOpen(true);
                })
                .catch(err => console.error(err))
    }

    // haetaan trainings data
    const getTrainings = () => {
        fetchTrainings()
            .then(data => setTrainingData(data))
            .catch(err => console.error(err))
    }


    useEffect(() => {
        getTrainings();
    }, []);

    return (
        <>
            <Stack>
                <h3>Trainings</h3>
            </Stack>
            <div>
                <DataGrid
                    columns={columns}
                    rows={trainingData}
                    // rivin id arvo
                    getRowId={row => row.id}
                    // määritellään oletusnäkymäksi 7 treeniä per sivu
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                    // määritellään ettei rivejä pysty valitsemaan
                    rowSelection={false}
                />
            </div>
            <Snackbar
                // ilmoitus onnistuneesta poistotoiminnosta
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted successfully!"
            />
        </>
    )
}