import axios from "axios";
import { useState } from "react";
import "./App.css";
import AddForm from "./component/AddForm";
import DeleteForm from "./component/DeleteForm";
import EditForm from "./component/EditForm";
import MealTable from "./component/MealTable";

const App = () => {
  const [addNewVisible, setAddNewVisible] = useState(false); //  add-form visible
  const [deleteVisible, setDeleteVisible] = useState(false); //  delete-form visible
  const [editVisible, setEditVisible] = useState(false); // edit-form visible

  const [mealToDelete, setMealToDelete] = useState(null); // meal to delete
  const [indexToDelete, setIndexToDelete] = useState(null); // index meal to delete
  const [mealToEdit, setMealToEdit] = useState(null); //meal to edit
  const [indexToEdit, setIndexToEdit] = useState(null); //index meal to edit

  const initialList = JSON.parse(localStorage.getItem("meal-list")) || []; //get data from local strorage
  const [mealList, setMealList] = useState(initialList);

  /* -----handle button click to open popup form---------- */
  /* Add button */
  const onAddButtonClick = () => {
    setAddNewVisible(true);
  };

  /* Edit button */
  const onEditButtonClick = (index) => {
    setIndexToEdit(index);
    setMealToEdit(mealList[index]);
    setEditVisible(true);
  };

  /* Delete button */
  const onDeleteButtonClick = (index) => {
    setIndexToDelete(index);
    setMealToDelete(mealList[index]);
    setDeleteVisible(true);
  };

  /* ------------------handle form submit------------------------------ */
  /* AddForm: handle add form submit */
  const onAddMealButtonClick = (mealName) => {
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

  /* DeleteForm: handle delete form submit */
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

  /* EditForm: handle edit form submit */
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
        .then(() => {
          setEditVisible(false);
        });
    };
    fetchData(mealName);
  };

  /* ------------Close form---------------- */
  /* close add form */
  const onAddCloseButtonClick = () => {
    setAddNewVisible(false);
  };

  /* close delete form */
  const onDeleteCloseButtonClick = () => {
    setDeleteVisible(false);
  };

  /* close edit form */
  const onEditCloseButtonClick = () => {
    setEditVisible(false);
  };

  /* store data to local strorage */
  localStorage.setItem("meal-list", JSON.stringify(mealList));

  return (
    <div className="app">
      <MealTable
        mealList={mealList}
        onAddButtonClick={onAddButtonClick}
        onEditButtonClick={onEditButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      ></MealTable>
      <AddForm
        addNewVisible={addNewVisible}
        onAddCloseButtonClick={onAddCloseButtonClick}
        onAddMealButtonClick={onAddMealButtonClick}
      ></AddForm>
      <DeleteForm
        deleteVisible={deleteVisible}
        onDeleteCloseButtonClick={onDeleteCloseButtonClick}
        mealToDelete={mealToDelete}
        onDeleteMealButtonClick={onDeleteMealButtonClick}
      ></DeleteForm>
      <EditForm
        editVisible={editVisible}
        onEditCloseButtonClick={onEditCloseButtonClick}
        mealToEdit={mealToEdit}
        onEditMealButtonClick={onEditMealButtonClick}
      ></EditForm>
    </div>
  );
};

export default App;
