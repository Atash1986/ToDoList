import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import "./ToDoList.css";
import PropTypes from 'prop-types';
import taskItems from "./TaskItems";


function  ToDoList({activeCategoryId}) {
  
 
  // const [isDone, setIsDone] = useState("false");
  const options = [
    { id: -1, value: "Select On", label: "Select On" },
    { id: 11, value: "Emad", label: "Emad Armoun" },
    { id: 12, value: "Atefeh", label: "Atefeh Ashourzadeh" },
    { id: 13, value: "Mahdiar", label: "Mahdiar Armoun" },
    { id: 14, value: "Arian", label: "Arian Armoun" },
    { id: 15, value: "Niloo", label: "Niloo Armoun" }
  ];
  const [itemId, setItemID] = useState(0);
  // const [selectedOption, setSelectedOption] = useState({ id: "", value: "" });

  const [currentItem, setCurrentItem] = useState({
    title: "",
    id: "",
    dateAndTime: "2023",
    isDone: false,
    authorId: -1,
    categoryId:"0"
  });
  const [items, setItems] = useState(taskItems);

  function handleChange(event) {
    const { name, value } = event.target;

    setCurrentItem((prevInputText) => ({
      ...prevInputText,
      [name]: value
    }));
  }

  // function handleCheck2(selectIndex) {
  //   // clone the items list into a new array (copy)
  //   const newItems = [...items];
  //   const preIsDone = items[selectIndex].isDone;
  //   newItems[selectIndex].isDone = !preIsDone;

  //   setItems(newItems);
  // }
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
  // function handleCheckNew(selectId) {
  //   setItems((prevItems) => {
  //     const checkedItem = items.find((item) => item.id === selectId);
  //     const newItem = { ...checkedItem, isDone: !checkedItem.isDone };
  //     console.log("newItem: " + newItem.isDone);
  //     return [...prevItems, newItem];
  //   });
  // }
  function handleCheck(selectId) {
    // console.log("selectIndex received = ", selectIndex);
    setItems((prevItems) => {
      return prevItems.map((item, id) => {
        // console.log("check item with selectIndex=", index);
        if (id === selectId) {
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
      title: "",
      dateAndTime: "",
      authorId: -1,
      categoryId:"0"
    }));
  }
  function addItem() {
    // event.defaultPrevented();
    
    const currentDT = new Date();
    const dateTime = currentDT.toLocaleString();
    setItemID(itemId + 1);
    // console.log(itemId);
    setItems((prevItems) => {
      // ????? setCurrentItem( { ...currentItem, dateAndTime: dateTime });
   const newItem = { ...currentItem, dateAndTime: dateTime, id: itemId ,categoryId:activeCategoryId};
  
      // console.log("currentItem " + currentItem.dateAndTime);
      return [...prevItems, newItem];
    });
    reset();
  }
  //  console.log("Date&Time in TodoList=", currentItem.dateAndTime);

  return (
    <div>
      <div className="addBox">
        {/* <label for="title">Title</label> */}
        <input
        className="taskTitle"
          type="text"
          name="title"
          value={currentItem.title}
          onChange={handleChange}
          
        />
        <br />
        
        {/* <label for="author">Author</label> */}
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
            <option 
            key={option.id}
            id={option.id} 
            value={option.value}>
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
        <ul className="taskBox">
          <h1>To Do List</h1>
          {items.filter((item) => !item.isDone && (item.categoryId ===activeCategoryId||activeCategoryId===0)) 
            .map((item) => {
              // console.log(item.isDone);
              // if(item.isDone===false)
              // {
              return (
                <ToDoItem
                key={item.id}
                  id={item.id}
                  title={item.title}
                  isDone={item.isDone}
                  categoryId={item.categoryId}
                  dateAndTime={item.dateAndTime}
                  onChecked={handleCheck}
                  author={
                    options.find((option) => option.id === item.authorId).label
                  }

                  // item={item}
                  // onChecked={handleCheck2}
                />
             
              // }
              //{alert()}
              )
            })}

            {/* <hr/>
             {items.filter((taskItem)=> taskItem.categoryId ===activeCategoryId||taskItem.categoryId==="0")
      .map((taskItem) => {
       
     return(
     <ToDoItem
     key={taskItem.id}
     id={taskItem.id}
     title={taskItem.title}
     dateAndTime={taskItem.DateAndTime}
     author={taskItem.author}
     isDone={taskItem.isDone}
     categoryId={taskItem.categoryId}
     onChecked={handleCheck}
     />)
    
   })}
                 */}
          <h1> The Work Done</h1>
          {items.map((item) => {
            if (item.isDone === true) {
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
                  categoryId={item.categoryId}
                  />
              );

              //{alert()}
            }
          })}
        </ul>
        {/* return (
          <Sidbar 
             items={items}
             options={options}/>
        ) */}
      </div>
    </div>
  );
}
ToDoList.propTypes = {
  activeCategoryId: PropTypes.number, // Define the prop type and whether it's required
};
export default ToDoList;
