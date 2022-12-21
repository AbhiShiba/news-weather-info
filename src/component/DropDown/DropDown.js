import React from 'react'
import './DropDown.css'

function DropDown(props) {

    const changeHandler = (e) => {
        // console.log(e.target.value);
        props.checkEvent(e.target.value);
    }
  
    const displayOptions = (e) => {
        return e.map((info,index) => {
            return (<option key={"opt"+index} value={info.langKey}>{info.lang}</option>)
        }) 
    }
  return (
   <>
   <div>
   <label>{props.Country} : </label>
   <select key="selectSection" onChange={changeHandler}>
    {displayOptions(props.langInfo)}
   </select>
   </div>
   
   </>
  )
}

export default DropDown