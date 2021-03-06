import React from "react";
import PropTypes from "prop-types";

import "./MealTable.css";

MealTable.propTypes = {
  mealList: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func,
  onEditButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
};

function MealTable(props) {
  const { mealList, onAddButtonClick, onEditButtonClick, onDeleteButtonClick } =
    props;

  return (
    <div className="display-center">
      <div className="display-right">
        <div>
          <button className="button" onClick={onAddButtonClick}>
            Add new
          </button>
        </div>
        <div>
          <table id="meal-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Meal</th>
                <th>Count</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mealList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <div>
                      <button onClick={() => onEditButtonClick(index)}>
                        Edit
                      </button>
                      <span> | </span>
                      <button onClick={() => onDeleteButtonClick(index)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MealTable;
