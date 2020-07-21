import React, { useState } from "react";
import config from "../configuration";
import { Link } from "react-router-dom";
import DataService from "../services/DataService";
import TemplateSearch from "./TemplateSearch";



const AddTemplate = (props) => {
  const initialTemplateState = {
    id: null,
    name: '',
    content: '',
  };

  const initialStatus = {
    submitted: false,
  };

  const [template, setTemplate] = useState(initialTemplateState);
  const [status, setStatus] = useState(initialStatus);
 
  const handleInputChange = event => {
    const { name, value } = event.target;
    setTemplate({ ...template, [name]: value });
  };

  const saveTemplate = () => {
    var data = {
      name: template.name,
      content: template.content,
    };

    DataService.create(data)
      .then(response => {
        setTemplate({
          id: response.id,
          name: response.name,
          content: response.content,
        });
        setStatus({submitted: true, message: config.STATUS_SUCCESS_MESSAGE});
      })
      .catch(e => {
        console.log('create error'. e);
      });
  };

  const newTemplate = () => {
    setTemplate(initialTemplateState);
    setStatus({submitted: false});
  };

  return (
    <div className="list row">
      <div className="col-md-12">
        <TemplateSearch />
      </div>
      <div className="col-md-12">
        <div className="submit-form">
          {status.submitted ? (
            <div>
              <h4>Success!</h4>
              <button className="btn btn-success" onClick={newTemplate}>
                Add
              </button>
              <Link
                  to={"/templates"}
                  className="badge"
                  style={{marginRight: '1em'}}
                >
                  Cancel
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={template.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                {/* <input
                  type="text"
                  className="form-control"
                  id="content"
                  required
                  value={template.content}
                  onChange={handleInputChange}
                  name="content"
                /> */}
                <textarea
                  className="form-control"
                  id="content"
                  required
                  name="content"
                  onChange={handleInputChange}
                  rows={10} cols={80}
                >
                  {template.content}
                </textarea>
              </div>

              <button onClick={saveTemplate} className="btn btn-success">
                Submit
              </button>
              <Link
                  to={"/templates"}
                  className="btn"
                  style={{marginLeft: '1em'}}
                >
                  Cancel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
