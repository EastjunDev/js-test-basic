import UserList from "../Components/UserList.js";
import todoStore, { setAcitveUserId } from "../Store/todoStore.js";

export default function UserListContianer($target) {
  let prevActiveUserId = null;
  let prevUsers = null;

  const onClickHandler = (e) => {
    const userId = e?.target?.dataset?.id;
    if (!userId) {
      return;
    }
    todoStore.dispath(setAcitveUserId(userId));
  };
  const onDblClickHandler = () => {};

  $target.addEventListener("click", onClickHandler);
  $target.addEventListener("dblclick", onDblClickHandler);

  return () => {
    const { users, activeUserId } = todoStore.getState();
    if (activeUserId === prevActiveUserId && users === prevUsers) {
      return;
    }
    prevActiveUserId = activeUserId;
    prevUsers = users;
    $target.innerHTML = UserList({ activeUserId, users });
  };
}
