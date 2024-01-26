import { getCurrentDay, getCurrentHour, getCurrentMonth } from './time';

export function seededRandom(seed: number) {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

export function getRandomElements<T>(arr: T[], x: number): T[] {
  let selectedElements: T[] = [];
  let seed = getCurrentHour() + getCurrentDay() + getCurrentMonth();
  let arrCopy = arr.slice();

  for (let i = 0; i < x; i++) {
    seed = (seed * 9301 + 49297) % 233280; // Update the seed for each iteration
    let index = Math.floor(seededRandom(seed) * arrCopy.length);
    let selectedElement = arrCopy.splice(index, 1)[0];
    selectedElements.push(selectedElement);
  }

  return selectedElements;
}

export function shuffleArray(arr: any[]) {
  return getRandomElements(arr, arr.length);
}
