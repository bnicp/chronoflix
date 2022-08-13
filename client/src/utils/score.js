export const scoreCalc = (seconds) => {
    let score
    if (seconds <= 20) {
        score = Math.ceil(5000 - 75 * seconds);
      } else if (seconds > 20 && seconds <= 40) {
        score = Math.ceil(3500 - 3500 * (0.009 * seconds));
      } else if (seconds > 40 && seconds <= 60) {
        score = Math.ceil(2240 - 2240 * (0.008 * seconds));
      } else if (seconds > 60 && seconds <= 90) {
        score = Math.ceil(1165 - 1165 * (0.007 * seconds));
      } else {
        score = Math.ceil(431 - 431 * (0.004 * seconds));
      }
    return score
  };