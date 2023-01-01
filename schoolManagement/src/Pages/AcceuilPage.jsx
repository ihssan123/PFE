import React from 'react'
import { useLocation } from 'react-router-dom';
export default function AcceuilPage() {
    const {state} = useLocation();
    
 console.log(state);
  return (
    <div>AcceuilPage
       <h1>hello {state.userName}</h1>
    </div>
  )
}
