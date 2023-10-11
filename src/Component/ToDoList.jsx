import React, { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoList() {
  // const [isDone, setIsDone] = useState("false");
  const options = [
    { id: "-1", value: "Select On", label: "Select On" },
    { id: "11", value: "Emad", label: "Emad Armoun" },
    { id: "12", value: "Atefeh", label: "Atefeh Ashourzadeh" },
    { id: "13", value: "Mahdiar", label: "Mahdiar Armoun" },
    { id: "14", value: "Arian", label: "Arian Armoun" },
    { id: "15", value: "Niloo", label: "Niloo Armoun" }
  ];
  const [itemId, setItemID] = useState(0);
  const [selectedOption, setSelectedOption] = useState({ id: "", value: "" });

  const [currentItem, setCurrentItem] = useState({
    title: "",
    id: "",
    dateAndTime: "2023",
    isDone: false,
    authorId: "-1"
  });
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const { name, value } = event.target;

    setCurrentItem((prevInputText) => ({
      ...prevInputText,
      [name]: value
    }));
  }

  function handleCheck2(selectIndex) {
    // clone the items list into a new array (copy)
    const newItems = [...items];
    const preIsDone = items[selectIndex].isDone;
    newItems[selectIndex].isDone = !preIsDone;

    setItems(newItems);
  }
  function handleSelect(event) {
    // const { key, lable } = event.taget;

    //  const idSelect=event.target[event.target.selectedIndex].id;
    const selectIndex = event.target.selectedIndex;

    const authorSelect = options.find((option, index) => index === selectIndex);
    const idSelect = authorSelect.id;
    // const authorSelect2 = options.find((option) => option.id === idSelect)
    //  .label;

    // const valueSelect = authorSelect.label;

    // alert(authorSelect2);
    // console.log("idSelect: " + idSelect);
    //  console.log("lable: " + authorSelect.label);

    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      //id :idSelect,
      authorId: idSelect
    }));
  }
  function handleCheckNew(selectId) {
    setItems((prevItems) => {
      const checkedItem = items.find((item) => item.id === selectId);
      const newItem = { ...checkedItem, isDone: !checkedItem.isDone };
      console.log("newItem: " + newItem.isDone);
      return [...prevItems, newItem];
    });
  }
  function handleCheck(selectId) {
    // console.log("selectIndex received = ", selectIndex);
    setItems((prevItems) => {
      return prevItems.map((item, id) => {
        // console.log("check item with selectIndex=", index);
        if (id === selectId) {
          console.log("item.id", id);
          // Create a new object to avoselectIndex mutating the original item
          //  setCurrentItem({ ...item, isDone: !item.isDone });
          //return prevItems.filter((item, index));
          return { ...item, isDone: !item.isDone };
        }

        return item; // Return unchanged items
      });
    });
  }
  /*function deleteItem(selectIndex) {
    // console.log("checked");
    setItems(prevItems=>{
    return  prevItems.filter((item,index) => index !==selectIndex)
   
    });
  }*/

  function reset() {
    //setSelectedOption("0");
    setCurrentItem((prevCurrentItem) => ({
      ...prevCurrentItem,
      // id: itemId,
      title: "",
      dateAndTime: "",
      authorId: "-1"
    }));
  }
  function addItem(event) {
    // event.defaultPrevented();
    //  console.log(items);
    const currentDT = new Date();
    const dateTime = currentDT.toLocaleString();
    setItemID(itemId + 1);
    // console.log(itemId);
    setItems((prevItems) => {
      // ????? setCurrentItem( { ...currentItem, dateAndTime: dateTime });
      const newItem = { ...currentItem, dateAndTime: dateTime, id: itemId };

      // console.log("currentItem " + currentItem.dateAndTime);
      return [...prevItems, newItem];
    });
    reset();
  }
  //  console.log("Date&Time in TodoList=", currentItem.dateAndTime);

  return (
    <div>
      <div className="addBox">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          value={currentItem.title}
          onChange={handleChange}
        />
        <br />
        <label for="author">Author</label>
        <select
          type="text"
          name="author"
          // value={currentItem.authorId}
          value={
            options.find((option) => option.id === currentItem.authorId).value
          }
          onChange={handleSelect}
        >
          {options.map((option) => (
            <option id={option.id} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button onClick={(event) => addItem(event)}>Add</button>
        <br />
      </div>
      <div>
        <ul>
          {/* <h1>To Do List</h1> */}
          {items
            .filter((item) => item.isDone === false)
            .map((item) => {
              console.log("ToDo" + item.isDone);
              // console.log(item.isDone);
              // if(item.isDone===false)
              // {

              console.log("ID :" + item.id);
              return (
                <ToDoItem
                  id={item.id}
                  title={item.title}
                  //   author={.label}
                  isDone={item.isDone}
                  dateAndTime={item.dateAndTime}
                  onChecked={handleCheck}
                  author={
                    options.find((option) => option.id === item.authorId).label
                  }

                  // item={item}
                  // onChecked={handleCheck2}
                />
              );
              // }
              //{alert()}
            })}
          {/* <h1> The Work Done</h1> */}
          {items.map((item) => {
            if (item.isDone === true) {
              console.log("workDone" + item.isDone);

              //  console.log("Id :" + item.authorId);
              return (
                <ToDoItem
                  key={item.id}
                  title={item.title}
                  //author={options[item.author].label}
                  isDone={item.isDone}
                  dateAndTime={item.dateAndTime}
                  onChecked={handleCheck}
                  author={
                    options.find((option) => option.id === item.authorId).label
                  }
                  // onChecked={handleCheck2}
                />
              );

              //{alert()}
            }
          })}
        </ul>
      </div>
    </div>
  );
}
export default ToDoList;
