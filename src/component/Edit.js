import React from "react";
import PropTypes from "prop-types";

Edit.propTypes = {
    editVisible:PropTypes.bool,
    onEditCloseButtonClick:PropTypes.func,
    mealToEdit:PropTypes.object,
    onEditMealButtonClick:PropTypes.func
};

function Edit(props) {
  const { editVisible, onEditCloseButtonClick, mealToEdit, onEditMealButtonClick } = props;
  const onSubmit = () => {
      onEditMealButtonClick();
  };

  if (editVisible) {
    return (
      <div className="blur">
        <form>
          <div className="popup-window">
            <div className="popup-title">
              <h3>Add new</h3>
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
              <button type="submit" className="button" onClick={onSubmit}>
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

export default Edit;
