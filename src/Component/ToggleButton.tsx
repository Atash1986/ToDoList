import React, { Dispatch, SetStateAction } from "react";

type Props = {
  isDivVisible: boolean;
  setDivVisible: Dispatch<SetStateAction<boolean>>;
};

export function ToggleButton({ isDivVisible, setDivVisible }: Props) {
  function handleClickDone(event: any) {
    setDivVisible(!isDivVisible);
  }
  return (
    <div>
      <div onClick={handleClickDone} className="textTaskDone">
        {isDivVisible ? (
          <span>Hide The Completed Tasks</span>
        ) : (
          <span>Show The Completed Tasks</span>
        )}
      </div>
      <li className="sparator"></li>
      <br />
      <br />
    </div>
  );
}
