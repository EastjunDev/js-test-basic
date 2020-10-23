import { addTodoUser, removeTodoUser } from "../api/todoAPI.js";
import UserList from "../Components/UserList.js";
import todoStore, {
  addUser,
  removeUser,
  setAcitveUserId,
} from "../Store/todoStore.js";

export default function UserListContianer($target) {
  let prevActiveUserId = null;
  let prevUsers = null;

  const onClickHandler = async (e) => {
    if (e?.target?.classList.contains("user-create-button")) {
      const name = prompt("추가하고 싶은 이름을 입력해주세요.");
      const user = await addTodoUser(name);
      todoStore.dispath(addUser(user));
      return;
    }
    const userId = e?.target?.dataset?.id;
    if (userId) {
      todoStore.dispath(setAcitveUserId(userId));
    }
  };
  const onDblClickHandler = async (e) => {
    const userId = e?.target?.dataset?.id;
    if (!userId) {
      return;
    }
    await removeTodoUser(userId);
    todoStore.dispath(removeUser(userId));
  };

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
