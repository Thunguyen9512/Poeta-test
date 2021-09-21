import axios from "axios";
import { useState } from "react";
import "./App.css";
import AddNew from "./component/AddNew";
import Delete from "./component/Delete";
import Edit from "./component/Edit";
import MealTable from "./component/MealTable";

const App = () => {
  const [addNewVisible, setAddNewVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  const [mealToDelete, setMealToDelete] = useState(null);
  const [indexToDelete, setIndexToDelete] = useState(null);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [indexToEdit, setIndexToEdit] = useState(null);

  
  const initialList = JSON.parse(localStorage.getItem("meal-list")) || []
  const [mealList, setMealList] = useState(initialList);

  /* ---------------button click to open popup window----------------- */
  /* Add button handle */
  const onAddButtonClick = () => {
    setAddNewVisible(true);
  };

  /* Edit button handle */
  const onEditButtonClick = (index) => {
    console.log("on edit button click", index);
    setIndexToEdit(index);
    setMealToEdit(mealList[index]);
    setEditVisible(true);
  };

  /* Delete button handle */
  const onDeleteButtonClick = (index) => {
    setIndexToDelete(index);
    setMealToDelete(mealList[index]);
    setDeleteVisible(true);
  };
  /* ------------------------------------------------------------------ */

  /* ----------AddForm: handle add button-------------- */
  const onAddMealButtonClick = (mealName) => {
    console.log("on add meal button click:", mealName);
    const fetchData = async (mealName) => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((respond) => {
          const newMeal = {
            name: mealName,
            quantity: respond.data.meals.length,
          };
          const newMealList = [...mealList];
          newMealList.push(newMeal);
          setMealList(newMealList);
          alert("add success");
        })
        .catch((error) => {
          console.log("error", error);
          alert("error, try again");
        })
        .then(() => {
          setAddNewVisible(false);
        });
    };
    fetchData(mealName);
  };

  /* ---------DeleteForm: handle delete button------- */

  const onDeleteMealButtonClick = () => {
    if (indexToDelete !== null) {
      const newMealList = [...mealList];
      console.log("index to delete", indexToDelete);
      newMealList.splice(indexToDelete, 1);
      setMealList(newMealList);

      setIndexToDelete(null);

      alert("delete success");
      setDeleteVisible(false);
    } else return;
  };

  /* ---------EditForm: handle edit button------- */
  const onEditMealButtonClick = () => {
    const mealName = mealList[indexToEdit].name;
    const fetchData = async (mealName) => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
        .then((respond) => {
          const newMeal = {
            name: mealName,
            quantity: respond.data.meals.length,
          };
          const newMealList = [...mealList];
          newMealList[indexToEdit] = { ...newMeal };
          setMealList(newMealList);
          alert("update success");
        })
        .catch((error) => {
          console.log("error", error);
          alert("error, try again");
        })
        .then(()=>{
          setEditVisible(false)
        })
    };
    fetchData(mealName);
  };

  /* ------------------------------------------------------------------ */

  const onAddCloseButtonClick = () => {
    setAddNewVisible(false);
  };

  const onDeleteCloseButtonClick = () => {
    setDeleteVisible(false);
  };

  const onEditCloseButtonClick = () => {
    setEditVisible(false);
  };
  


  localStorage.setItem("meal-list", JSON.stringify(mealList));


  return (
    <div className = "app">
      <MealTable
        mealList={mealList}
        onAddButtonClick={onAddButtonClick}
        onEditButtonClick={onEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      ></MealTable>
      <AddNew
        addNewVisible={addNewVisible}
        onAddCloseButtonClick={onAddCloseButtonClick}
        onAddMealButtonClick={onAddMealButtonClick}
      ></AddNew>
      <Delete
        deleteVisible={deleteVisible}
        onDeleteCloseButtonClick={onDeleteCloseButtonClick}
        mealToDelete={mealToDelete}
        onDeleteMealButtonClick={onDeleteMealButtonClick}
      ></Delete>
      <Edit
        editVisible={editVisible}
        onEditCloseButtonClick={onEditCloseButtonClick}
        mealToEdit={mealToEdit}
        onEditMealButtonClick={onEditMealButtonClick}
      ></Edit>
    </div>
  );
};

export default App;
