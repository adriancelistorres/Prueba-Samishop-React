
const URL_API="https://swapi.dev/api"

export async function fetchPeopleByPage(page) {
    try {
      const response = await fetch(`${URL_API}/people?page=${page}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('ERROR API:', error);
      return [];
    }
  }
  
  export async function fetchPeopleById(id) {
    try {
      const response = await fetch(`${URL_API}/people/${id}`);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('ERROR API:', error);
      return error
    }
  }

  export async function fetchVehicles(arrayUris) {
    try {
      const promises = arrayUris.map(async uri => {
        const response = await fetch(uri);
        const data = await response.json();
        return data;
      });
  
      const vehiclesData = await Promise.all(promises);
      return vehiclesData;
    } catch (error) {
      console.error('ERROR API:', error);
      return error;
    }
  }


  export async function fetchSpecies(arrayUris) {
    try {
      const promises = arrayUris.map(async uri => {
        const response = await fetch(uri);
        const data = await response.json();
        return data;
      });
  
      const vehiclesData = await Promise.all(promises);
      return vehiclesData;
    } catch (error) {
      console.error('ERROR API:', error);
      return error;
    }
  }

  export async function fetchPlanets(arrayUris) {
    try {
      const promises = arrayUris.map(async uri => {
        const response = await fetch(uri);
        const data = await response.json();
        return data;
      });
  
      const vehiclesData = await Promise.all(promises);
      return vehiclesData;
    } catch (error) {
      console.error('ERROR API:', error);
      return error;
    }
  }
  
  
  
