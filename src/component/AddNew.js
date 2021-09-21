import PropTypes from "prop-types";

import "./popupWindow.css";

AddNew.propTypes = {
  addNewVisible: PropTypes.bool,
  onAddCloseButtonClick: PropTypes.func,
  onAddMealButtonClick: PropTypes.func,
};

function AddNew(props) {
  const { addNewVisible, onAddCloseButtonClick, onAddMealButtonClick } = props;
  let inputValue = "";
  const onChange = (e) => {
    inputValue = e.target.value;
  };

  const onSubmit = (e) => {
    if (inputValue !== "") {
      onAddMealButtonClick(inputValue);
    }
  };

  if (addNewVisible) {
    return (
      <div className="blur">
        <form>
          <div className="popup-window">
            <div className="popup-title">
              <h3>Add new</h3>
              <span>
                <button className="button" onClick={onAddCloseButtonClick}>
                  X
                </button>
              </span>
            </div>
            <div className="popup-content">
              <p>Input the meal name will count</p>
              <input
                placeholder="Meal name"
                onChange={onChange}
                required
              ></input>
            </div>
            <div className="popup-button">
              <button type="submit" className="button" onClick={onSubmit}>
                Add
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

export default AddNew;
