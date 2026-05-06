import { useState } from "react";
import type { CustomerDataType } from "./Customers";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CustomerForm from "./CustomerForm";

type EditCustomerProps = {
    customer: CustomerDataType;
    handleUpdate: (url: string, updatedCustomer: CustomerDataType) => void;
}

export default function EditCustomer(props: EditCustomerProps) {
    const [open, setOpen] = useState(false);

    // tyhjä customer state
    const [customer, setCustomer] = useState<CustomerDataType>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: "",
        _links: {
            self: {
                href: ""
            },
            customer: {
                href: ""
            }
        }
    })

    // edit -toiminnon "avaaminen"
    const handleClickOpen = () => {
        setCustomer({
            // valitun rivin arvot täytetään valmiiksi
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            email: props.customer.email,
            phone: props.customer.phone,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleUpdate(props.customer._links.self.href, customer);
        handleClose();
    }

    return (
        <>
            <Button size="small" onClick={handleClickOpen}>
                EDIT
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )


}