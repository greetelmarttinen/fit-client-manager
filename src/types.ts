// tyypitetään asiakkaasta haettavat tiedot
export type CustomerDataType = {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;

}

// treeniohjelman tyypitys
export type TrainingsDataType = {
    id: number;
    activity: string;
    date: string;
    duration: number;
    customer: CustomerDataType;
}