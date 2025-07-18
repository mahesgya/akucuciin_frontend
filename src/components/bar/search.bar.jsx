import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi'; 

const SearchBar = ({ value, onChangeText, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`
      flex items-center w-[95dvw] mx-4 md:mx-auto my-3 px-2 py-3 h-14 md:w-full lg:w-full
      bg-white rounded-xl shadow-sm
      border ${isFocused ? 'border-[#687eff] shadow-md shadow-blue-100' : 'border-gray-200'}
      hover:shadow-md
    `}>
      <FiSearch className={`mr-3 text-lg transition-colors duration-300 ${isFocused ? 'text-[#687eff]' : 'text-gray-400'}`} />
      
      <input
        type="text"
        className="flex-1 bg-transparent text-[14px] focus:outline-none text-gray-800 placeholder:text-gray-400 font-medium"
        placeholder="Search"
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onSubmit();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {value && (
        <button
          onClick={() => onChangeText('')}
          className="ml-2 p-1.5 rounded-full text-gray-400 hover:text-gray-600 
                    hover:bg-gray-100 transition-all duration-200"
          aria-label="Clear search"
        >
          <FiX className="text-lg" />
        </button>
      )}
      
      <button
        onClick={onSubmit}
        className={`
          ml-3 px-4 py-1.5 rounded-lg font-medium text-sm transition-all duration-300
          ${isFocused || value 
            ? 'bg-[#687eff] text-white hover:bg-[#687eff]' 
            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
        `}
        aria-label="Search"
      >
        Cari
      </button>
    </div>
  );
};

export default SearchBar;