export const getUserScore = () => {
  const score = localStorage.getItem("score")
  ? JSON.parse(localStorage.getItem("score"))
  : '';
  const time = localStorage.getItem("time")
    ? JSON.parse(localStorage.getItem("time"))
    : '';

  const userScoreLs = [score, time]
  return userScoreLs;
};

export const saveCurrScore = (score) => {
  if (score) {
    localStorage.setItem("score", JSON.stringify(score));
  } else {
    localStorage.removeItem("score");
  }
};

export const saveCurrTime = (time) => {
  if (time) {
    localStorage.setItem("time", JSON.stringify(time));
  } else {
    localStorage.removeItem("time");
  }
};
