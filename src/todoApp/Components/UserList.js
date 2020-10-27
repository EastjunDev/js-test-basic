export default function UserList({ users, activeUserId }) {
  const usersHTML = users
    .map(
      ({ name, _id }) => `
    <button class="ripple ${_id === activeUserId ? "active" : ""}"
      data-id = ${_id}>
        ${name}
    </button>`
    )
    .join(" ");
  const userCreateBtnHTML = `
    <button class="ripple user-create-button">
      + 유저 생성
    </button>
  `;
  return usersHTML + userCreateBtnHTML;
}
