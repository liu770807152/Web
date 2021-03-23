;(function(doc) {
  var oOpenModBtn = doc.querySelector('.js-open-mod-btn'),
      oCloseModBtn = doc.querySelector('.js-close-mod-btn'),
      oUploadMod = doc.querySelector('.js-upload-mod'),
      oVideoInput = doc.querySelector('#videoFile'),
      oUploadArea = doc.querySelector('.js-upload-area'),
      oProgressBar = doc.querySelector('.js-progress-bar'),
      oPercent = oUploadArea.querySelector('.js-percent');

  var init = function() {
    bindEvent();
  }

  function bindEvent() {
    oOpenModBtn.addEventListener('click', showModal.bind(this, true), false);
    oCloseModBtn.addEventListener('click', showModal.bind(this, false), false);
    oVideoInput.addEventListener('change', uploadFile, false);
  }

  function showModal(show) {
    if (show) {
      oUploadMod.className += ' show';
    } else {
      oUploadMod.className += 'upload-mod-wrap js-upload-mod';
    }
  }

  function uploadFile() {
    var oFile = this.files[0],
        fileLen = oFile.length,
        fileSize = oFile.size,
        fileName = oFile.name;
    if (oFile > 1) {
      alert('Only allow to upload 1 video at 1 time!');
      return;
    }
    if (/\.(mp4)$/.test(fileName)) {
      alert('The uploaded file is not a mp4 video!');
      return;
    }
    // 限制文件大小为50MB
    if (fileSize > 1024 * 1024 * 50) {
      alert('Your uploaded video exceeds maximum size!');
      return;
    }
    doUpload(oFile);
  }

  function doUpload(file) {
    var fd = new FormData();
    fd.append('file', file);

    var o = window.XMLHttpRequest ? 
            new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    o.open('post', 'server/upload.php');
    oUploadArea.className = 'upload-area js-upload-area uploading';
    // 用onprogress事件更新进度条
    o.upload.onprogress = function(e) {
      var e = e || window.event;
      oProgressBar.style.width = e.loaded / e.total * 100 + '%';
      oPercent.innerHTML = (e.loaded / e.total * 100).toFixed(1) + '%';
    }
    // onload事件在上传完成时触发
    o.upload.onload = function() {
      oUploadArea.className += ' finished';
      oPercent.innerHTML = '0.0%';
    }

    o.send(fd);
  }

  init();
})();