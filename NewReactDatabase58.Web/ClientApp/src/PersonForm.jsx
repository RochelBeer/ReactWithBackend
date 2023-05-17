import React from "react";

export default function PersonForm({firstName, lastName, age, onTextChange, onAddClick,onUpdateClick, isUpdating, onCancelClick}){
    return(
        <div className="row p-5 rounded">
        <div className="col-md-3">
            <input type="text" value={firstName} name='firstName' className="form-control" placeholder="First Name" onChange={onTextChange}/>
        </div>
        <div className="col-md-3">
            <input type="text" value={lastName} name='lastName' className="form-control" placeholder="Last Name" onChange={onTextChange}/>
        </div>
        <div className="col-md-3">
            <input type="text" value={age} name='age' className="form-control" placeholder="Age" onChange={onTextChange}/>
        </div>
        {!!isUpdating ? 
        <div className="col-md-3"> 
            <button className='btn btn-warning w-100' onClick={onUpdateClick}>Update</button>
            <button className='btn btn-dark w-100' onClick={onCancelClick}>Cancel</button>
        </div> 
       
         :
        <div className="col-md-3">
            <button className='btn btn-primary w-100' onClick={onAddClick}>Add</button>
        </div>               
        }
       
    </div>
    )
}