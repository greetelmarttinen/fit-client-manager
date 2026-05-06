import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
// importoidaan päivämääräformatteri
import dayjs from "dayjs";
// määritellään aikavyöhykkeeksi suomen aika
import "dayjs/locale/fi";


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

    // määritellään datagridissä näytettävä sisältö
    const columns: GridColDef[] = [
        { field: "activity", headerName: "Activity", width: 300 },
        {
            field: "date", headerName: "Date", width: 300, valueFormatter: (params) => {
                return dayjs(params).format("DD.MM.YYYY HH:mm")
            }
        },
        { field: "duration", headerName: "Duration (min)", width: 200 },
        {
            field: "customer", headerName: "Customer", width: 300,
            // muotoillaan datanäkymä renderCellin avulla
            // customer -objektin sisällä oleva data ja näytetään tekstinä
            renderCell: (params) => params.row.customer ? `${params.row.customer.firstname} ${params.row.customer.lastname}` : ""
        }
    ];

    // haetaan/fetchataan trainings dataa apista
    useEffect(() => {
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(responseData => setTrainingData(responseData))
            .catch(err => console.error(err))
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
        </>
    )
}