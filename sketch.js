class Star {
    constructor() {
      this.pos = createVector(random(-width, width), random(-height, height), random(-1000, 1000));
      this.vel = createVector(0, 0, random(2, 5));
      this.acc = createVector(0, 0, 0.01);
      this.size = random(0.5, 3);
    }
  
    applyForce(force) {
      this.acc.add(force);
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
  
    edges() {
      if (this.pos.z > 1000) {
        this.pos.z = -1000;
        this.pos.x = random(-width, width);
        this.pos.y = random(-height, height);
        this.vel.z = random(2, 5);
      }
    }
  
    display() {
      push();
      translate(this.pos.x, this.pos.y, this.pos.z);
      noStroke();
      sphere(this.size);
      pop();
    }
  }
  
  let stars = [];
  let starsNum = 1000;
  
  function setup() {

    //createCanvas(750, 700, WEBGL);
    createCanvas(windowWidth, windowHeight, WEBGL);
    frameRate(60);
  
    for (var i = 0; i < starsNum; i++) {
      stars.push(new Star());
    }
  }
  
  function drawStars() {
    for (let star of stars) {
      star.applyForce(createVector(0, 0, 0.01));
      star.update();
      star.display();
      star.edges();
    }
  }
  
  let angle = 0;
  let savingBrand = false;
  let saveStart;
  
  function draw() {
    background(50);
  
    drawStars();
  
    let robotSize = 100;
  
    // lighting
    ambientLight(100);
    pointLight(255, 255, 255, -width / 2, -height / 2, 500);
  
    // Rotate the scene
    if (!savingBrand) {
      rotateY(angle);
    } else {
      let saveDuration = millis() - saveStart;
      if (saveDuration < 2000) {
        rotateY(angle + map(saveDuration, 0, 2000, 0, PI));
      } else {
        rotateY(angle + PI);
        savingBrand = false;
      }
    }
  
    // Draw the main body
    push();
  
    fill(200);
    specularMaterial(200);
    shininess(20);
    box(robotSize / 4, robotSize, robotSize / 4);
    pop();
  
    // Draw the left leg
    push();
    translate(-robotSize / 4, 0, 0);
    rotateX(sin(angle) * PI / 6);
    fill(200);
    specularMaterial(200);
    shininess(20);
    box(robotSize / 8, robotSize, robotSize / 8);
    pop();
  
    // Draw the right leg
    push();
    translate(robotSize / 4, 0, 0);
    rotateX(-sin(angle) * PI / 6);
    fill(200);
    specularMaterial(200);
    shininess(20);
    box(robotSize / 8, robotSize, robotSize / 8);
    pop();
  
    // Update the rotation angle
    angle += 0.02;
  }
  
  function mousePressed() {
    savingBrand = true;
    saveStart = millis();
  }