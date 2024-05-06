function onThumbnailClick(event){
    document.body.classList.add('no-scroll');
    ricercaModal.style.top = window.pageYOffset + 'px';
    
    ricercaModal.classList.remove('hidden');
    
}

function hiddenOnClick(event){
    if(event.target.id == 'ricercaModal'){
        document.body.classList.remove('no-scroll');

        ricercaModal.classList.add('hidden');
    }
    
}

const barra = document.querySelector('#barra');
barra.addEventListener('click', onThumbnailClick);

const esci = document.querySelector('#ricercaModal');
esci.addEventListener('click', hiddenOnClick);

//-------------------mhw3------------------------

function onRespone(response){
    console.log(response .status);
    console.log('Risposta Arrivata');

    if(!response.ok){
        console.log('Risposta non Valida');
        return null;
    } else return response.json();
}

function onError(error){
    console.log('CODICE ERRORE ' + error);
}

function onJson(json){
    console.log(json);
    const contenitoreYT = document.querySelector('#youtube');

    json.items.forEach(element => {
        const titolo = document.createElement('h4');
        const link = document.createElement('a');

        link.href = "https://www.youtube.com/watch?v=" + element.snippet.resourceId.videoId.toString();
        const copertina = document.createElement('img');
        copertina.src = element.snippet.thumbnails.standard.url;
        link.append(titolo);
        link.append(copertina);
        titolo.textContent += element.snippet.title;
        link.classList.add('blocchiVideo');

        contenitoreYT.append(link);
    });
}

fetch("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=PL2dQ89LGNZVyUL87x797dBBsWVqMHzBSY&key=AIzaSyC5NBWBd2Q9jPgLo2xJPyeJdquk45MUAx8").then(onRespone, onError).then(onJson);


/////////////OAuth//////////////////////

function onResponse(response) {
  if (!response.ok) {
    console.log("Errore RESPONSE");
    return null;
  }

  return response.json();
}

const view = document.querySelector("#header_modal");

function onJson(json) {
  console.log("Json Ricevuto");
  console.log(json);
  view.innerHTML = "";

  let num_risultati = json.total;
  console.log(num_risultati);

  if (num_risultati == 0) {
    const errore = document.createElement("h1");
    const messaggio = document.createTextNode("Nessun Risultato!");
    view.appendChild(errore);
    view.appendChild(messaggio);
  }

  if (num_risultati > 10) num_risultati = 10;

  for (let i = 0; i < num_risultati; i++) {
    const prodotto = json.itemSummaries;
    prodotto.forEach((element) => {
      console.log("elemento" + i);
      const blocchetto_prod = document.createElement("div");
      blocchetto_prod.classList.add("prod_ricerca");
      const titolo = document.createElement("h4");
      titolo.textContent = element.title;
      blocchetto_prod.appendChild(titolo);
      const img_prod = document.createElement("img");
      img_prod.src = element.image.imageUrl;
      blocchetto_prod.appendChild(img_prod);
      const prezzo = document.createElement("span");
      prezzo.textContent = element.price.value + " " + element.price.currency;
      blocchetto_prod.appendChild(prezzo);
      view.appendChild(blocchetto_prod);
    });
  }
}

////////RICHIESTA TOKEN///////////////////
function onTokenResponse(response) {
  console.log("Ricevuto");
  if (!response.ok) {
    console.log("ERRORE RESPONSE");
    return null;
  }
  return response.json();
}

function onTokenJson(json) {
  token = json.access_token;
}
///////////////////////////////////////////////////////////////////////////////////////

function urlEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\(/g, "%29")
    .replace(/\*/g, "%2A");
}

function spaceSeparate(str) {
  return str.replace(/(%20)+/g, "");
}

function urlEncodeSpaceSeparate(str) {
  return spaceSeparate(urlEncode(str));
}

const scope = "https://api.ebay.com/oauth/api_scope";

/////////////////////////////////////////////////////////////////////////////////////////

const urlCors = "https://corsproxy.io/?";
const urlAPI = "https://api.ebay.com/buy/browse/v1/item_summary/search?";

const client_id = "lorenzop-mhw3-PRD-3b9438f0a-678a5075";
const client_secret = "PRD-b9438f0af062-b246-4d74-971e-04dc";
let token;

const url =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://api.ebay.com/identity/v1/oauth2/token");

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: "Basic " + btoa(client_id + ":" + client_secret),
  },
  body: "grant_type=client_credentials&scope=" + urlEncodeSpaceSeparate(scope),
})
  .then(onTokenResponse)
  .then(onTokenJson);

function search(event) {
  //impediamo il submit del form
  event.preventDefault();

  //leggi il valore del campo di input
  const content = document.querySelector("#content").value;

  //verifico che sia stato inserito del testo
  if (content) {
    const text = encodeURIComponent(content);
    console.log("Eseguo ricerca dei seguenti elementi: " + text);

    //leggiamo la categoria
    const categoria = document.querySelector("#categoria").value;
    console.log("Ricerco elementi con categoria: " + categoria);

    if (categoria === "Desktop PC") {
      //fetch()
      console.log(urlCors + urlAPI + "q=" + text + "category_ids=" + "179");
      url_richiesta =
        urlCors +
        encodeURIComponent(urlAPI + "q=" + text + "&category_ids=" + "179");
      console.log(url_richiesta);
      fetch(url_richiesta, {
        headers: {
          Authorization: "Bearer " + token,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_IT",
        },
      })
        .then(onResponse)
        .then(onJson);
    }

    if (categoria === "Schede video e grafiche") {
      url_richiesta =
        urlCors +
        encodeURIComponent(urlAPI + "q=" + text + "&category_ids=" + "27386");
      console.log(url_richiesta);
      fetch(url_richiesta, {
        headers: {
          Authorization: "Bearer " + token,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_IT",
        },
      })
        .then(onResponse)
        .then(onJson);
    }

    if (categoria === "Componenti e parti") {
      url_richiesta =
        urlCors +
        encodeURIComponent(urlAPI + "q=" + text + "&category_ids=" + "175673");
      console.log(url_richiesta);
      fetch(url_richiesta, {
        headers: {
          Authorization: "Bearer " + token,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_IT",
        },
      })
        .then(onResponse)
        .then(onJson);
    }

    if (categoria === "Notebook, laptop e portatili") {
      url_richiesta =
        urlCors +
        encodeURIComponent(urlAPI + "q=" + text + "&category_ids=" + "175672");
      console.log(url_richiesta);
      fetch(url_richiesta, {
        headers: {
          Authorization: "Bearer " + token,
          "X-EBAY-C-MARKETPLACE-ID": "EBAY_IT",
        },
      })
        .then(onResponse)
        .then(onJson);
    }
  }
}

function apriModale(event) {
  const image = document.createElement("img");
  //associo l'attributo src all'elemento cliccato
  image.src = event.currentTarget.src;

  modale.appendChild(image);

  modale.classList.remove("hidden");

  document.body.classList.add("no-scroll");
}

function chiudiModale(event) {
  console.log(event);
  if (event.key === "Escape") {
    console.log(modale);
    modale.classList.add("hidden");

    document.body.classList.remove("no_scroll");
  }
}

//listener per il form
const form = document.querySelector("#ricerca_prod");
form.addEventListener("submit", search);
//pulsante chiusura modale
const modale = document.querySelector("#modale");
window.addEventListener("keydown", chiudiModale);
