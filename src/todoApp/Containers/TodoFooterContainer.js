import TodoFooter from "../Components/TodoFooter.js";

export default function TodoFooterConatiner($target) {
  return () => {
    $target.innerHTML = TodoFooter();
  };
}
