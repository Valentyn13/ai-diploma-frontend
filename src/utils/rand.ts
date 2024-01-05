import { getCurrentHour } from './time';

function seededRandom(seed: number) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getRandomElements(arr: any[], x: number) {
  let selectedElements = [];
  let seed = getCurrentHour();

  for (let i = 0; i < x; i++) {
    let index = Math.floor(seededRandom(seed + i) * arr.length);
    selectedElements.push(arr[index]);
  }

  return selectedElements;
}

export function shuffleArray(arr: any[]) {
  let seed = getCurrentHour();
  let shuffledArray = arr.slice();

  for (let i = 0; i < shuffledArray.length; i++) {
    let index = Math.floor(seededRandom(seed + i) * shuffledArray.length);
    let temp = shuffledArray[i];
    shuffledArray[i] = shuffledArray[index];
    shuffledArray[index] = temp;
  }

  return shuffledArray;
}
