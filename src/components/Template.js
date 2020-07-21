import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import DataService from "../services/DataService";
import AddTemplate from "./AddTemplate";
import { useHistory } from "react-router-dom";
import TemplateSearch from "./TemplateSearch";
import { GlobalContext } from "../context/GlobalState";

const Template = props => {
  const initialTemplateState = {
    id: null,
    name: "",
    content: "",
  };
  const [currentTemplate, setCurrentTemplate] = useState(initialTemplateState);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const { updateSearch, resetSearch, customer } = useContext(GlobalContext);

  const getTemplate = id => {
    DataService.get(id)
      .then(response => {
        setCurrentTemplate(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    const id = props.match.params.id;
    getTemplate(id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTemplate({ ...currentTemplate, [name]: value });
  };

  const updateTemplate = () => {
    DataService.update(currentTemplate.id, currentTemplate)
      .then(response => {
        console.log(response);
        setMessage("The template was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTemplate = () => {
    DataService.remove(currentTemplate.id)
      .then(response => {
        console.log(response);
        history.push("/templates");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleCancel = () => {
    history.push("/templates/");
  }

  return (
    <div className="list row">
      <div className="col-md-12">
        <TemplateSearch />
      </div>
      <div className="col-md-12">
      {currentTemplate ? (
        <div className="edit-form">
          <h4>Template</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentTemplate.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                id="content"
                name="content"
                value={currentTemplate.content}
                onChange={handleInputChange}
                rows={10} cols={80}
              >{currentTemplate.content}</textarea>
            </div>
          </form>
          <div className="button-row">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={updateTemplate}
              style={{marginRight: '1em'}}
            >
              Update
            </button>

            <button className="btn" onClick={deleteTemplate}>
              Delete
            </button>
            
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <AddTemplate />
        </div>
      )}
    </div>
  </div>
  )
};

export default Template;
