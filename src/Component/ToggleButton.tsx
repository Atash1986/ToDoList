import { Dispatch, SetStateAction } from "react";

type Props = {
  isDivVisible: boolean;
  setDivVisible: Dispatch<SetStateAction<boolean>>;
  afterToggle: React.RefObject<HTMLDivElement>;
};

export function ToggleButton({
  isDivVisible,
  setDivVisible,
  afterToggle: bottomRef,
}: Props) {
  function handleClickDone() {
    setDivVisible(!isDivVisible);
    bottomRef.current?.scrollIntoView();
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
