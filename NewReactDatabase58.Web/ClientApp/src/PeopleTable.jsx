import React from "react";
import PersonForm from "./PersonForm";
import PersonRow from "./PersonRow";
import axios from "axios";

class PeopleTable extends React.Component {
    state = {
        people: [],
        checked:[],
        person: {
            id: '',
            firstName: '',
            lastName: '',
            age: ''
        },
        isUpdating: false
    }
    refreshPage = () => {
        axios.get('/api/people/getpeople').then(res => {
            this.setState({ people: res.data })
        })
    }
    componentDidMount = () => {
        this.refreshPage()
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });

    }
    onAddClick = () => {
        console.log('Add');
        const { firstName, lastName, age } = this.state.person;
                axios.post('/api/people/addperson', { firstName, lastName, age }).then(() => {
            this.refreshPage();
            this.setState({
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }

            })
        })


    }
    onUpdateClick=()=>{        
        axios.post('/api/people/updateperson', this.state.person).then(()=>{
            this.refreshPage();
        })
    }
    onCancelClick=()=>{
        this.setState({isUpdating:false,    
            person: {
            firstName: '',
            lastName: '',
            age: ''
        }})
      
    }
    onEditClick = (p) => {
              this.setState({isUpdating:true, person:p})
    }
    onDeleteClick = (person) => {        
        axios.post('/api/people/deleteperson', person).then(()=>{
            this.refreshPage()
        })
    }
    onCheckbox=(p)=>{
       const{checked} = this.state
        if(checked.includes(p.id)){
           this.setState({checked: checked.filter(c => c != p.id)})
                 }
        else{
            const copy = [...checked, p.id] 
            this.setState({checked: copy})       
        }
        console.log(checked);
    }
    onDeleteAll =()=>{
        const {checked} = this.state
    axios.post('/api/people/deleteall', {ids: this.state.checked}).then(()=>{
        this.refreshPage();
    })
    }
    onCheckAll=()=>{
        this.setState({checked: this.state.people.map(p => p.id)})
    }
    onUncheckAll=()=>{
        this.setState({checked: []})
    }
    render() {
        const { firstName, lastName, age } = this.state.person;
        const { people, isUpdating, checked} = this.state;
        return (
            <div className='container mt-5'>
                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    isUpdating={isUpdating}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    onUpdateClick={this.onUpdateClick}
                    onCancelClick={this.onCancelClick} />


                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>
                                <div className='mt-1'>
                                    <button className='btn btn-danger btn-block' onClick={this.onDeleteAll}>Delete All</button>
                                </div>
                                <div className='mt-1'>
                                    <button className='btn btn-outline-danger btn-block' onClick={this.onCheckAll}>Check All</button>
                                </div>
                                <div className='mt-1'>
                                    <button className='btn btn-outline-danger btn-block' onClick={this.onUncheckAll}>Uncheck All</button>
                                </div>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Delete/Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => {
                            return <PersonRow 
                                key={p.Id} 
                                person={p}
                                onEditClick={()=>{this.onEditClick(p)}}
                                onDeleteClick={()=>{this.onDeleteClick(p)}}
                                onCheckbox={()=>{this.onCheckbox(p)}}
                                isChecked={checked.includes(p.id)} />
                        })}
                    </tbody>
                </table>

            </div>);

    }
}

export default PeopleTable;