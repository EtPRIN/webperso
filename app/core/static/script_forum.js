function createMessagerie(){
    let contactLoaded="";
    let messageLoaded="";
    fetch('../GET/contacts/?format=json',{method:'GET'})
        .then(response => response.json()
        .then(data =>{
            for (let i of data){
                contactLoaded += "<div id=\"contact\" onclick=\"contactChoisi(this)\">"+i["nom"]+"</div>"
            }
            if(contacts.innerHTML!=contactLoaded){
                contacts.innerHTML=contactLoaded
            }
        }))
        .then(()=>{
            fetch('../GET/messages/?format=json',{method:'GET'})
                .then(response => response.json()
                .then(data =>{
                    for (let i of data){
                        if(i["auteur"]==contactActuel && i["destinataire"]==auteur)
                        {
                            messageLoaded += "<div id=\"messageRecu\">"+i["contenueMessage"]+"</div>"
                        }
                        if(i["auteur"]==auteur && i["destinataire"]==contactActuel)
                        {
                            messageLoaded += "<div id=\"messageEnvoye\">"+i["contenueMessage"]+"</div>"
                        }
                    }
                    if(messages.innerHTML!=messageLoaded){
                        console.log("print")
                        messages.innerHTML=messageLoaded
                    }
        }))
        })
    if (envoyeMessage){
        envoyeMessage=false;
        let Texte=document.getElementById('ecritureMessage')

        var payload = {
            contenueMessage : Texte.value,
            auteur : auteur,
            destinataire : contactActuel
        };
        
        //var data = new FormData();
        //data.append( "json", JSON.stringify( payload ) );
        console.log(JSON.stringify(payload))
        fetch("../POST/messages/",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(payload)
        }).then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('It s Error:', error);
        });
        //.then(function(res){ return res.json(); })
        //.then(function(data){ alert( JSON.stringify( data ) ) })

        console.log(Texte.value);
        Texte.value="";

    }
    console.log("run");
    //console.log(document.getElementById('ecritureMessage').value) récupère l'intérieur du texte area
}

function authentification(){
    contacts.innerHTML="<div id='contact'>entrer nom de profil puis appuyer sur entrée</div>";
    if (envoyeMessage){
        let Texte=document.getElementById('ecritureMessage')
        envoyeMessage=false;
        authentifier=true;
        auteur=Texte.value;
        auteur=auteur.slice(0,-1);
        console.log("auteur /"+auteur+"/");
        let alreadyCreated =false;
        fetch('../GET/contacts/?format=json',{method:'GET'})
        .then(response => response.json()
        .then(data =>{
            for (let i of data){
                console.log("/"+i["nom"]==auteur+"/")
                console.log("/"+i["nom"]+"/","/"+auteur+"/")
                if (i["nom"]===auteur){
                    alreadyCreated=true;
                }}
            console.log(alreadyCreated)
            if(!alreadyCreated){
                var payload = {
                    nom : auteur
                };
                console.log(JSON.stringify(payload));
                fetch("../POST/contacts/",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                }).then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('It s Error:', error);
                });
            }
        }))
    }
}

function messagerieInstantanée(){
    if (authentifier){
        createMessagerie();
    }else{
        authentification();
    }
}

function contactChoisi(elt){
    contactActuel=elt.innerHTML;
    destinataire.innerHTML="<p>"+contactActuel+"</p>";
}

let auteur=""
let contactActuel="";
let envoyeMessage=false;
let destinataire = document.querySelector("#destinataire");
let contacts = document.querySelector("#contacts")
let messages = document.querySelector("#messages")
let authentifier=false;
messagerieInstantanée()

setInterval(messagerieInstantanée, 1000);

document.addEventListener('keydown', function (e){
    if (e.keyCode == 13){
        envoyeMessage=true;
    }
    }, false
);