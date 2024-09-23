/* eslint-disable react/prop-types */
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const SliderComponent = ({ value, onChange, onChangeComplete }) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleChangeCommitted = () => {
    onChangeComplete();
  };

  return (
    <div className="slider-container" style={{ marginBottom: '20px', width: '300px' }}>
      <Typography gutterBottom>Filter Results</Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        min={0}
        max={30}
        valueLabelDisplay="auto"
        sx={{
          color: '#16213e',
          height: 8,
          '& .MuiSlider-track': {
            border: 'none',
            backgroundColor: '#16213e',
          },
          '& .MuiSlider-rail': {
            opacity: 1,
            backgroundColor: 'gray',
          },
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
          },
          width: '100%',
        }}
      />
      <span style={{ color: '#fff' }}>Rows: {value}</span>
    </div>
  );
};

export default SliderComponent;
