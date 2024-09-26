/* eslint-disable no-unused-vars */
export const fetchData = async () => {
  try {
    const response = await fetch(
      "https://frontendassignment-algo-one.netlify.app/table_data"
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const updateFilteredData = (count, data, setFilteredData) => {
  const half = Math.floor(count / 2);

  function filtergreaterThan(item) {
    return item.strike > 214.29;
  }

  function filterlessThan(item) {
    return item.strike <= 214.29;
  }

  const greaterThan = data.filter(filtergreaterThan).slice(0, half);
  const lessThanOrEqual = data.filter(filterlessThan).slice(0, half);

  let combinedData;

  if (count % 2 === 1) {
    const extraRow = data.find((item) => item.strike > 214.29);
    combinedData = [...lessThanOrEqual, ...greaterThan, extraRow];
  } else {
    combinedData = [...lessThanOrEqual, ...greaterThan];
  }

  setFilteredData(combinedData);
};
