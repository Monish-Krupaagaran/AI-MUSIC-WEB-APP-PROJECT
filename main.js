Harry_potter_song = ""
peter_pan_song =""
leftwristx = 0
leftwristy = 0
rightwristx = 0
rightwristy = 0
scorerightwrist = 0
song_harry_potter = 0
scoreleftwrist = 0
song_peter_pan = 0

function preload() {

   peter_pan_song = loadSound("music2.mp3")
   Harry_potter_song = loadSound("music.mp3")
}

function setup() {

    canvas = createCanvas(500,400)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    Posenet = ml5.poseNet(video, modelloaded)
    Posenet.on("pose",gotposes)
}

function modelloaded() {

    console.log("posenet is loaded")
}

function gotposes(result) {

    if(result.length>0) {

      console.log(result)
      leftwristx = result [0].pose.leftWrist.x
      rightwristx = result [0].pose.rightWrist.x
      leftwristy = result [0].pose.leftWrist.y
      rightwristy = result [0].pose.rightWrist.y

      scorerightwrist = result[0].pose.keypoints[10].score
      scoreleftwrist = result[0].pose.keypoints[9].score
    }
}

function draw() {
    image(video, 0, 0, 500,400)
    fill("red")
    stroke("red")

    song_peter_pan = peter_pan_song.isPlaying()
    song_harry_potter = harry_potter_song.isPlaying()

    if(scoreleftwrist > 0.2) {

        circle(leftwristx, leftwristy, 20)
        Harry_potter_song.stop()

        if(song_peter_pan == true) {
            peter_pan_song.play()
        }
        
        else{
            document.getElementById("song_name").innerHTML = "Song name: Peter pan song"
        }
       
    }

    if(scorerightwrist > 0.2) {

        circle(rightwristx, rightwristy, 20)
        peter_pan_song.stop()

        if(song_harry_potter == true) {
            harry_potter_song.play()
        }
        
        else{
            document.getElementById("song_name").innerHTML = "Song name: Harry Potter song"
        }
       
    }
}

   function stop() {


   }