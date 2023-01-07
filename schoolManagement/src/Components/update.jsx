import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import axios from 'axios';


export default function UpdateForm({EditOpen,handleClickOpen,EditedUser,handleClose}) {
  const [isAdmin, setIsAdmin] = React.useState(false)
  
  const [user,setUser]=useState({nom:"",prenom:"",email:"",cin:"",tel:"",numBureau:0,password:""});

  const [role, setRole] = useState(['UTILISATEUR']);
  const [grade, setGrade] = useState('');
  const [fonction, setFonction] = useState('');
  console.log(user);
  const handleChangeFonction = (event) => {
    if(event.target.value==="TECHNICIEN") setIsAdmin(false) ;
    setFonction(event.target.value);
    console.log(event.target.value)
    
  };
  const handleAdmin = (event) => {
    if(fonction != "TECHNICIEN") setIsAdmin(event.target.checked);
  };
  const handleChangeGrade = (event) => {
    setGrade(event.target.value);
  };
 
  const handleChangeRole = (event,newRole) => {
    setRole(newRole);
    console.log(event.target.value)
  };


 
  const EditUser= async()=>{
    var roles =[
      {
        nom : "UTILISATEUR"
      }
    ];
    if(isAdmin) {
      roles=[...roles,{
        nom:"ADMINISTRATEUR"
      }]
    }
    var token=localStorage.getItem("access_token");
    console.log({
      nom:user.nom,
      prenom:user.prenom,
      cin:user.cin,
      tel:user.tel,
      numBureau:user.numBureau,
      grade:grade,
      email:user.email,
      password:user.password,
      fonction:fonction,
      roles:roles
  })
    var result = await axios.put('http://localhost:8080/GDI/utilisateur/update',{
      nom:user.nom,
      prenom:user.prenom,
      cin:user.cin,
      tel:user.tel,
      numBureau:user.numBureau,
      grade:grade,
      email:user.email,
      password:user.password,
      fonction:fonction,
      roles:roles
  }
  
  )
  //setData([]);
  handleClose(false);
    console.log(result)
   }
  console.log(EditedUser)
  return (
    <div>
      <Dialog onClick={handleClickOpen} open={EditOpen} onClose={handleClose}>

        <DialogTitle>Modifier Utilisateur</DialogTitle>
        <DialogContent>
          <DialogContentText>
          veuillez saisir toute les informations
          </DialogContentText>
          <TextField
          value={user?.nom}
            autoFocus
            saturn
            margin="dense"
            id="name"
            label="nom"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,nom:e.target.value})}
          />
          <TextField
          value={user.prenom}
            autoFocus
            margin="dense"
            id="name"
            label="prenom"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,prenom:e.target.value})}
          />
          <TextField
          value={user.cin}
            autoFocus
            margin="dense"
            id="name"
            label="cin"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,cin:e.target.value})}
          />
          <TextField
          value={user.email}
            autoFocus
            margin="dense"
            id="name"
            label="email"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,email:e.target.value})}
          />
          <TextField
          value={user.tel}
            autoFocus
            margin="dense"
            id="name"
            label="tel"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,tel:e.target.value})}
          />
          <TextField
          value={user.numBureau}
            autoFocus
            margin="dense"
            id="name"
            label="numBureau"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,numBureau:e.target.value})}
          />
          <TextField
          
           value={user.password}
            margin="dense"
            id="password"
            label="password"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e)=>setUser({...user,password:e.target.value})}
          />
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel style={{marginTop: 20}} id="demo-simple-select-label">fonction</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fonction}
          label="fonction"
          style={{marginTop: 20}}
          onChange={handleChangeFonction}

          
        >  
         
          
          <MenuItem value='ENSEIGNANT' >ENSEIGNANT</MenuItem>
          <MenuItem value='TECHNICIEN' >TECHNICIEN</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
           
          <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>

      <FormGroup>
        <InputLabel style={{marginTop: 20}} id="demo-simple-select-label">grade</InputLabel>
        <div/>
        {fonction=="ENSEIGNANT" ?
        <Select
        style={{marginTop: 20}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grade}
          label="grade"
         
          onChange={handleChangeGrade}
        >  

          <MenuItem value="PA">PA</MenuItem>
          <MenuItem value="PH">PH</MenuItem>
          <MenuItem value="PES">PES</MenuItem>
          
        </Select>
       
        : 
        <Select
        style={{marginTop: 20}}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={grade}
        label="grade"
        onChange={handleChangeGrade}
      >  
      
        <MenuItem value="PREMIER">PREMIER</MenuItem>
        <MenuItem value="DEUXIEME">DEUXIEME</MenuItem>
        <MenuItem value="TROISIEME">TROISIEME</MenuItem>
        
      </Select>
}
        
</FormGroup>
      </FormControl>
    </Box>
    <FormControl  style={{marginTop: 15}} component="fieldset" variant="standard">
      <FormLabel component="legend"></FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch checked={isAdmin}  onChange={handleAdmin} name="administrateur" />
          }
          label="Administrateur"
        />
      </FormGroup>
      <FormHelperText>Attention</FormHelperText>
    </FormControl>

          
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={EditUser}>modifier</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}