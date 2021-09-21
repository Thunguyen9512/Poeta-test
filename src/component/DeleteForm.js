import React from "react";
import PropTypes from "prop-types";

import "./popupForm.css";

DeleteForm.propTypes = {
  deleteVisible: PropTypes.bool,
  onDeleteCloseButtonClick: PropTypes.func,
  mealToDelete: PropTypes.object,
  onDeleteMealButtonClick: PropTypes.func,
};

function DeleteForm(props) {
  const {
    deleteVisible,
    onDeleteCloseButtonClick,
    mealToDelete,
    onDeleteMealButtonClick,
  } = props;

  const submitForm = (e) => {
    e.preventDefault(); //prevent browser reload
    onDeleteMealButtonClick(mealToDelete);
  };

  if (deleteVisible) {
    return (
      <div className="blur">
        <form>
          <div className="popup-window">
            <div className="popup-title">
              <h3>Delete</h3>
              <span>
                <button className="button" onClick={onDeleteCloseButtonClick}>
                  X
                </button>
              </span>
            </div>
            <div className="popup-content">
              <p>
                Are you want to delete {mealToDelete?.name} with the count is{" "}
                {mealToDelete?.quantity}
              </p>
            </div>
            <div className="popup-button">
              <button className="button" onClick={submitForm}>
                Delete
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

export default DeleteForm;
