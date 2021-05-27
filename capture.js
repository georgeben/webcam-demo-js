window.addEventListener('DOMContentLoaded', async () => {
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const record = document.getElementById('record');
  const photos = document.getElementById('photos');

  try {
    let stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: 800,
        height: 600
      },
    });

    console.log('Stream', {stream})

    console.log({ video });

    video.srcObject = stream;
  } catch (error) {
    console.log(error)
  }

  const ctx = canvas.getContext('2d');
  record.addEventListener('click', () => {
    const bytes = captureBytes(video, ctx, canvas);
    return photos.appendChild(formatImgTag(bytes))
  })
});

function captureBytes(video, ctx, canvas) {
  ctx.drawImage(video, 0, 0);
  return canvas.toDataURL('image/png')
}

function formatImgTag(bytes) {
  const div = document.createElement('div');
  div.classList.add('photo');
  const close = document.createElement('div');
  close.classList.add('photoClose');
  const img = new Image();
  img.src = bytes;
  div.appendChild(img);
  div.appendChild(close)
  return div;
}
