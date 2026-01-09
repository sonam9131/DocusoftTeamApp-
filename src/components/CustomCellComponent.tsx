import { useState } from "react";

// Define the custom cell component
const CustomCellComponent = () => {
    // State to manage the selected value
    const [selectedValue, setSelectedValue] = useState('');
  
    // Function to handle select box change
    const handleSelectChange = (event:any) => {
      setSelectedValue(event.target.value);
      // Add any additional logic here if needed
    };
  
    // Return the JSX with the select box
    return (
      <select value={selectedValue} onChange={handleSelectChange}>
        <option value="">Select Role</option>
        <option value="Guest User">Guest User</option>
        <option value="Owner">Owner</option>
      </select>
    );
  };
  