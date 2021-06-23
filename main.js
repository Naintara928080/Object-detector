 img ="";
 status ="";
 objects = [];
function setup(){
    canvas = createCanvas(500,350);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500,350)
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    fill("#0000ff");
    document.getElementById("status").innerHTML="status : Detecting objects"

}
function preload(){
    img = loadImage("dog_cat.jpg");
}
function draw(){
    image(video,0,0,500,350);
    if (status !="" ){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
        for (i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "status : object Detected";
            document.getElementById("number_of_object").innerHTML = "number of objects detected are "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function modelLoaded(){
     console.log("modelLoaded");
     status=true;
      objectDetector.detect(video, gotResult);
}
function gotResult(error,results){
if (error) {
console.log(error);
}
console.log(results);
objects = results;
}