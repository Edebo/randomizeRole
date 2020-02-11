const all =
  "Adebowale,Micheal,Francis,Esther,Damilola,Grace,Kenneth,Awesome,Godwin,Kelvin,Nazir,Surajudeen,Shitu,Abdulazeez,Hayatu,Abdulkareem,Ridwan,Zakariah,Bello,Gift,Bright,Kelvin,Damilare,Zainab,Jibrin";

let names = all.split(",");
const length = names.length;
let randomizeArray = [];
let index, name;
for (let i = 0; i < length; i++) {
  index = Math.floor(Math.random() * names.length);
  name = names[index];
  randomizeArray.push(name);
  names.splice(index, 1);
}

console.log(randomizeArray,randomizeArray.length);
