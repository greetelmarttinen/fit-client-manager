import { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// treeniohjelman tyypitys
type TrainingsDataType = {
    id: number;
    activity: string;
    date: string;
    duration: number;
    customer: CustomerDataType;
}


export default function Trainings() {
    return (
        <Stack>
            <h3>Trainings</h3>
        </Stack>
    )
}