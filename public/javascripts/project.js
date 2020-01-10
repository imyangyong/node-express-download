function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position="fixed";  //avoid scrolling to bottom
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}
function copyTextToClipboard(text, domId) {
  text = window.location.host + text;
  
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    copiedDom(domId);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    copiedDom(domId);
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function copiedDom(domId) {
  var dom = document.querySelector('#' + domId);
  dom.innerHTML = '已复制';
  dom.setAttribute('class', 'copy disabled');
}
