export default function UserList(props) {
  const { users, activeUser } = props;
  return users
    .map(
      ({ name }) => `
    <button class="ripple ${activeUser === name ? "active" : ""}">
        ${name}
    </button>`
    )
    .join(" ");
}
