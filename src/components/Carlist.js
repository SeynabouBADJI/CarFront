import React,{useEffect, useState} from "react";
import { SERVER_URL } from "../constants.js";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddCar from "./AddCar.js";
import EditCar from "./EditCar.js";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

//import  Button from "@mui/material/Button";
function Carlist(){
    const[cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    useEffect(() => { 
        //fetch("http://localhost:8081/api/cars")
        fetch(SERVER_URL + 'api/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));  
    }, []);
   
    useEffect(() => {
        fetchCars();
    },[]);

    const fetchCars = () => {
        fetch(SERVER_URL + "api/cars")
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err)); 
    };

    const addCar = car => {
        fetch(SERVER_URL + "api/cars",{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(car),
        })
        .then(response => {
            if(response.ok){
                fetchCars();
            }
            else{
                alert("something went wrong !");
            }
            
        })
        .catch(err => console.error(err));
    };
    
    const updateCar = (car,link) =>{
        fetch(link,{
            method : "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(car),

        })
        .then(response => {
            if(response.ok){
                fetchCars();
            }
            else{
                alert("something went wrong !");
            }
            
        })
        .catch(err => console.error(err));

    }
    const onDelClick = url => {
        if(window.confirm("Are you sur to delete ?")){
            fetch(url, {method: "DELETE"})
            .then(response => {
                if(response.ok){
                fetchCars();
                setOpen(true);
            }
            else{
                alert("Quelque chose s'est mal passe");
            }
            })
            .catch(err => console.error(err));
        }
    };

    
    const columns = [
        { field: 'brand', headerName: 'Marque', width: 200 },
        { field: 'model', headerName: 'Modèle', width: 200 },
        { field: 'color', headerName: 'Couleur', width: 200 },
        { field: 'year', headerName: 'Année', width: 150 },
        { field: 'price', headerName: 'Prix', width: 150 },
        {
            field:"_links.car.href",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: row => <EditCar data={row} updateCar = {updateCar}/>,
        },
        {
            field:"_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            renderCell: row =>(
                <IconButton onClick={() => onDelClick(row.id)}>
                    <DeleteIcon color="error"/>
                </IconButton>
               
            ),
        },
       ];

    return (
        <React.Fragment>
            <Stack mt={2} mb={2}>
            <AddCar addCar = {addCar}/>

            </Stack>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    diseableRowSelectionOnClick = {true}
                    getRowId={row => row._links.self.href}
                />
        
                <Snackbar
                    open = {open}
                    autoHideDuration = {2000}
                    onClose = {() => setOpen(false)}
                    message = "voiture supprime"
                />
            </div>
        </React.Fragment>
    );
    
}
 export default Carlist;