export function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'בוקר טוב';
  } else if (hours === 12) {
    return 'צהריים טובים';
  } else if (hours < 17) {
    return 'אחר צהריים טובים';
  } else if (hours < 21) {
    return 'ערב טוב';
  } else {
    return 'לילה טוב';
  }
}

export function getCollectionIdByTime() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'morning';
  } else if (hours === 12) {
    return 'noon';
  } else if (hours < 17) {
    return 'afternoon';
  } else if (hours < 21) {
    return 'evening';
  } else {
    return 'night';
  }
}
