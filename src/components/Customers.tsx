import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';


// tyypitetään asiakkaasta haettavat tiedot
type CustomerDataType = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    streetaddress: string;
    postcode: string;
    city: string;
}

export default function Customers() {

    {/** tallennetaan asiakkaan (apista haetut) tiedot stateen */ }
    const [customerData, setCustomerData] = useState<CustomerDataType[]>([]);

    {/** määritellään taulukon / datagridin sisältö */ }
    const columns: GridColDef[] = [
        { field: "firstname", headerName: "Firstname", width: 150 },
        { field: "lastname", headerName: "Lastname", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone number", width: 150 },
        { field: "streetaddress", headerName: "Street address", width: 220 },
        { field: "postcode", headerName: "Postcode", width: 100 },
        { field: "city", headerName: "City", width: 100 },
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
                    // asetetaan oletusnäkymäksi 7 asiakasta per sivu
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 7,
                            },
                        },
                    }}
                />
            </div>
        </>
    )
}