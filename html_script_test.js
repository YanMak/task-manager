
const result = confirm('Вам нравится JavaScript?');
if (result) {
document.querySelector('#result').textContent = 'Вы ответили, что Вам нравится JavaScript';
} else {
document.querySelector('#result').textContent = 'Вы ответили, что Вам не нравится JavaScript';
}alert('привет кросавчег');