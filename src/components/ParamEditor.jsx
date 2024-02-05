import { useState, useEffect } from "react";

export default function ParamEditor({ param, onEdit }) {
  const [editMode, setEditMode] = useState(!param.id);
  const [newParam, setNewParam] = useState(param);

  function saveParam() {
    onEdit(newParam);
    setEditMode(false);
  }

  return (
    <div className="flex border-x border-y border-solid border-indigo-600">
      {!editMode ? (
        <>
          <div className="flex-1">{newParam.description}</div>
          <button
            onClick={() => setEditMode(true)}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={newParam.description}
            onChange={(e) => {
              setNewParam({ ...newParam, description: e.target.value });
            }}
          />
          <button onClick={saveParam}>Save</button>
        </>
      )}
    </div>
  );
}
