// Get canvas element and engine
const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const scene = new BABYLON.Scene(engine);

// Create camera
const camera = new BABYLON.ArcRotateCamera(
  "camera",
  -Math.PI / 2.5, // alpha
  Math.PI / 3,  // beta
  4,            // radius
  new BABYLON.Vector3(-200, 50, 0),
  scene
);
camera.setPosition(new BABYLON.Vector3(100, 300, 600));

camera.attachControl(canvas, true);

// Create light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(1, 1, 0),
  scene
);
scene.clearColor = new BABYLON.Color3(0.95, 0.95, 0.95);

// Create bookshelf
let bookshelf;

function createBookshelf(height, width, depth, numShelves, numColumns) {
  // Delete existing bookshelf if it exists
  if (bookshelf) {
    bookshelf.dispose();
  }

  // Create bookshelf mesh
  bookshelf = new BABYLON.Mesh("bookshelf", scene);


  //Texture
  // const material = new BABYLON.StandardMaterial("wood", scene);
  const shelfMaterial = new BABYLON.StandardMaterial("backSideMate");
  currentTexture =  shelfMaterial.diffuseTexture = new BABYLON.Texture("Wood-Veneer-Architextures.jpg", scene);

  // currentTexture = box.material.diffuseTexture = new BABYLON.Texture("texture1.jpg", scene);
  

  // Create shelves
  const shelfHeight = 5;
  const sideThickness = 5;
  const sideWidth = numShelves  * height;

  // Create Columns, Shelves, backside
    for (let i = 0; i < numColumns+1; i++) {

      for (let j = 0; j < numShelves +1 ; j++) {
        const shelf = BABYLON.MeshBuilder.CreateBox(
          `shelf-${j}`,
          { height: shelfHeight, width: i*width + sideThickness, depth },
          scene
        );
        shelf.position.x = -i*width/2;
        shelf.position.y = j * height;
        shelf.parent = bookshelf;
        shelf.material = shelfMaterial;
      }

      const column = BABYLON.MeshBuilder.CreateBox(
        "left-side",
        { height: sideWidth + sideThickness, width: sideThickness, depth },
        scene
      );
      column.position.x = -width*i;
      column.position.y = sideWidth / 2;
      column.parent = bookshelf;
      column.material = shelfMaterial;

  const backSide = BABYLON.MeshBuilder.CreateBox(
    "back-side",
    { height: sideWidth + sideThickness, width: i*width + sideThickness, depth: sideThickness },
    scene
  );

  backSide.position.x = -width/2 * i;
  backSide.position.y = sideWidth / 2;
  backSide.position.z = -depth/2;
  backSide.parent = bookshelf;
  backSide.material = shelfMaterial;
  }

  // Create sides
  const rightSide = BABYLON.MeshBuilder.CreateBox(
    "right-side",
    { height: sideWidth + sideThickness, width: sideThickness, depth },
    scene
  );
  rightSide.position.x = -width;
  rightSide.position.y = sideWidth / 2;
  rightSide.parent = bookshelf;
  rightSide.material = shelfMaterial;

  const leftSide = BABYLON.MeshBuilder.CreateBox(
    "left-side",
    { height: sideWidth + sideThickness, width: sideThickness, depth },
    scene
  );
  leftSide.position.x = 0;
  leftSide.position.y = sideWidth / 2;
  leftSide.parent = bookshelf;
  leftSide.material = shelfMaterial;

  var textureElements = document.querySelectorAll(".textures img");
for (var i = 0; i < textureElements.length; i++) {
    var element = textureElements[i];
    element.addEventListener("click", function(event) {
        var newTexturePath = event.target.src;
        var newTexture = new BABYLON.Texture(newTexturePath, scene);
        currentTexture = shelfMaterial.diffuseTexture = newTexture;
        // Deselect all other textures
        for (var j = 0; j < textureElements.length; j++) {
            textureElements[j].classList.remove("selected");
        }
        // Select the clicked texture
        event.target.classList.add("selected");
    }, false);
};
}

createBookshelf(100, 100, 100, 2, 2);
  



// Update bookshelf on button click
const updateButton = document.getElementById("update");
updateButton.addEventListener("click", () => {
  const height = Number(document.getElementById("shelf-height").value);
  const width = Number(document.getElementById("shelf-width").value);
  const depth = Number(document.getElementById("shelf-depth").value);
  const numShelves = Number(document.getElementById("num-shelves").value);
  const numColumns = Number(document.getElementById("num-columns").value);
  createBookshelf(height, width, depth, numShelves, numColumns);
});

// Run render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Resize canvas on window resize
window.addEventListener("resize", () => {
  engine.resize();
});
