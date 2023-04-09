// Get canvas element and engine
const canvas = document.getElementById("canvas");
const engine = new BABYLON.Engine(canvas, true);

// Create scene
const scene = new BABYLON.Scene(engine);

// Create camera
const camera = new BABYLON.ArcRotateCamera(
  "camera",
  -Math.PI / 2/5,
  Math.PI / 2,
  10,
  new BABYLON.Vector3(0, 200, 0),
  scene
);
camera.setPosition(new BABYLON.Vector3(0, 200, 600));

camera.attachControl(canvas, true);

// Create light
const light = new BABYLON.HemisphericLight(
  "light",
  new BABYLON.Vector3(1, 1, 0),
  scene
);

// // Create ground
// const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

// Create bookshelf
let bookshelf;

function createBookshelf(height, width, depth, numShelves, numColumns) {
  // Delete existing bookshelf if it exists
  if (bookshelf) {
    bookshelf.dispose();
  }

  // Create bookshelf mesh
  bookshelf = new BABYLON.Mesh("bookshelf", scene);

  // Create shelves
  const shelfHeight = 5;
  for (let i = 0; i < numShelves; i++) {
    const shelf = BABYLON.MeshBuilder.CreateBox(
      `shelf-${i}`,
      { height: shelfHeight, width, depth },
      scene
    );

    shelf.position.y = i * height;
    shelf.parent = bookshelf;
  }


  // Create Columns

  // const columnHeight = (numShelves - 1)  * height;
  // const columnWidth = (numColumns - 1)  * height;
  // for (let i = 0; i < numColumns - 1; i++) {
  //   const column = BABYLON.MeshBuilder.CreateBox(
  //     `column-${i}`,
  //     { height: columnHeight, width: 5, depth },
  //     scene
  //   );

  //   column.position.x = i * -columnWidth;
  //   column.position.y = columnHeight / 2 ;
  //   column.parent = bookshelf;
  // }


  // Create sides

  const sideThickness = 5;
  const sideWidth = (numShelves - 1)  * height;
  const leftSide = BABYLON.MeshBuilder.CreateBox(
    "left-side",
    { height: sideWidth + sideThickness, width: sideThickness, depth },
    scene
  );
  leftSide.position.x = -(width / 2);
  leftSide.position.y = sideWidth / 2;
  leftSide.parent = bookshelf;

  const rightSide = BABYLON.MeshBuilder.CreateBox(
    "right-side",
    { height: sideWidth + sideThickness, width: sideThickness, depth },
    scene
  );
  rightSide.position.x = width / 2;
  rightSide.position.y = sideWidth / 2;
  rightSide.parent = bookshelf;

  const backSide = BABYLON.MeshBuilder.CreateBox(
    "back-side",
    { height: sideWidth + sideThickness, width: width + sideThickness, depth: sideThickness },
    scene
  );

  backSide.position.x = 0;
  backSide.position.y = sideWidth / 2;
  backSide.position.z = -depth/2;
  backSide.parent = bookshelf;
}

createBookshelf(100, 300, 60, 5, 2);

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
