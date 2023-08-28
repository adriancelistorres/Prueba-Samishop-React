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
    }, 4000);

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
    // Obtener información adicional de especies y planetas
    peopleData.forEach((person) => {
      fetch(person.species)
        .then((response) => response.json())
        .then((data) => {
          setSpeciesData((prevSpeciesData) => ({
            ...prevSpeciesData,
            [person.url]: data,
          }));
        })
        .catch((error) => console.error("Error fetching species data:", error));

      fetch(person.homeworld)
        .then((response) => response.json())
        .then((data) => {
          setPlanetData((prevPlanetData) => ({
            ...prevPlanetData,
            [person.url]: data,
          }));
        })
        .catch((error) => console.error("Error fetching planet data:", error));
    });
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
