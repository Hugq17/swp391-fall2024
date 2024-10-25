// utils.js (or similar)
export const formatDate = (dateString) => {
    if (!dateString || dateString === "0001-01-01T00:00:00") {
      return "Date not available"; // Fallback message for invalid dates
    }
  
    const date = new Date(dateString); // Convert to Date object
  
    // Format the date as DD/MM/YYYY
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
    const year = date.getFullYear(); // Get full year
  
    return `${day}/${month}/${year}`; // Return formatted date
  };
  