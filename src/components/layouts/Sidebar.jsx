import React, { useState, useEffect } from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";

function Sidebar({ isLoading, isError, peopleData, getMore }) {
  const lastIndex = 82;
  const [isFetching, setIsFetching] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [speciesData, setSpeciesData] = useState({});
  const [planetData, setPlanetData] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFetching(true);

      if (
        !isLoading &&
        !isError &&
        peopleData.length > 0 &&
        peopleData[peopleData.length - 1].url ===
          `https://swapi.dev/api/people/${lastIndex + 1}/`
      ) {
        clearInterval(interval);
      } else {
        getMore(() => {
          setIsLoadingMore(true);
        });
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [isLoading, isError, peopleData]);

  useEffect(() => {
    if (!isLoading && isFetching) {
      setIsFetching(false);
    }

    if (!isLoadingMore && isFetching) {
      setIsLoadingMore(false);
    }
  }, [isLoading, isFetching, isLoadingMore]);

  useEffect(() => {
    if (peopleData.length > 0) {
      // Obtener información adicional de especies y planetas
      const fetchAdditionalData = async () => {
        const fetchPromises = peopleData.map(async (person) => {
          try {
            const speciesResponse = await fetch(person.species);
            if (speciesResponse.ok) {
              const speciesData = await speciesResponse.json();
              setSpeciesData((prevSpeciesData) => ({
                ...prevSpeciesData,
                [person.url]: speciesData,
              }));
            } else {
              // console.error("Error fetching species data:", speciesResponse.status);
            }
  
            const planetResponse = await fetch(person.homeworld);
            if (planetResponse.ok) {
              const planetData = await planetResponse.json();
              setPlanetData((prevPlanetData) => ({
                ...prevPlanetData,
                [person.url]: planetData,
              }));
            } else {
              // console.error("Error fetching planet data:", planetResponse.status);
            }
          } catch (error) {
            // console.error("Error fetching data for", person.name, ":", error);
          }
        });
  
        await Promise.all(fetchPromises);
      };
  
      fetchAdditionalData();
    } else {
      // Limpiar los datos de especies y planetas cuando no hay personajes
      setSpeciesData({});
      setPlanetData({});
    }
  }, [peopleData]);
  return (
    <nav className="sidebar">
      <ul className="sidebar-list">
        {isLoading || isFetching ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <span>Loading</span>

          </div>
        ) : isError ? (
          <div className="center">
            <span>Failed to load data</span>
          </div>
        ) : (
          peopleData.map((person) => (
            <Link
              key={person.url}
              to={`/${person.url.split("/").slice(-2)[0]}`}
            >
              <>
                <div className="container">
                  <div className="left-div">
                    <li>
                      <strong>{person.name}</strong>
                      <br />
                      <span className={"litspan"}>
                        {speciesData[person.url]?.name || "Humano"}
                      </span>{" "}
                      from
                      <span className={"litspan"}>
                        {" "}
                        {planetData[person.url]?.name || "Desconocido"}
                      </span>
                    </li>
                  </div>
                  <div className="right-div">
                    <span className="iplus"> › </span>
                  </div>
                </div>
              </>
            </Link>
          ))
        )}
        {isLoadingMore ? (
          <div className="center">
            <div className="spinner"></div>
          </div>
        ) : null}

        {/* Mostrar mensaje cuando ya no hay más personajes */}
        {!isLoadingMore &&
          !isLoading &&
          !isFetching &&
          peopleData.length > 0 &&
          peopleData[peopleData.length - 1].url ===
            `https://swapi.dev/api/people/${lastIndex + 1}/` && (
            <div className="center">
              <span>No hay más personajes disponibles.</span>
            </div>
          )}
      </ul>
    </nav>
  );
}

export default Sidebar;
