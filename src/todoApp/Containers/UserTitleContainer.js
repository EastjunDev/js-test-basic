import UserTitle from "../Components/UserTitle.js";
import todoStore from "../Store/todoStore.js";

export default function UserTitleContainer($target) {
  let prevActiveUserId = null;

  return () => {
    const { activeUserId, users } = todoStore.getState();
    if (prevActiveUserId === activeUserId) {
      return;
    }
    prevActiveUserId = activeUserId;
    const activeUserIdx = users.findIndex(({ _id }) => _id === activeUserId);
    $target.innerHTML = UserTitle({
      activeUserName: users[activeUserIdx]?.name,
    });
  };
}
