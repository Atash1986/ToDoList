import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form"
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { TaskItem } from "../../../types/TaskItem";
import { Authors } from "../../../types/Authors";
//import { initTask } from "../../../data/initTask";
import "./AddBox.css";
import { addTask } from "../../../apis/task";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "پر کردن این فیلد الزامی است").min(3, "حداقل باید 3 کاراکتر باشد"),
  authorId: z.string().min(1, "Please select a category"),

})

type DirtyType = {
  title: boolean;
  author: boolean;
  isAddFired: boolean;
};

function AddBox({
  activeCategoryId,
  addNewItemToState,
  authorsItems,
}: {
  activeCategoryId: number;
  addNewItemToState: any;
  authorsItems: Authors[];
}) {
  const [errorList, setErrorList] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isAddBtnClickedRef = useRef(false);
  const [dirty, setDirty] = useState<DirtyType>({
    title: false,
    author: false,
    isAddFired: false,
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange"
  });
  const onSubmit = async (data: {
    title: string;
    authorId: string;
  }) => {
    isAddBtnClickedRef.current = true;
    setErrorList([]);

    const dirtyLocal: DirtyType = {
      ...dirty,
      isAddFired: true,
    };
    setDirty(dirtyLocal);
    if (Object.keys(errors).length === 0) {
      const newItem: TaskItem | null = await addTask(
        activeCategoryId,
        data.title,
        Number(data.authorId),
      );
      if (newItem !== null) {
        addNewItemToState(newItem);
      }
    } else {
      return;
    }

    reset()
    searchInputRef.current?.focus();
    isAddBtnClickedRef.current = false;

  };
  const isAllCategory = activeCategoryId === 0;


  const reset = useCallback(() => {
    setValue("title", "")
    setValue("authorId", "-1")

  }, []);

  const isAddBtnDisabled = isAllCategory || isAddBtnClickedRef.current;
  return (

    <form className="flex flex-col gap-8 p-4" onSubmit={handleSubmit(onSubmit)} >
      <div className="addBoxContainer" data-testid="add-box-container">
        {errors?.title && <p>{errors?.title.message}</p>}
        <Tooltip id="my-tooltip" data-testid="add-box-tooltip" />
        <div className="addBox">

          <input
            {...register("title")}
            data-testid="add-box-title"
            disabled={isAllCategory}
            className="taskTitle"
            type="text"
            data-tooltip-id={isAllCategory ? "my-tooltip" : ""}
            data-tooltip-content={
              isAllCategory ? "You Must First Select One Category Item" : ""
            }

          />

          <select
            {...register("authorId")}
            data-testid="add-box-author"
            disabled={isAllCategory}
          >
            <option value="">Select an author</option>

            {authorsItems?.map((option: Authors) => (
              <option key={option.id} value={String(option.id)}>
                {option.name}
              </option>
            ))}
          </select>
          {errors?.authorId && <p>{errors?.authorId.message}</p>}
          <button type="submit"
            data-testid="add-box-add-button"
            className="addButton"
            disabled={isAddBtnDisabled}
            style={{ cursor: isAllCategory ? "not-allowed" : "pointer" }}
          >

            <img src="plus.svg" />
          </button>

          <br />
        </div>

        <div className="errorRequirement">
          <span data-testid="add-box-error-box">
            {errorList.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </span>
        </div>
      </div>
    </form>
  );
}
export default AddBox;
