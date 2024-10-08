'use client'; // Mark this as a client component

import React, { useState, useEffect, useRef } from 'react';

interface Airport {
  name: string;
  code: string;
  city: string;
  country: string;
}

// Airport data
const airports: Airport[] = [
  { name: 'Indira Gandhi International Airport', code: 'DEL', city: 'New Delhi', country: 'India' },
  { name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM', city: 'Mumbai', country: 'India' },
  { name: 'John F. Kennedy International Airport', code: 'JFK', city: 'New York', country: 'United States' },
  { name: 'Dubai International Airport', code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  { name: 'Heathrow Airport', code: 'LHR', city: 'London', country: 'United Kingdom' },
  { name: 'Singapore Changi Airport', code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { name: 'Los Angeles International Airport', code: 'LAX', city: 'Los Angeles', country: 'United States' },
  { name: 'Beijing Capital International Airport', code: 'PEK', city: 'Beijing', country: 'China' },
  { name: 'Sydney Kingsford Smith International Airport', code: 'SYD', city: 'Sydney', country: 'Australia' },
  { name: 'Tokyo Haneda Airport', code: 'HND', city: 'Tokyo', country: 'Japan' },
];

const FlightSearch: React.FC = () => {
  const [from, setFrom] = useState<Airport | null>(null); // Store selected "Where from?" airport
  const [to, setTo] = useState<Airport | null>(null); // Store selected "Where to?" airport
  const [searchFrom, setSearchFrom] = useState(''); // Store search input for "Where from?"
  const [searchTo, setSearchTo] = useState(''); // Store search input for "Where to?"
  const [isDropdownOpenFrom, setIsDropdownOpenFrom] = useState(false); // Control dropdown visibility for "Where from"
  const [isDropdownOpenTo, setIsDropdownOpenTo] = useState(false); // Control dropdown visibility for "Where to"

  const dropdownFromRef = useRef<HTMLDivElement | null>(null);
  const dropdownToRef = useRef<HTMLDivElement | null>(null);

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownFromRef.current &&
        !dropdownFromRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpenFrom(false); // Close "Where from?" dropdown
      }
      if (
        dropdownToRef.current &&
        !dropdownToRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpenTo(false); // Close "Where to?" dropdown
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter airports based on search input for 'Where from?'
  const filteredFromAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchFrom.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchFrom.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchFrom.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchFrom.toLowerCase())
  );

  // Filter airports based on search input for 'Where to?'
  const filteredToAirports = airports.filter(
    (airport) =>
      airport.name.toLowerCase().includes(searchTo.toLowerCase()) ||
      airport.code.toLowerCase().includes(searchTo.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchTo.toLowerCase()) ||
      airport.country.toLowerCase().includes(searchTo.toLowerCase())
  );

  // Reverse the selected airports
  const reversePlaces = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setSearchFrom(to?.name || '');
    setSearchTo(from?.name || '');
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Good afternoon, <span className="text-primary">Brian</span>
        </h1>
      </div>

      {/* Flight Search Form */}
      <div className="bg-white border border-gray-200 shadow-lg rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* Where from (Search and Select Dropdown) */}
          <div className="flex-1 relative" ref={dropdownFromRef}>
            <label className="block mb-2 text-sm text-gray-500">Where from?</label>
            <div className="relative">
              <input
                type="text"
                value={searchFrom}
                onChange={(e) => {
                  setSearchFrom(e.target.value);
                  setIsDropdownOpenFrom(true); // Open dropdown on typing
                }}
                onFocus={() => setIsDropdownOpenFrom(true)} // Open dropdown on focus
                placeholder="Search departure airport"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Dropdown Arrow */}
              <button
                type="button"
                onClick={() => setIsDropdownOpenFrom(!isDropdownOpenFrom)} // Toggle dropdown on click
                className="absolute inset-y-0 right-2 flex items-center focus:outline-none"
              >
                {isDropdownOpenFrom ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 10.586l3.293-2.879a1 1 0 111.414 1.414l-4 3.5a1 1 0 01-1.414 0l-4-3.5a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 00-1.414 0L10 15.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            {isDropdownOpenFrom && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                {filteredFromAirports.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                ) : (
                  filteredFromAirports.map((airport) => (
                    <div
                      key={airport.code}
                      onClick={() => {
                        setFrom(airport);
                        setSearchFrom(airport.name);
                        setIsDropdownOpenFrom(false); // Close dropdown after selection
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        from?.code === airport.code ? 'bg-gray-200' : ''
                      }`}
                    >
                      {airport.name} ({airport.code}) - {airport.city}, {airport.country}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Reverse Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={reversePlaces}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full border border-gray-300 hover:bg-gray-200"
              title="Reverse places"
            >
              <span className="text-gray-500">⇄</span>
            </button>
          </div>

          {/* Where to (Search and Select Dropdown) */}
          <div className="flex-1 relative" ref={dropdownToRef}>
            <label className="block mb-2 text-sm text-gray-500">Where to?</label>
            <div className="relative">
              <input
                type="text"
                value={searchTo}
                onChange={(e) => {
                  setSearchTo(e.target.value);
                  setIsDropdownOpenTo(true); // Open dropdown on typing
                }}
                onFocus={() => setIsDropdownOpenTo(true)} // Open dropdown on focus
                placeholder="Search destination airport"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {/* Dropdown Arrow */}
              <button
                type="button"
                onClick={() => setIsDropdownOpenTo(!isDropdownOpenTo)} // Toggle dropdown on click
                className="absolute inset-y-0 right-2 flex items-center focus:outline-none"
              >
                {isDropdownOpenTo ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 10.586l3.293-2.879a1 1 0 111.414 1.414l-4 3.5a1 1 0 01-1.414 0l-4-3.5a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 00-1.414 0L10 15.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
            {isDropdownOpenTo && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto">
                {filteredToAirports.length === 0 ? (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                ) : (
                  filteredToAirports.map((airport) => (
                    <div
                      key={airport.code}
                      onClick={() => {
                        setTo(airport);
                        setSearchTo(airport.name);
                        setIsDropdownOpenTo(false); // Close dropdown after selection
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                        to?.code === airport.code ? 'bg-gray-200' : ''
                      }`}
                    >
                      {airport.name} ({airport.code}) - {airport.city}, {airport.country}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          {/* Departure */}
          <div className="flex-1">
            <label className="block mb-2 text-sm text-gray-500">Departure</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Return */}
          <div className="flex-1">
            <label className="block mb-2 text-sm text-gray-500">Return</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="text-right">
          <button className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-md shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            Search flights
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
