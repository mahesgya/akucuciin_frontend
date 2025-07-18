const ddmmyyFormatter = (dateStringDdMmYyyy, locale = "en-US") => {
  if (!dateStringDdMmYyyy || typeof dateStringDdMmYyyy !== "string") {
    return "Invalid Date";
  }
  // Split the string into day, month, and year parts
  const parts = dateStringDdMmYyyy.split("-");

  // Basic validation for the number of parts
  if (parts.length !== 3) {
    return "Invalid Date Format (Expected dd-mm-yyyy)";
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10); // Month is 1-indexed from input
  const year = parseInt(parts[2], 10); // Now it's the full 4-digit year

  // Basic validation for numeric parts and ranges
  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    day > 31 ||
    month < 1 ||
    month > 12 ||
    year < 1000 ||
    year > 9999
  ) {
    // Check for 4-digit year
    return "Invalid Date Values";
  }

  // Create a Date object using YYYY-MM-DD format for consistency
  // Note: Month in Date constructor is 0-indexed (0 for January, 11 for December)
  const date = new Date(year, month - 1, day);

  // Validate if the created Date object is valid (e.g., handles "31-02-2023")
  // Check if the day, month, and year match what we tried to set,
  // as Date constructor will "roll over" invalid dates (e.g., Feb 31 becomes Mar 3)
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return "Invalid Date Values (Rollover Detected)";
  }

  // Define options for formatting
  const options = {
    weekday: "long", // "Sunday", "Minggu"
    day: "numeric", // "1", "29"
    month: "long", // "June", "Juni"
    year: "numeric", // "2025"
  };

  try {
    return date.toLocaleDateString(locale, options);
  } catch (error) {
    console.error(`Error formatting date with locale ${locale}:`, error);
    // Fallback to default English if locale causes an error
    return date.toLocaleDateString("en-US", options);
  }
};

export default ddmmyyFormatter;
