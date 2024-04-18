import "./searchBox.css";

const Search = () => {
  return (
    <>
      <div className="main">
        <button type="search" className="search btn">
          <img src="search (1).png" alt="" />
        </button>
        <input type="search" placeholder="Search"  id="search-box" />
      </div>
    </>
  );
};

export { Search };
