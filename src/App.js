import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

// URL in a variable
const url = "http://localhost:4000";
// State to hold the list of places
const [places, setPlaces] = React.useState([])
  // Empty Place - For the Create Form
  const emptyPlace = {
    name: "",
    img:"",
    description: ""
  }

  const [selectedPlace, setSelectedPlace] = React.useState(emptyPlace)
// Function to get list of places
const getPlaces = () => {
// make a get a request to this url
fetch(url + "/places")
.then((response) => response.json())
.then((data) => {
  setPlaces(data)
})
}
// useEffect, to get the data right away
React.useEffect(() => {
  getplaces()
}, [])

  //handleCreate - function for when the create form is submitted
  const handleCreate = (newPlace) => {
    fetch(url + "/place/", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(newPlace)
    })
    .then(() => getplaces())
  }

   // handleUpdate - function for when the edit form is submitted
   const handleUpdate = (place) => {
    fetch(url + "/place/" + place._id, {
      method: "PUT",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(place)
    })
    .then(() => getPlaces())
  }

  // function to specify which place we are updated
const selectPlace = (place) => {
  setSelectedPlace(place)
}

  // deleteplace to delete inidividual places
  const deletePlace = (place) => {
    fetch(url + "/place/" + place._id, {
      method: "delete"
    })
    .then(() => {
      getPlaces()
    })
  }

  return (
    <div className="App">
      <h1>place LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add place</button>
      </Link>
      <main>
      <Switch>
      <Route
            exact
            path="/"
            render={(rp) => (
              <Display 
              {...rp} 
              places={places} 
              selectplace={selectplace}
              deleteplace={deleteplace} 
              />
            )}
          />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                place={emptyplace}
                handleSubmit={handleCreate}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form 
              {...rp} 
              label="update" 
              place={selectedplace} 
              handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;

