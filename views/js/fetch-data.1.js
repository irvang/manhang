var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://app.linkedin-reach.io/words', true);
xhr.responseType = 'blob';
xhr.onload = function(e) {
  var img = document.createElement('img');
  img.src = window.URL.createObjectURL(this.response);
  document.body.appendChild(img);
};

xhr.send();