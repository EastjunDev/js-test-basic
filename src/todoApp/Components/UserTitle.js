export default function UserTitle({ activeUserName }) {
  return `
      <span>
        <strong>${activeUserName}</strong>'s Todo List
      </span>`;
}
