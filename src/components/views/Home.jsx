import React, { useState, useEffect } from "react";
import { fetchPeopleByPage } from '../../services/StarWarsDataServices';
import Sidebar from "../../components/layouts/Sidebar";
import InfoComp from "../../components/layouts/InfoComp";
import './Home.css'

function Home() {
  const [page, setPage] = useState(1);
  const [peopleData, setPeopleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false); 
  
  const getData = async (page) => {
    try {
      const results = await fetchPeopleByPage(page);
      setPeopleData(prevPeople => [...prevPeople, ...results]);
      setIsLoading(false);
      setIsLoadingMore(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      setIsLoadingMore(false); 
    }
  }

  const getMore = () => {
    setPage(p => p + 1);
    setIsLoadingMore(true); 
  }

  useEffect(() => {
    getData(page || 1);
  }, [page]);

  return (
    <div className="home">
      <header className="title-nav">Ravn Star Wars Register</header>
      <div className="container-content ">
        <Sidebar isLoading={isLoading} peopleData={peopleData} isLoadingMore={isLoadingMore} getMore={getMore} />
        <InfoComp className="border" />
      </div>
    </div>
  );
}

export default Home;
