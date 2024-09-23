export const fetchData = async () => {
    try {
      const response = await fetch('https://frontendassignment-algo-one.netlify.app/table_data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  
  export const updateFilteredData = (count, data, setFilteredData) => {
    const half = Math.floor(count / 2);
    const greaterThan = data.filter(item => item.strike > 214.29).slice(0, half);
    const lessThanOrEqual = data.filter(item => item.strike <= 214.29).slice(0, half);
  
    if (count % 2 === 1) {
      const extraRow = data.find(item => item.strike > 214.29);
      setFilteredData([...lessThanOrEqual, ...greaterThan, extraRow]);
    } else {
      setFilteredData([...lessThanOrEqual, ...greaterThan]);
    }
  };
  