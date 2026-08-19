window.addEventListener('error', function(e) {
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.top = '0';
  div.style.left = '0';
  div.style.background = 'red';
  div.style.color = 'white';
  div.style.zIndex = '99999';
  div.style.padding = '20px';
  div.style.fontSize = '24px';
  div.innerHTML = 'ERROR: ' + e.message + ' line: ' + e.lineno;
  document.body.appendChild(div);
});
console.log("Test script injected");
