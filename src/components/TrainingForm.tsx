import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";

type TrainingFormType = {
    activity: string;
    date: string;
    duration: number;
}

type TrainingFormProps = {
    training: TrainingFormType;
    setTraining: React.Dispatch<React.SetStateAction<TrainingFormType>>
}

export default function TrainingForm({ training, setTraining }: TrainingFormProps) {
    return (
        <DialogContent>
            <TextField
                required // kentän tieto on pakollinen
                margin="dense"
                label="Activity"
                value={training.activity}
                // mihin tieto tallennetaan
                onChange={e => setTraining({ ...training, activity: e.target.value })}
                fullWidth // täyttää koko parent -komponentin, eli dialogin
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                type="datetime-local"
                value={training.date}
                onChange={e => setTraining({ ...training, date: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Duration"
                value={training.duration}
                onChange={e => setTraining({ ...training, duration: Number(e.target.value) })}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}
