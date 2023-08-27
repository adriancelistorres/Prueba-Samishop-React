import { useEffect, useState } from 'react';
import { fetchPeopleById, fetchVehicles } from '../../services/StarWarsDataServices';
import '../styles/InfoComp.css'
import { useParams } from 'react-router-dom';

export default function InfoComp() {
	const id = useParams()?.id

	const [data, setData] = useState({});
	const [vehicles, setVehicles] = useState([]);

	const getVehicles = async (arrayUris) => {
		if(!arrayUris) return
    try{
      const results= await fetchVehicles(arrayUris)
			console.log({results})
      setVehicles(prevVehicles=>([...prevVehicles,...results]))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const getPeople = async (id) => {
    try{
      const data= await fetchPeopleById(id)
			console.log({data})
      setData(prevData=>({...prevData,...data}))

			const arrayUris=data.vehicles
			console.log({arrayUris})
			await getVehicles(arrayUris)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

	useEffect(() => {
		setData({})
		setVehicles([])

    getPeople(id)  
  }, [id])


	return (

		<div className='info-container'>
			{/* <div className="info-block">
				<h3>{data.name}</h3>
			</div> */}
			<div className="info-block">
				<h4>General information</h4>
				<div className="row">
					<span className='clave' >Eye Color</span>
					<span className='valor'>{data.eye_color}</span>
				</div>
				<div className="row">
					<span className='clave' >Hair Color</span>
					<span className='valor'>{data.hair_color}</span>
				</div>
				<div className="row">
					<span className='clave' >Skin Color</span>
					<span className='valor'>{data.skin_color}</span>
				</div>
				<div className="row">
					<span className='clave' >Birth Year</span>
					<span className='valor'>{data.birth_year}</span>
				</div>
			</div>


			<div className="info-block">
				{
					vehicles.length!==0
					? <h4>Vehicles</h4>
					: <span></span>
				}
				{	
					vehicles.map((v,i)=>(
						<div className="row" key={i}>
							<span className='clave'>{v.name}</span>
						</div>
					))
				}
				
			</div>
		</div>
	)

}