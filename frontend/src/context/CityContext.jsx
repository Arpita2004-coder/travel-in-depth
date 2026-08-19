import { createContext, useContext, useEffect, useState } from "react";
import { getAllDestinations } from "../api/destinationsApi";

export const CityContext = createContext();

export const CityProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAllDestinations();
        setCities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <CityContext.Provider value={{ cities, loading, error }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCities = () => useContext(CityContext);