import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";
import DataService from "../services/DataService";
import TemplateSearch from "./TemplateSearch";
import Mustache from "mustache";


const TemplatesList = () => {
  const [templates, setTemplates] = useState([]);
  const [currentTemplate, setCurrentTemplate] = useState(null);
  const { customer } = useContext(GlobalContext);
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
  };

  const setActiveTemplate = (template) => {
    console.log('setActiveTemplate', template);
    if (customer && customer.email) {
      let temp = renderTemplate(template.id, template.name, template.content, customer);
      console.log('temp', temp);
      setCurrentTemplate(temp);
    } else {
      setCurrentTemplate(template);
    }
  };

  const handleEdit = () => {
    history.push("/template/" + currentTemplate.id);
  }

  const handleCancel = () => {
    refreshList();
  }

  const renderTemplate = (id, name, content, customer) => {
    let c = content;
    c = c.replace(/\\n/g, " ");
    c = c.replace("{{customer.firstname}}", customer.firstname);
    c = c.replace("{{customer.lastname}}", customer.lastname);
    // TODO: use another templating library. Mustache is borked.
    const mrend = Mustache.render(content, customer); // doesn't work
 
    return {id: id, name: name, content: c};
  }
  return (
    <div className="list row">
      <div className="col-md-12">
        <TemplateSearch />
      </div>
      {!currentTemplate ? (
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
                className="list-group-item"
                onClick={() => setActiveTemplate(template, index)}
                key={index}
              >
                {template.name}
              </li>
            ))}
        </ul>
      </div>) :
      (<div className="col-md-12">
          <div>
            <h4>Edit Template</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentTemplate.name}
            </div>
            <div>
              <label>
                <strong>Content:</strong>
              </label>
              <pre dangerouslySetInnerHTML={{__html: currentTemplate.content}}></pre>
            </div>
            <div className="button-row">
              <button
                onClick={handleEdit}
                className="btn btn-warning"
                style={{marginRight: '1em'}}
              >
                Edit
              </button>
              <button
                className="btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
      </div>
      )}
    </div>
  );
};

export default TemplatesList;
