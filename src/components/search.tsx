type searchProps = {
  query: string;
  onSearch: (value: string) => void;
};

export default function Search({ query = "", onSearch }: searchProps) {
  function handleEneter(e) {
    if (e.key === "Enter") {
      const queryVal = e.target.value.replace(/ /g, "");
      onSearch(queryVal);
    }
  }
  return (
    <div>
      <div>
        <input
          onKeyDown={(e) => handleEneter(e)}
          defaultValue={query}
          type="text"
          name="search"
          id="search"
          className="p-5 border border-gray-200 rounded-2xl w-1/2"
          placeholder={"Find your next favorite recipe..."}
          autoFocus
        />
      </div>
    </div>
  );
}
