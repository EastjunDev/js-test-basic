export function add() {}

export function swap() {}

export function repeat(count, callback) {
  if (count <= 0) {
    return false;
  }
  new Array(count).fill(null).forEach(() => callback());
  return true;
}
