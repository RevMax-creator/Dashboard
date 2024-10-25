import React, { useState, useEffect, useRef } from 'react';
import LineChart from './LineChart';
import OffcanvasNavbar from './OffcanvasNavbar';
import { getSocketData } from '../services/socketService';

const Dashboard = () => {
  const [visibleData, setVisibleData] = useState([]);  // Data shown on the chart
  const [range, setRange] = useState(10);  // Default range of last 10 data points
  const [loading, setLoading] = useState(true);  // Loading state while waiting for WebSocket
  const [error, setError] = useState(null);  // Error state for WebSocket issues
  const dataRef = useRef([]);  // Use a ref to keep the full data without re-rendering

  useEffect(() => {
    // WebSocket data handling
    try {
      getSocketData((newData) => {
        setLoading(false);  // Stop loading once data is received
        console.log('Data received in Dashboard:', newData);

        if (newData && newData.number !== undefined) {
          // Append the new data to the full array in the ref (not limited to range)
          dataRef.current = [...dataRef.current, newData.number];

          // Update the visible data to show only the last 'range' points
          setVisibleData(dataRef.current.slice(-range));
        } else {
          console.error('Received invalid data:', newData);
        }
      });
    } catch (err) {
      setError('Failed to connect to WebSocket.');
      setLoading(false);
    }
  }, [range]);  // The effect depends on 'range' to update the chart when range is changed

  if (loading) return <div>Loading...</div>;  // Show loading spinner
  if (error) return <div>Error: {error}</div>;  // Show error message if WebSocket fails

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <OffcanvasNavbar />
        <h2 className="text-3xl font-bold text-gray-800">KPI Dashboard</h2>
      </header>

      {/* Filter Control: Allows user to select how many data points to show */}
      <div className="mb-4">
        <label className="mr-2">Show last </label>
        <select
          value={range}
          onChange={(e) => setRange(parseInt(e.target.value, 10))}
          className="p-2 border rounded-md"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <label className="ml-2">data points</label>
      </div>

      {/* Line chart for showing real-time data */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <LineChart data={visibleData} />  {/* Pass only the visible data (last 'range' points) */}
      </div>
    </div>
  );
};

export default Dashboard;