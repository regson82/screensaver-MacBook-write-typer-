
const HOURS = [
  "doce", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once"
];

function getMinutesWord(minutes: number): string {
  const ONES = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const TEENS = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const TWENTIES = ["veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];

  if (minutes < 10) return ONES[minutes];
  if (minutes < 20) return TEENS[minutes - 10];
  if (minutes < 30) return TWENTIES[minutes - 20];
  return ""; 
}

export function timeToWords(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  let nextHour = false;
  let minuteString = "";
  
  if (minutes === 0) {
    minuteString = "en punto";
  } else if (minutes === 15) {
    minuteString = "y cuarto";
  } else if (minutes === 30) {
    minuteString = "y media";
  } else if (minutes === 45) {
    minuteString = "menos cuarto";
    nextHour = true;
  } else if (minutes > 30) {
    const minsLeft = 60 - minutes;
    minuteString = `menos ${getMinutesWord(minsLeft)}`;
    nextHour = true;
  } else {
    minuteString = `y ${getMinutesWord(minutes)}`;
  }
  
  if (nextHour) {
    hours = (hours + 1) % 24;
  }
  
  const hour12 = hours % 12;
  const hourWord = HOURS[hour12];
  
  let prefix = "Son las";
  if (hour12 === 1) {
    prefix = "Es la";
  }
  
  const timeString = `${prefix} ${hourWord} ${minuteString}`;
  return timeString.charAt(0).toUpperCase() + timeString.slice(1);
}
