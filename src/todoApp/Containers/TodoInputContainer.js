import TodoInput from "../Components/TodoInput.js";
export default function TodoInputContainer($target) {
  return () => {
    $target.innerHTML = TodoInput();
  };
}
