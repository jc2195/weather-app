import React, { useState } from "react"

function SearchBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleClick = () => {
    props.setSearchTerm(searchInput);
    setSearchInput("");
  }

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleClick();
    }
  }

  return (
    <div className="search-assembly">
      <input type='text' className="search-box" placeholder="Enter a location..." name='searchTerm' value={searchInput} onKeyUp={e => handleKeyUp(e)} onChange={e => setSearchInput(e.target.value)}/>
      <button className="searchbutton" onClick={() => handleClick()}>Search</button><br></br>
    </div>
  )
}

export default SearchBar;