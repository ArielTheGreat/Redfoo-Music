var arrayAudio = [];
function inicio()
{
    document.body.style.textAlign="center";
    document.body.style.backgroundColor="black";
    var imgIcon = document.createElement("img");
    imgIcon.src="./images/Redfoo.webp";
    var icon = document.createElement("div");
    icon.appendChild(imgIcon);

    var musicas = document.createElement("div");
    musicas.style.textAlign="center";
    musicas.style.marginTop="3rem";
    musicas.style.display="block";
    const url = "./datos.json";
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType="json";
    request.send();
    
    request.onload=function()
    {
        console.log(request.response);
        var arrayMusica = request.response;
        var arrayInformacion = ["Duracion","Tiempo",""];
        for(var x = 0;x < 6;x++)
        {
            var cajaMusica = document.createElement("div");
            cajaMusica.style.display="block";
            cajaMusica.style.margin="1rem auto";
            cajaMusica.style.padding="15px";
            cajaMusica.style.cursor="pointer";
            cajaMusica.style.fontSize="2rem";
            cajaMusica.style.width="50%";
            cajaMusica.style.backgroundColor="silver";
            if(x < arrayMusica.length)
            {
            cajaMusica.src=arrayMusica[x].src;
            cajaMusica.id = cajaMusica+"x";
            cajaMusica.numero = x;
            var audio = new Audio(arrayMusica[x].src);
            arrayAudio.push(audio);
            cajaMusica.innerHTML=arrayMusica[x].songName;
            cajaMusica.addEventListener("click",escuchar);
            }else{
                cajaMusica.innerHTML=arrayInformacion[x-3];
                cajaMusica.id="informacion"+(x-3);
            }
            if(x == 5)
            {
                cajaMusica.style.height="3rem";
                cajaMusica.style.border="3px solid #df74c6";
            }
            musicas.appendChild(cajaMusica);
        }
    }

    document.body.appendChild(icon);
    document.body.appendChild(musicas);

}

function escuchar()
{
    var ids = [0,1,2];
    var index = ids.indexOf(this.numero);
    if (index > -1) {
    ids.splice(index, 1);
    }
    arrayAudio[ids[0]].pause();
    arrayAudio[ids[1]].pause();
    arrayAudio[this.numero].play();
    var minutes = parseInt(arrayAudio[this.numero].duration / 60, 10);
    var seconds = parseInt(arrayAudio[this.numero].duration % 60);
    
    var duracion = document.getElementById("informacion0");
    duracion.innerHTML=minutes + ":" + seconds;

    arrayAudio[this.numero].addEventListener("timeupdate",function()
    {
        console.log("hello");
        var mins = Math.floor(this.currentTime / 60);
    if (mins < 10) {
      mins = '0' + String(mins);
    }
    var secs = Math.floor(this.currentTime % 60);
    if (secs < 10) {
      secs = '0' + String(secs);
    }
    var tiempo = document.getElementById("informacion1");
	tiempo.innerHTML = mins + ':' + secs;

    var barraProgreso = document.getElementById("informacion2");
    barraProgreso.attr("value", this.currentTime / this.duration);
    });
    

}
window.onload = inicio();