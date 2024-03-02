# Quiz

Dette er en quiz app laget i React.

## Innholdsfortegnelse

1. [Installasjon](#installasjon)
2. [For utviklere](#for-utviklere)
    1. [Databasen](#databasen)
    2. [Viktig kode](#viktig-kode)
3. [Pakker brukt](#pakker-brukt)
4. [Script](#script)
5. [Endepunkter](#endepunkter)
6. [Samarbeidspartnere](#samarbeidspartnere)
7. [Lisens](#lisens)

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

brukere sine dokumenter ser slik ut:

```ts
{
    _id: ObjectID, // En id satt av MongoDB automatisk
    name: string, // Navnet på spilleren
    points: number // Hvor mange poeng spilleren har
}
```

questions sine dokumenter ser slik ut

```ts
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

**Front-end**

```js
async function nextQuestion() {
    socket.emit("done answering");
    const clientAnswer: boolean = correctAnswerRef.current;
    const clientName: string = nameRef.current;
    const clientTimer: NodeJS.Timeout | undefined = timerRef.current;

    clearInterval(clientTimer);

    if (clientAnswer) {
        await axios.post("/api/point", { value: 1, name: clientName });
    } else {
        await axios.post("/api/point", { value: -1, name: clientName });
    }

    setTimeout(() => {
        setName("");
        setAnswer("");
        setCorrectAnswer(false);
        correctAnswerRef.current = false;
        getLeaderboard();
        axios.get("/api/question").then((res) => {
            currentQuestion.current = res.data.question;
            handleQuestion();
            setSeconds(15);
        });
    }, 5000);
}
```

Sender en varsling til brukeren som gjør at brukeren ikke lenger kan svare. Den finner ut hvilken bruker som svarte, og om brukeren hadde rett. Den fjerner tiemren. Den oppdaterer brukerens dokument i databasen. Den venter i 5 sekunder før den godtar en ny bruker og henter et nytt spørsmål.

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

***get /host*** sender siden verten skal bruke på skjermen  
***get /answer/:name*** sender tilbake siden som brukes av deltakerne når de skal svare  
***get /create*** sender tilbake siden som brukes til å lage nye spørsmål  
***get /api/question*** sender tilbake et nytt spørsmål av variabelen remainingQuestions  
***post /api/point*** oppdaterer poengsummen til en spiller basert på navnet og verdien sendt inn. Lager en ny bruker i databasen dersom de ikke finnes  
***post /api/createQuestion*** legger til et spørsmål baset på verdiene sendt inn  
***get /api/leaderboard*** sender tilbake en liste over alle spillerne i synkende rekkefølge etter poeng

## Samarbeidspartnere

| Person | Lenke                                                 |
| ------ | ----------------------------------------------------- |
| Matheo | https://github.com/2ITB-Dromtorp/Skoleoppgaver_Matheo |

## Lisens

MIT license
