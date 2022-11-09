import { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const[searchName, setSearchName] = useState('')

  const baseUrl = 'http://localhost:3001/api/persons'

  useEffect(() =>{
    axios.get(baseUrl)
    .then( response =>
      setPersons(response.data)
    )
  },[])

// Handlers
const handleNameChange = (event) => {
  event.preventDefault()
  setNewName(event.target.value)  
} 
const handleNumberChange = (event) => {
  event.preventDefault()
  setNewNumber(event.target.value)  
} 
const handleSearch = (event) => setSearchName(event.target.value)
const handleDelete = (event) => {
  const id = event.target.value

  axios.delete(`${baseUrl}/${id}`)
  .then(
    axios.get(baseUrl)
    .then(
      response => setPersons(response.data)
    )
  )
}

const addName = (e) => {
  e.preventDefault()  
  
 
 const matchPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
 // const matchPersonId = Number(matchPerson.id)
  const person={...matchPerson,number:newNumber}
  const id=person.id
  const name = person.name
  //const checkName = (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase()))
  //console.log(checkName)
  const confirm = window.confirm(` ${name} already exists. DO you want to change the number?`)
 if (matchPerson && confirm) {
    axios.put(`${baseUrl}/${id}`,person)
    .then((res)=>{
      console.log(res.data)
     setPersons(persons.map((pers)=>pers.id===id ? res.data:pers))
    })
       
  }
  else if(matchPerson && !confirm){
    setPersons(persons)
  }

  else{
    const person = {name: newName, number: newNumber, id: Math.floor(Math.random() * 100)}
    axios.post(baseUrl,person)
    .then(
      setPersons([...persons,person])
    )
  }
}
const FilteredNames =  persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
        <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch}/>
            <PersonForm
              addName={addName}
              handleNameChange={handleNameChange}
              handleNumberChange={handleNumberChange}
            />
        <h2>Numbers</h2>
        <Persons FilteredNames={FilteredNames} handleDelete={handleDelete}/>
              
    </div>
  )
}

export default App