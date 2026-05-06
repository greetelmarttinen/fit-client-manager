import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import AddCustomer from "./AddCustomer";
import { fetchCustomer, saveCustomer } from "../customerapi";


// tyypitetään asiakkaasta haettavat tiedot
export type CustomerDataType = {
    id?: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    streetaddress: string;
    postcode: string;
    city: string;
    _links: {
        self: {
            href: string;
        }
        customer: {
            href: string;
        }
    }
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
        { field: "city", headerName: "City", width: 100 }
    ]


    // haetaan asiakkaat
    const getCustomers = () => {
        fetchCustomer()
            .then(data => setCustomerData(data._embedded.customers))
            .catch(err => console.error(err));
    }

    //  tehdään api-pyyntö useEffect hookin sisällä, jotta pyyntö lähetetään vain ensimmäisen renderöinnin aikana 
    useEffect(() => {
        getCustomers();
    }, []);


    // uuden asiakkaan lisäys -nappi
    const handleAdd = (customer: CustomerDataType) => {
        saveCustomer(customer)
            // haetaan uudet tiedot bäkkäristä
            .then(() => getCustomers())
            .catch(err => console.error(err))
    };

    return (
        <>
            <h3>Customers</h3>
            <Stack sx={{ mb: 2 }} direction="row">
                {/** uuden asiakkaan lisäys -nappi */}
                <AddCustomer handleAdd={handleAdd} />
            </Stack>
            <div style={{ width: "100%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={customerData}
                    // määritellään riville uniikki id
                    getRowId={row => row._links.self.href}
                    // asetetaan oletusnäkymäksi 7 asiakasta per sivu
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    // määritellään ettei rivejä pysty valitsemaan
                    rowSelection={false}
                />
            </div>
        </>
    )
}