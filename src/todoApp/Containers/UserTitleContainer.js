import UserTitle from "../Components/UserTitle.js";
import todoStore from "../Store/todoStore";

function UserTitleContainer($target) {
  let prevActiveUserId;
  const onClickHandler = () => {};
  const onDblClickHandler = () => {};

  $target.addEventListener("click", onClickHandler);
  $target.addEventListener("dblclick", onDblClickHandler);

  return () => {
    const { activeUserId, userList } = todoStore.getState();
    if (prevActiveUserId === activeUserId) {
      return;
    }
    prevActiveUserId = activeUserId;
    const activeUserIdx = userList.findIndex(({ _id }) => _id === activeUserId);
    $target.innerHTML = UserTitle({
      activeUser: userList[activeUserIdx]?.name,
    });
  };
}
