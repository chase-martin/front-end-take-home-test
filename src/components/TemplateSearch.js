import React, { useState, useEffect, Fragment, useContext } from "react";
import DataService from "../services/DataService";
import { GlobalContext } from "../context/GlobalState";

const TemplatesSearch = () => {
  const { updateSearch, resetSearch } = useContext(GlobalContext);
  const [searchName, setSearchName] = useState("jkoba0@hugedomains.com");
  const [customerData, setCustomerData] = useState("");

  const handleSearch = () => {
    DataService.findByEmail(searchName)
    .then(response => {
      console.log('findByEmail', JSON.stringify(response[0]));
      const customer = Array.isArray(response) && response[0];
      setCustomerData(customer);
      updateSearch(customer);
    })
    .catch(e => {
      console.log(e);
    });
  }

  const handleReset = () => {
    setCustomerData(null);
    resetSearch();
  }

  return (
    <Fragment>
      <div className="input-group" style={{marginBottom: '1em'}}>
        <input
          type="text"
          className="form-control"
          placeholder="Search customers by email"
          value={searchName}
          onChange={(e) => {
            const term = e.target.value;
            setSearchName(term);

            if (term === '') {
              handleReset();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {customerData && <div className="col-md-8" style={{marginBottom: '1em'}}>
          <b>Customer Found: </b>{customerData.firstname}&nbsp;{customerData.lastname}<br/>
      </div>}
    </Fragment>
  );
};

export default TemplatesSearch;
