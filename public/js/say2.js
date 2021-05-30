// this is say2.js
const sayHi2 = (user)=> {
  alert(`Hello, ${user}!`);
}

const sayBye2 = (user) => {
  alert(`Bye, ${user}!`);
}

module.exports = {
    sayHi2, sayBye2
}

sayHi2('say call from say2.js')