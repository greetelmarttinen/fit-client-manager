import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import type { CustomerDataType } from "./Customers";
import TrainingForm from "./TrainingForm";

type AddTrainingProps = {
    // välitetään komponentille asiakastiedot
    customer: CustomerDataType;
    handleAddTraining: (training: any) => void;
}


export default function AddTraining(props: AddTrainingProps) {
    // alustetaan dialogi komponentti aluksi kiinni
    const [open, setOpen] = useState(false);

    // state, johon tallennetaan harjoituksen tiedot
    const [training, setTraining] = useState({
        activity: "",
        date: "",
        duration: 0
    })

    // nappia painamalla dialogi aukee ja on mahdollista kirjata asiakkaan tiedot formiin
    const handleClickOpen = () => {
        setOpen(true);
    };

    // dialoign sulkeminen
    const handleClose = () => {
        setOpen(false);
    };

    // tietojen lähetys
    const handleSubmit = () => {
        const newTraining = {
            ...training, customer: props.customer._links.self.href
        };

        // tallennetaan propsiin
        props.handleAddTraining(newTraining);
        handleClose();
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add new training to a customer</DialogTitle>
                {/** dialogista aukeaa forminäkymä */}
                <TrainingForm training={training} setTraining={setTraining} />
                <DialogActions>
                    {/** peruuta -toiminto/nappi */}
                    <Button onClick={handleClose}>Cancel</Button>
                    {/** tietojen lähetys -toiminto */}
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>

            </Dialog>
        </>
    )

}