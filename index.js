const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const text = document.getElementById('weightText');
    
    let isDragging = false;
    let offsetX, offsetY;
    let selectedObject = null;

  let wx = 350;
  let wy = 300;
  let ww = 100;
  let wh = 100;

    const wimage = new Image();
    wimage.src = 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/842748/weighing-scale-clipart-xl.png';
    
    const objects = [
      { x: 50, y: 50, width: 50, height: 50, dy: 0, weight: 2, imageSrc: 'https://clipart-library.com/img/1653748.png'},
      { x: 125, y: 50, width: 50, height: 50, dy: 0, weight: 0.5, imageSrc: 'https://static.vecteezy.com/system/resources/previews/009/597/886/original/strawberry-fruit-illustration-cartoon-png.png'},
      { x: 200, y: 50, width: 50, height: 50, dy: 0, weight: 0.2, imageSrc: 'https://static.vecteezy.com/system/resources/previews/008/506/550/original/blueberry-fruit-cartoon-png.png' }
    ];
    
    function drawObjects() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const object of objects) {
        const img = new Image();
        img.src = object.imageSrc;
        img.onload = () => {
          ctx.drawImage(img, object.x, object.y, object.width, object.height);

          ctx.drawImage(wimage, wx, wy, ww, wh);
        }
      }
    }
    
    function getSelectedObject(x, y) {
      for (const object of objects) {
        if (x > object.x && x < object.x + object.width && y > object.y && y < object.y + object.height) {
          return object;
        }
      }
      return null;
    }
    
    canvas.addEventListener('mousedown', (e) => {
      const mouseX = e.clientX - canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;
      
      selectedObject = getSelectedObject(mouseX, mouseY);
      
      if (selectedObject) {
        isDragging = true;
        offsetX = mouseX - selectedObject.x;
        offsetY = mouseY - selectedObject.y;
      }
    });

    setInterval(function contact(){
      if (selectedObject.x > 300 &&
        selectedObject.x < 450 &&
        selectedObject.y > 225 &&
        selectedObject.y < 350
        ){
          selectedObject.x = 376;
          selectedObject.y = 267;
        }

        if (selectedObject.x == 376 &&
          selectedObject.y == 267){
            isDragging = false;
            text.textContent = `Weight: ${selectedObject.weight}`;
          }
    })
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging && selectedObject) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        
        selectedObject.x = mouseX - offsetX;
        selectedObject.y = mouseY - offsetY;
        
        drawObjects();
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
      selectedObject = null;
    });
    
    drawObjects();
