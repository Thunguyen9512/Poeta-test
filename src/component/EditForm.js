import React from "react";
import PropTypes from "prop-types";

import "./popupForm.css";

EditForm.propTypes = {
  editVisible: PropTypes.bool,
  onEditCloseButtonClick: PropTypes.func,
  mealToEdit: PropTypes.object,
  onEditMealButtonClick: PropTypes.func,
};

function EditForm(props) {
  const {
    editVisible,
    onEditCloseButtonClick,
    mealToEdit,
    onEditMealButtonClick,
  } = props;
  const submitForm = (e) => {
    e.preventDefault();     //prevent browser reload
    onEditMealButtonClick();    
  };

  if (editVisible) {
    return (
      <div className="blur">
        <form>
          <div className="popup-window">
            <div className="popup-title">
              <h3>Edit meal</h3>
              <span>
                <button className="button" onClick={onEditCloseButtonClick}>
                  X
                </button>
              </span>
            </div>
            <div className="popup-content">
              <input value={mealToEdit.name} readOnly></input>
              <p>The count is {mealToEdit.quantity}</p>
            </div>
            <div className="popup-button">
              <button className="button" onClick={submitForm}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  } else {
    return "";
  }
}

export default EditForm;
