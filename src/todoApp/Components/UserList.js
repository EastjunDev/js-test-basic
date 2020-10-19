export default function UserList({ users, activeUserId }) {
  return users
    .map(
      ({ name, _id }) => `
    <button class="ripple ${_id === activeUserId ? "active" : ""}">
        ${name}
    </button>`
    )
    .join(" ");
}
