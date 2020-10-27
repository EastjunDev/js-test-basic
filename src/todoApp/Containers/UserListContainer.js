import { addTodoUser, removeTodoUserById } from "../api/todoAPI.js";
import UserList from "../Components/UserList.js";
import todoStore, {
  addUser,
  removeUser,
  setAcitveUser,
} from "../Store/todoStore.js";

export default function UserListContianer($target) {
  const onClickHandler = async (e) => {
    if (e?.target?.classList.contains("user-create-button")) {
      const name = prompt("추가하고 싶은 이름을 입력해주세요.");
      const user = await addTodoUser(name);
      todoStore.dispath(addUser(user));
      return;
    }
    const userId = e?.target?.dataset?.id;
    if (userId) {
      todoStore.dispath(setAcitveUser(userId));
    }
  };
  const onDblClickHandler = async (e) => {
    const userId = e?.target?.dataset?.id;
    if (!userId) {
      return;
    }
    await removeTodoUserById(userId);
    todoStore.dispath(removeUser(userId));
  };

  $target.addEventListener("click", onClickHandler);
  $target.addEventListener("dblclick", onDblClickHandler);

  let prevActiveUserId = null;
  let prevUsers = null;

  return () => {
    const { users, activeUser } = todoStore.getState();
    if (activeUser?._id === prevActiveUserId && users === prevUsers) {
      return;
    }
    prevActiveUserId = activeUser?._id;
    prevUsers = users;
    $target.innerHTML = UserList({ activeUserId: activeUser?._id, users });
  };
}
