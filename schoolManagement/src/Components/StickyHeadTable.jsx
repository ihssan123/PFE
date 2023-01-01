
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

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  
  const [newUser,setNewUser] = useState(false);
  const [data, setData] = useState([]);
  async function myFunc() {
  var token=localStorage.getItem("access_token");
  const response = await axios.get('http://localhost:8080/utilisateur/all', {
    headers: { Authorization: `Bearer ${token}` }
    
});
setData(response.data);  

  
 }

  const deleteUser = async (id) => {
      var token=localStorage.getItem("access_token");
      try {
          const response = await axios.delete("http://localhost:8080/utilisateur/delete/" + id,{ headers: { Authorization: `Bearer ${token}` }});
           console.log(response)
           if (response.status == 200) {
            let newData = data.filter(user => user.idUtilisateur != id);
            setData(newData);
           }
      } catch(err) {
          console.log('EROOR')
      }
  }

 const Delete = ({id}) => {
  return (
    
    <div style={{cursor : 'pointer'}} onClick={() =>deleteUser(id)}><DeleteForeverIcon color= 'error'/></div>
    
  );
};
 
 useEffect(() => {
  // execute the function here
  myFunc();
}, []);
  
  /*var token=localStorage.getItem("access_token");
  axios.get('http://localhost:8080/utilisateur/all', {
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
    console.log(element)
    return {nom :element.nom, prenom:element.prenom, cin:element.cin, tel:element.tel, numBureau:element.numBureau, email:element.email ,grade:element.grade,fonction:element.fonction,actions:<Delete id={element.idUtilisateur}/>}
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

  return (
    <>
   
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
