import { useState, useEffect } from 'react';
import TableComponent from './TableComponent';
import SliderComponent from './SliderComponent';
import { fetchData, updateFilteredData } from './utils';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(10);

  useEffect(() => {
    async function getData() {
      const result = await fetchData();
      if (result) {
        setData(result);
        updateFilteredData(10, result, setFilteredData);
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleSliderChange = (value) => {
    setRowCount(value);
  };

  const handleSliderChangeComplete = () => {
    updateFilteredData(rowCount, data, setFilteredData);
  };

  return (
    <div className="app-container" style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h1>Apple Inc. (AAPL) $214.29 (▼$2.38) -1.1%</h1>
      <SliderComponent value={rowCount} onChange={handleSliderChange} onChangeComplete={handleSliderChangeComplete} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TableComponent data={filteredData} />
      )}
    </div>
  );
};

export default App;
