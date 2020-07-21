import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import DataService from "../services/DataService";
import TemplateSearch from "./TemplateSearch";

const CustomerList = () => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const { updateSearch, resetSearch, searchTerm } = useContext(GlobalContext);
  const history = useHistory();

  useEffect(() => {
    retrieveTemplates();
  }, []);

  const retrieveTemplates = () => {
    DataService.getAll()
      .then(response => {
        setTemplates(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTemplates();
    setCurrentTemplate(null);
    setCurrentIndex(-1);
  };

  const setActiveTemplate = (template, index) => {
    console.log('setActiveTemplate', index, template);
    setCurrentTemplate(template);
    setCurrentIndex(index);
  };

  const findByName = () => {
    DataService.findByName(searchName)
      .then(response => {
        setTemplates(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleEdit = () => {
    history.push("/template/" + currentTemplate.id);
  }

  const handleCancel = () => {
    refreshList();
  }

  return (
    <div className="list row">
      <div className="col-md-12">
        <TemplateSearch />
      </div>
      {!selectedCustomer ? (
        <div className="col-md-12">
          <div style={{display: 'flex', alignItems: 'baseline'}}>
            <h4>Templates List</h4>
            <Link
                to={"/add/"}
                className="badge"
                style={{display: 'block', marginLeft: '1em'}}
              >
                Create New
            </Link>
          </div>
          <ul className="list-group">
            {templates &&
              templates.map((template, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTemplate(template, index)}
                  key={index}
                >
                  {template.name}
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <div className="col-md-12">

        </div>
      )}
    </div>
  );
};

export default CustomerList;
