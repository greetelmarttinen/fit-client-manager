import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import AddCustomer from "./AddCustomer";
import { fetchCustomer, saveCustomer, updateCustomer } from "../customerapi";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import EditCustomer from "./EditCustomer";
import { saveTraining } from "../trainingsapi";
import AddTraining from "./AddTraining";


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

    // alustetaan snackbarin stateksi aluksi false, niin se ei näy sivulla ennen poistotoimintoa
    const [open, setOpen] = useState(false);

    {/** määritellään taulukon / datagridin sisältö */ }
    const columns: GridColDef[] = [
        // asiakkaalle treenin lisäys
        {
            field: "addtraining",
            headerName: "",
            width: 160,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <AddTraining
                    customer={params.row}
                    handleAddTraining={handleAddTraining} />

        },
        { field: "firstname", headerName: "Firstname", width: 100 },
        { field: "lastname", headerName: "Lastname", width: 100 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "phone", headerName: "Phone number", width: 150 },
        { field: "streetaddress", headerName: "Street address", width: 150 },
        { field: "postcode", headerName: "Postcode", width: 80 },
        { field: "city", headerName: "City", width: 80 },
        // asiakastietojen muokkaus
        {
            field: "_links.customer.href",
            headerName: "",
            width: 85,
            sortable: false,
            disableColumnMenu: false,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer
                    customer={params.row} handleUpdate={handleUpdate} />
        },

        // asiakastietojen poisto
        {
            field: "_links.self.href",
            headerName: "",
            width: 85,
            // tämän columnin mukaan ei ole mahdollista sortata tai filtteröidä rivejä
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    DELETE
                </Button>
        }


    ]


    // haetaan asiakkaat
    const getCustomers = () => {
        fetchCustomer()
            .then(data => setCustomerData(data._embedded.customers))
            .catch(err => console.error(err));
    }

    // uuden treenin lisäys asiakkaalle
    const handleAddTraining = (training) => {
        saveTraining(training)
            .then(() => console.log("Training added"))
            .catch(err => console.error(err));
    }


    // uuden asiakkaan lisäys -nappi
    const handleAdd = (customer: CustomerDataType) => {
        saveCustomer(customer)
            // haetaan uudet tiedot bäkkäristä
            .then(() => getCustomers())
            .catch(err => console.error(err))
    };

    // tietojen muokkaus
    const handleUpdate = (url: string, customer: CustomerDataType) => {
        updateCustomer(url, customer)
            .then(() => getCustomers())
            .catch(err => console.error(err))
    }

    // asiakkaan poistaminen
    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure that you want to delete this customer?")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a customer");
                    return response.json();
                })
                // uusi get -pyyntö, jossa näkyy päivitetyt tiedot
                .then(() => {
                    getCustomers();
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }



    //  tehdään api-pyyntö useEffect hookin sisällä, jotta pyyntö lähetetään vain ensimmäisen renderöinnin aikana 
    useEffect(() => {
        getCustomers();
    }, []);

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
                                pageSize: 7,
                            },
                        },
                    }}
                    pageSizeOptions={[7]}
                    // määritellään ettei rivejä pysty valitsemaan
                    rowSelection={false}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Customer deleted successfully"
            />
        </>
    )
}