export default function UserTitle({ activeUserName }) {
  return activeUserName
    ? `
      <span>
        <strong>${activeUserName}</strong>'s Todo List
      </span>`
    : `<span>Todo List</span>`;
}
