"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Heather Hickman
   Date:   11/05/2019
   
   Filename: bu_bubbles.js

*/


/* This variable creates the box that holds the rest of the javascript, it keeps the floating images contained in a space behind the graphical image, so that it looks as if the floating images are contained within the graphic. */
var box = {
   width:  1024,
   height: 500,
};

/* The section is the constructor, which helps to create the bubbles that hold the images. */
function bubble(size, img) {
   this.radius = size;
   this.imageURL = img;
   this.xVelocity = null;
   this.yVelocity = null;
   this.xPos = null;
   this.yPos = null;
   this.opacity = 1;
   this.hue = 0;
   this.rotate = 0;
   this.rotateDirection = 1;
}

/* This section creates the fade for the images. The longer the image is floating around its container, the more opace it becomes until it eventually dissappears. This sets the opacity to slowly decrease by .0005 over time so that the process is gradual and seamless.  */
bubble.prototype.fadeBubble = function() {
   this.opacity -= 0.0005;
};

/* This piece of code changes the color of the bubbles as they bounce around the container. It changes the hue, adding +3 to the color of the hue to make the change seamless. It continues to change color until the image completely disappears. */
bubble.prototype.changeColor = function() {
   this.hue = (this.hue + 3) % 360;
};

/* This rotates each individual images, making them spin both clockwise and counterclockwise around the container until they disappear. */
bubble.prototype.rotateBubble = function() {
   this.rotate = (this.rotate + this.rotateDirection) % 360;
};

/* This piece of code makes the bubbles move around the container and bounce off of the edges. It changes the value of the x and y axis to enable it to move. It then takes the height and width of the container and makes sure that the x and y posistion value is never greater or less than the height and width. */
bubble.prototype.moveBubble = function(height, width) {
   var bubbleTop = this.yPos;
   var bubbleBottom = this.yPos + this.radius;
   var bubbleLeft = this.xPos;
   var bubbleRight = this.xPos + this.radius;
   if (bubbleTop < 0 || bubbleBottom > height) {this.yVelocity = -this.yVelocity;}
   if (bubbleLeft < 0 || bubbleRight > width) {this.xVelocity = -this.xVelocity;} 
   this.yPos += this.yVelocity;   
   this.xPos += this.xVelocity;
};

window.addEventListener("load", function() {
   // Reference to the bubble box
   var bubbleBox = document.getElementById("bubbleBox");
   
   // This set of codes creates a new bubble for the images every half second.
   setInterval(function() {
      
      // And this makes sure that no more than 20 bubbles are created at a time. If too many are created, it will overload the program and slow down the website.
      if (bubbleBox.childElementCount <= 20) {
         
         // Create a new bubble object
         var newBubble = new bubble(randInt(50, 120), "bu_bubble" + randInt(1, 10) + ".png");
         newBubble.xPos = box.width/2;
         newBubble.yPos = box.height/2;
         newBubble.xVelocity = randInt(-5, 5);
         newBubble.yVelocity = randInt(-5, 5);  
         newBubble.rotate = randInt(0, 360);
         newBubble.hue = randInt(0, 360);
         newBubble.rotateDirection = randInt(-2, 2);

         // Apply the bubble object to a new inline image
         var bubbleImg = document.createElement("img");
         bubbleImg.style.position = "absolute";         
         bubbleImg.src = newBubble.imageURL;         
         bubbleImg.style.width = newBubble.radius + "px";
         bubbleImg.style.left = newBubble.xPos + "px";
         bubbleImg.style.top = newBubble.yPos + "px";

         // Append the inline image to the bubble box
         bubbleBox.appendChild(bubbleImg);


         var bubbleInterval = setInterval(function() {
            newBubble.fadeBubble();
            if (newBubble.opacity < 0) {
               // This piece of code slowly removes the bubble when the opacity becomes less than zero. This makes the bubble slowly fade and then dissappear in a seamless way instead of being removed abrupty. 
               clearInterval(bubbleInterval);
               bubbleBox.removeChild(bubbleImg);
            } else {
               // The bubble slowly fades out.
               bubbleImg.style.opacity = newBubble.opacity;
               
               // The bubble color changes based on its hue.
               newBubble.changeColor();
               bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)";               
               
               // The bubble spins.
               newBubble.rotateBubble();
               bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";

               // The bubble moves and bounces around the container.
               newBubble.moveBubble(box.height, box.width);
               bubbleImg.style.top = newBubble.yPos + "px";
               bubbleImg.style.left = newBubble.xPos + "px";  
            }
         }, 25);
      }
   }, 500);

   /* This piece of code chooses a random number. That number associates with one of the images from the gallery and allows the code to pull that image into a bubble, to bounce around the container until fading away. */
   function randInt(minVal, maxVal) {
      var size = maxVal - minVal + 1;
      return Math.floor(minVal + size*Math.random());
   }  

});