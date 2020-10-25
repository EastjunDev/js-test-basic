import UserTitle from "../Components/UserTitle.js";
import todoStore from "../Store/todoStore.js";

export default function UserTitleContainer($target) {
  let prevActiveUserId = null;

  return () => {
    const { activeUser } = todoStore.getState();
    if (prevActiveUserId === activeUser?._id) {
      return;
    }
    prevActiveUserId = activeUser?._id;
    $target.innerHTML = UserTitle({ activeUserName: activeUser?.name });
  };
}
