const bankNames = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Punjab National Bank",
  "Axis Bank",
  "Canara Bank",
  "Bank of Baroda",
  "Kotak Mahindra Bank",
  "Yes Bank",
  "Union Bank of India",
];

export const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
];

const districts = [
  "Mumbai Suburban",
  "New Delhi",
  "Bangalore Urban",
  "Hyderabad Urban",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Surat",
];

const states = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Telangana",
  "Gujarat",
  "Tamil Nadu",
  "West Bengal",
  "Maharashtra",
  "Rajasthan",
  "Gujarat",
];

// Array to store sample data
const sampleData = [];

// Generate random bank ID
function generateBankId() {
  return Math.random().toString(36).substring(2, 10);
}

function generateIFSC() {
  const banks = [
    "SBIN",
    "HDFC",
    "ICIC",
    "PNB",
    "AXIS",
    "KARB",
    "BARB",
    "YESB",
    "IDFC",
    "CITI",
  ];
  const randomBank = banks[Math.floor(Math.random() * banks.length)];
  const branchCode = Math.floor(10000 + Math.random() * 90000);
  return `${randomBank}000${branchCode}`;
}

// Generate sample data for 100 entries
for (let i = 0; i < 100; i++) {
  const bankData = {
    bank_id: generateBankId(),
    ifsc: generateIFSC(),
    bank_name: bankNames[Math.floor(Math.random() * bankNames.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    district: districts[Math.floor(Math.random() * districts.length)],
    state: states[Math.floor(Math.random() * states.length)],
  };
  sampleData.push(bankData);
}

export { sampleData };
