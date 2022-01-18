import React, { useRef, useState } from "react";

import apiClient from "../../common/AxiosHTTP";

function UpdateJob() {
  const put_id = useRef(null);
  const put_title = useRef(null);
  const put_salary = useRef(null);
  const put_category = useRef(null);
  const put_description = useRef(null);

  const [putResult, setPutResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  async function putData() {
    const id = put_id.current.value;

    if (id) {
      const putData = {
        title: put_title.current.value,
        salary: put_salary.current.value,
        category: put_category.current.value,
        description: put_description.current.value
      };

      try {
        const res = await apiClient.put(`/jobs/${id}`, putData, {
          headers: {
            "x-access-token": "token-value",
          },
        });

        const result = {
          status: res.status + "-" + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setPutResult(fortmatResponse(result));
      } catch (err) {
        setPutResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  const clearPutOutput = () => {
    setPutResult(null);
  };

  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">Update Job</div>
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={put_id} placeholder="Id" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_title} placeholder="Title" />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" ref={put_salary} placeholder="Salary (mil/month)" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_category} placeholder="Category" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" ref={put_description} placeholder="Description" />
          </div>
          <button className="btn btn-sm btn-primary" onClick={putData}>Update Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPutOutput}>Clear</button>

          { putResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{putResult}</pre></div> }
        </div>
      </div>
    </div>
  );
}

export default UpdateJob;
