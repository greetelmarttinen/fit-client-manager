import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

type CustomerFormType = {
    customer: Customer;
    setCustomer: React.Dispatch<RecordingState.SetStateAction<Customer>>
}

export default function CustomerForm({ customer, setCustomer }: CustomerFormType) {
    return (
        <DialogContent>
            <TextField
                required // kentän tieto on pakollinen
                margin="dense"
                label="Firstname"
                value={customer.firstname}
                // mihin tieto tallennetaan
                onChange={e => setCustomer({ ...customer, firstname: e.target.value })}
                fullWidth // täyttää koko parent -komponentin, eli dialogin
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Lastname"
                value={customer.lastname}
                onChange={e => setCustomer({ ...customer, lastname: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Email"
                value={customer.email}
                onChange={e => setCustomer({ ...customer, email: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Phone number"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Street address"
                value={customer.streetaddress}
                onChange={e => setCustomer({ ...customer, streetaddress: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Postcode"
                value={customer.postcode}
                onChange={e => setCustomer({ ...customer, postcode: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="City"
                value={customer.city}
                onChange={e => setCustomer({ ...customer, city: e.target.value })}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}