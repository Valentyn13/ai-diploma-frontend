import { getCurrentDay, getCurrentHour, getCurrentMonth } from './time';

function seededRandom(seed: number) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getRandomElements<T>(arr: T[], x: number) {
  let selectedElements = [];
  let seed = getCurrentHour() + getCurrentDay() + getCurrentMonth();
  let arrCopy = arr.slice();

  for (let i = 0; i < x; i++) {
    let index = Math.floor(seededRandom(seed + i) * arrCopy.length);
    let selectedElement = arrCopy.splice(index, 1)[0];
    selectedElements.push(selectedElement);
  }

  return selectedElements;
}

export function shuffleArray(arr: any[]) {
  return getRandomElements(arr, arr.length);
}
