import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CustomerDataType } from "../types";

export default function Customers() {

    {/** tallennetaan asiakkaan (apista haetut) tiedot stateen */ }
    const [customerData, setCustomerData] = useState<CustomerDataType[]>([]);

    {/** määritellään taulukon / datagridin sisältö */ }
    const columns: GridColDef[] = [
        { field: "firstname", headerName: "Firstname", width: 250 },
        { field: "lastname", headerName: "Lastname", width: 250 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phone", headerName: "Phone number", width: 250 }
    ]


    {/** tehdään api-pyyntö useEffect hookin sisällä, jotta pyyntö lähetetään vain ensimmäisen renderöinnin aikana */ }
    useEffect(() => {
        {/** fetchataan/haetaan data */ }
        fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
            .then(response => {
                if (!response.ok)
                    throw new Error("Error in fetch: " + response.statusText);
                return response.json();
            })
            .then(responseData => setCustomerData(responseData._embedded.customers))
            .catch(err => console.error(err))
    }, []);

    return (
        <>
            <Stack>
                <h3>Customers</h3>
            </Stack>
            <div>
                <DataGrid
                    columns={columns}
                    rows={customerData}
                    // määritellään riville uniikki id
                    getRowId={row => row._links.self.href}
                />
            </div>
        </>
    )
}