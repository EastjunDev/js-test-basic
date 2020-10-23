import todoStore from "../Store/todoStore.js";

export default function TodoAppContianer($target) {
  let prevActiveUserId = null;
  return () => {
    const { activeUserId } = todoStore.getState();

    if (prevActiveUserId === activeUserId) {
    }
    prevActiveUserId = activeUserId;
  };
}
