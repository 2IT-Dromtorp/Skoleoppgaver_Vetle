# Quiz

Dette er en quiz app laget i React.

## Installasjon

Denne appen ble installert av Vite med React TypeScript

```bash
npm create vite@latest server -- --template react-ts
```

Å lage appen med Vite gjør at det går raskere å bygge appen, mot at den er strengere på hva som er lov

## For utviklere

### Databasen

**Denne appen bruker MongoDB**

Databasen heter: questions_db

Databasen har to collections: brukere og questions

Brukere sine dokumenter ser slik ut:

```json
{
    _id: ObjectID, // En id satt av MongoDB automatisk
    name: string, // Navnet på spilleren
    points: number // Hvor mange poeng spilleren har
}
```

Questions sine dokumenter ser slik ut

```json
{
    _id: ObjectID, // En id satt av MongoDB automatisk
    question: string, // Spørsmålet som stilles
    category: string, // Kategorien spørsmålet tilhører, brukes foreløpig ikke til noe
    answers: Array<string>, // Svarene som skal bli godtatt som korrekte
}
```

### Viktig kode

**Back-end**

```js
client.on("host", () => {
    if (host) return;
    host = client;
});
```

Skjer når noen går inn på **/host** endepunktet. Sjekker først om det allerede finne en host, og hvis det ikke gjør det, setter den variabelen host til seg selv.

**Back-end**

```js
client.on("client", (name) => {
    if (clientConnected || !host) {
        client.emit("too slow");
        return;
    }
    client.emit("answer");
    host.emit("client connected", name);
    clientConnected = true;
});
```

**Front-end**

```js
function onClient(clientName: string) {
    nameRef.current = clientName;
    clearInterval(questionTimerRef.current);
    setName(clientName);
    timer();
}
socket.on("client connected", onClient);
```

Skjer når noen går inn på **/answer/:name** endepunktet. Sjekker om det ikke finnes en host og om det allerede er en bruker som svarer. Dersom noen av disse er sanne får ikke brukeren lov til svare, ellers kan brukeren begynne å svare, og timeren starter.

**Front-end**

```js
useEffect(() => {
    currentQuestion.current.answers?.forEach((currentAnswer) => {
        if (answer.toLowerCase() === currentAnswer.toLowerCase()) {
            setCorrectAnswer(true);
            correctAnswerRef.current = true;
            nameRef.current = name;
            nextQuestion();
        }
    });
}, [answer, currentQuestion, name]);
```

Sjekker om det brukeren har skrevet inn er likt som noen av svar-alternativene, hver gang svaret oppdaterer seg. Hvis det stemmer går den til ett nytt spørsmål.

## Pakker brukt

| Pakke       | Lenke                                              |
| ----------- | -------------------------------------------------- |
| Express     | https://expressjs.com                              |
| MongoDB     | https://www.mongodb.com/docs/drivers/node/current/ |
| ReactJS     | https://react.dev                                  |
| Socket IO   | https://socket.io/docs/v4/                         |
| Axios       | https://axios-http.com                             |
| Tailwindcss | https://tailwindcss.com/docs/installation          |
| TypeScript  | https://www.typescriptlang.org/docs                |
| Vite        | https://vitejs.dev                                 |

## Script

| Script | Faktisk kommando  | Funksjonalitet                                                     |
| ------ | ----------------- | ------------------------------------------------------------------ |
| server | node index.js     | Starter serveren ved bruk av Node                                  |
| dev    | nodemon index.js  | Starter serveren ved bruk av Nodemon                               |
| build  | tsc && vite build | Gjør om React appen til en statisk nettside som brukes av serveren |

## Endepunkter

**get /host** sender siden verten skal bruke på skjermen  
**get /answer/:name** sender tilbake siden som brukes av deltakerne når de skal svare  
**get /create** sender tilbake siden som brukes til å lage nye spørsmål  
**get /api/question** sender tilbake et nytt spørsmål av variabelen remainingQuestions  
**post /api/point** oppdaterer poengsummen til en spiller basert på navnet og verdien sendt inn. Lager en ny bruker i databasen dersom de ikke finnes  
**post /api/createQuestion** legger til et spørsmål baset på verdiene sendt inn  
**get /api/leaderboard** sender tilbake en liste over alle spillerne i synkende rekkefølge etter poeng

## Samarbeidspartnere

| Person | Lenke                                                 |
| ------ | ----------------------------------------------------- |
| Matheo | https://github.com/2ITB-Dromtorp/Skoleoppgaver_Matheo |

## Lisens

MIT license
