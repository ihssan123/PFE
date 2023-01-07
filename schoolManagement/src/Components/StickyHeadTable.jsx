
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import FormDialog from '../Pages/AddUser';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AlertDialogSlide from './update';
import UpdateForm from './update';
import SearchAppBar from './bar';
const columns = [
    {id: 'nom', label: 'nom',minWidth:150 },
  { id: 'prenom', label: 'prenom', minWidth: 150 },
  { id: 'cin', label: 'cin', minWidth: 150 },
  {
    id: 'tel',
    label: 'tel',
    minWidth: 150,
    
  },
 
  {
    id: 'numBureau',
    label: 'numBureau',
    minWidth: 150,
    
  },
  {
    id: 'email',
    label: 'email',
    minWidth: 150,
    
  },
  {
    id: 'grade',
    label: 'grade',
    minWidth: 150,
    
  },
  {
    id: 'fonction',
    label: 'fonction',
    minWidth: 150,
    
  },
  {
    id: 'actions',
    label: 'actions',
    minWidth: 180,
    
  },
];



var rows;
var tableaux;
export default function StickyHeadTable() {
  const [Editopen, setEditOpen] = useState(false);
  const [Editopen1, setEditOpen1] = useState(false);
  const [state, setState] = useState(false)
  const [newUser,setNewUser] = useState(false);
  const [data, setData] = useState([]);
  const [deleteUserOpen, setdeleteUserOpen] =useState(false);
  const [deletedUserId, SetDeletedUserId] = useState(0);
  const [updatedUserId, SetUpdatedUserId] = useState(0);

  const handleEditOpen = (id) => {
    SetUpdatedUserId(id);
    
    setEditOpen1(!Editopen1);
  };
  const handleEditClose = () => {
    
    
  };
  const handleClickOpen = (id) => { 
    SetDeletedUserId(id);
    setdeleteUserOpen(true);
  };

  const handleClose = () => {
    SetDeletedUserId(0);
    setdeleteUserOpen(false);
  };
  async function myFunc() {
  var token=localStorage.getItem("access_token");
  const response = await axios.get('http://localhost:8080/GDI/utilisateur/all', {
    headers: { Authorization: `Bearer ${token}` }
    
});
setData(response.data);  

  
 }

  const deleteUser = async () => {
      var token=localStorage.getItem("access_token");
      try {
          const response = await axios.Action("http://localhost:8080/utilisateur/Action/" + deletedUserId,{ headers: { Authorization: `Bearer ${token}` }});
           console.log(response)
           if (response.status == 200) {
            let newData = data.filter(user => user.idUtilisateur != deletedUserId);
            setData(newData);
            handleClose();
           }
      } catch(err) {
          console.log('EROOR')
      }
  }
  const [activeComponent, setActiveComponent] = useState('home');
 const Action = ({id}) => {
  return (
    <>
    <div style={{cursor : 'pointer'}} onClick={()=>handleClickOpen(id)}><DeleteForeverIcon color= 'error'/></div>
   
    <div style={{cursor : 'pointer'}} variant="outlined" onClick={()=>handleEditOpen(id)}>
<EditIcon color= 'error'/>
</div>


    </>
    
  );
};
 
 useEffect(() => {
  // execute the function here
  myFunc();
}, []);
  
  /*var token=localStorage.getItem("access_token");
  axios.get('http://localhost:8080/GDI/utilisateur/all', {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(resp =>{
  var arr=resp.data[0].cin;
}
)


.catch(err => console.log(err.response.data));*/


  
   
data.sort(function(e1, e2){return e2.idUtilisateur-e1.idUtilisateur});
   rows = data.map(element => {
    return {nom :element.nom, prenom:element.prenom, cin:element.cin, tel:element.tel, numBureau:element.numBureau, email:element.email ,grade:element.grade,fonction:element.fonction,actions:<Action id={element.idUtilisateur}/>}
});

  



  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserById=(id)=>{
    return data.find(user => user.idUtilisateur == id);
  }
  return (
    <>
   <SearchAppBar/>
   <Dialog
        open={deleteUserOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={deleteUser} autoFocus>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <UpdateForm EditOpen ={Editopen1} handleClose={handleEditClose} handleClickOpen ={()=>handleEditOpen(updatedUserId)} EditedUser={getUserById(updatedUserId)}></UpdateForm>
      
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    <FormDialog setData={setData}></FormDialog>
    </>
  );
}
