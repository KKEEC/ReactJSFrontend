import React from 'react'

function Persons({FilteredNames, handleDelete}) {

  console.log(FilteredNames)
    return (
      
        <div>
            {FilteredNames.map(
                (person) => {
                  return(
                    <div key={person.name}>{person.name} {person.number}<button onClick={handleDelete} value={person.id}>DELETE</button></div>
                  )
                }
                )
              }
        </div>
    )
}

export default Persons
