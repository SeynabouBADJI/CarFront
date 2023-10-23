import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';



function EditCar(props){
    const [open ,setOpen] = useState(false);
    const [car , setCar] = useState({
        brand: "",
        model: "",
        color: "",
        year: "",
        price: "",

    });

    const handleClickOpen = () => {
        setCar({
            brand : props.data.row.brand,
            model : props.data.row.model,
            color : props.data.row.color,
            year : props.data.row.year,
            fuel : props.data.row.fuel,
            price : props.data.row.price,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = event => {
        setCar({...car, [ event.target.name] : event.target.value});
    };
    const handleSave = () => {
        props.updateCar(car, props.data.id);
        handleClose();

    }
    return(
         <div>
            <IconButton onClick={handleClickOpen}>
                <EditIcon color="edit" />
            </IconButton>
            
            <Dialog open={open} onClose = {handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={2}>
                        <TextField
                            placeholder = "brand"
                            name = "brand"
                            autosFocus
                            variant="standard"
                            value = {car.brand}
                            onChange = {handleChange}

                        />
                        <TextField
                            placeholder = "model"
                            name = "model"
                            autosFocus
                            variant="standard"
                            value = {car.model}
                            onChange = {handleChange}

                        />
                        <TextField
                            placeholder = "color"
                            name = "color"
                            autosFocus
                            variant="standard"
                            value = {car.color}
                            onChange = {handleChange}

                        />
                        <TextField
                            placeholder = "year"
                            name = "year"
                            autosFocus
                            variant="standard"
                            value = {car.year}
                            onChange = {handleChange}

                        />
                        <TextField
                            placeholder = "price"
                            name = "price"
                            autosFocus
                            variant="standard"
                            value = {car.price}
                            onChange = {handleChange}

                        />
                    </Stack>
                </DialogContent>
            <DialogActions>
                <button onClick={handleClose}>Annuler</button>
                <button onClick={handleSave}>Enregistrer</button>
            </DialogActions>
        </Dialog>
    </div>
    );
}
export default EditCar;