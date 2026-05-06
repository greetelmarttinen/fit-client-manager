import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import type { CustomerDataType } from "./Customers";
import CustomerForm from "./CustomerForm";

type AddCustomerProps = {
    // funktio uuden asiakkaan lisäämiseksi
    handleAdd: (customer: Customer) => void;
}

export default function AddCustomer(props: AddCustomerProps) {
    // alustetaan dialogi komponentti aluksi kiinni
    const [open, setOpen] = useState(false);

    // state, johon tallennetaan käyttäjän syöttämät arvot
    const [customer, setCustomer] = useState<Customer>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: ""
    });

    // nappia painamalla dialogi aukee ja on mahdollista kirjata asiakkaan tiedot formiin
    const handleClickOpen = () => {
        setOpen(true);
    };

    // dialoign sulkeminen
    const handleClose = () => {
        setOpen(false);
    };

    // asiakastietojen tallennus
    const handleSubmit = () => {
        // kutsutaan parent -komponentin funktiota ja lisätään uusi olio listaan
        props.handleAdd(customer);
        handleClose();
    }


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new customer</DialogTitle>
                {/** dialogista aukeaa forminäkymä, johon asiakkaan tiedot täytetään + tallennetaan */}
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    {/** peruuta -toiminto */}
                    <Button onClick={handleClose}>Cancel</Button>
                    {/** tallenna -toiminto */}
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    )

}