import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

const LineChart = ({ data }) => {
  const timeData = data.map((_, index) => index);  // X-axis: Time based on the number of data points
  const valueData = data;  // Y-axis: The actual random numbers

  // Check if data exists and handle edge cases
  useEffect(() => {
    if (data.length === 0) {
      console.log('No data to plot');
    } else {
      console.log('Plotting data:', data);
    }
  }, [data]);  // This will trigger every time the data changes

  // Data for the line chart
  const chartData = [
    {
      x: timeData,  // X-axis is time (incremental values)
      y: valueData,  // Y-axis is the random values
      type: 'scatter',  // Using 2D scatter plot
      mode: 'lines+markers',  // Show both lines and scatter points
      line: {
        shape: 'spline',  // Spline interpolation for smooth curves
        color: 'rgba(255, 0, 0, 0.8)',  // Red line color with transparency
        width: 3,  // Line thickness
      },
      marker: {
        color: 'rgba(0, 0, 255, 0.8)',  // Blue scatter point color with transparency
        size: 6,  // Scatter point size
      },
      hoverinfo: 'x+y',  // Display both X and Y values on hover
    },
  ];

  // Layout for the chart
  const layout = {
    title: 'Sophisticated Real-Time Line Chart',
    autosize: true,
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
    },
    xaxis: {
      title: 'Time (s)',
      showgrid: true,
      zeroline: false,
      gridcolor: 'rgb(200, 200, 200)',
    },
    yaxis: {
      title: 'Value',
      showgrid: true,
      zeroline: false,
      gridcolor: 'rgb(200, 200, 200)',
    },
    hovermode: 'closest',
    paper_bgcolor: 'rgb(243, 243, 243)',  // Light background color for the paper
    plot_bgcolor: 'rgb(243, 243, 243)',  // Light background color for the plot
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Plot
        data={chartData}  // Chart data that updates dynamically
        layout={layout}  // Chart layout configuration
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
        config={{ displayModeBar: false }}  // Hide unnecessary controls
      />
    </div>
  );
};

export default LineChart;
