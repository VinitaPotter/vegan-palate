import { useState, useEffect } from "react";

type searchProps = {
  query: string;
  onSearch: (value: string) => void;
};

export default function Search({ query = "", onSearch }: searchProps) {
  const [searchTerm, setSearchTerm] = useState(query);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== query) {
        onSearch(searchTerm.replace(/ /g, ""));
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch, query]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      onSearch(searchTerm.replace(/ /g, ""));
    }
  }

  return (
    <div>
      <div className="relative w-1/2 mx-auto">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          value={searchTerm}
          type="text"
          name="search"
          id="search"
          className="p-5 pr-12 border border-gray-200 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder={"Find your next favorite recipe..."}
          autoFocus
          autoComplete="off"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
          🔍
        </span>
      </div>
    </div>
  );
}
