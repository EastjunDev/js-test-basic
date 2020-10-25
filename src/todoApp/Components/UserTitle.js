export default function UserTitle({ activeUserName }) {
  if (!activeUserName) {
    return `<span>Todo List</span>`;
  }
  return `<span>
            <strong>${activeUserName}</strong>'s Todo List
          </span>`;
}
