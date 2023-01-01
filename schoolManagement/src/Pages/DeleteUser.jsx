import React from 'react'


export default function DeleteUser(id) {

    const deleteItem = async (id) => {
        var token=localStorage.getItem("access_token");
        try {
            const response = await axios.delete("http://localhost:8080/utilisateur/delete/" + id,{ headers: { Authorization: `Bearer ${token}` }});
             console.log(response)
        } catch(err) {
            console.log('EROOR')
        }
    }
  
}
