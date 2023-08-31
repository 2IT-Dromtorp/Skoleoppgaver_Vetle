function OppgaveA(){
    let testOppgave1 = 8;
    console.log(testOppgave1);
    return(
        <>
            <h2>Oppgave A</h2>
            <p>For å gi variabelen "test" en verdi på 8 skriver du "let test = 8;", eller "const test = 8;". Denne variabelen er av datatypen integer.</p>
            {testOppgave1}
        </>
    )
}
function OppgaveB(){
    let testOppgave2 = "testverdi";
    console.log(testOppgave2);
    return(
        <>
            <h2>Oppgave B</h2>
            <p>For å gi variabelen "test" en verdi som "testverdi" skriver du "let test = 'testverdi';", eller "const test = 'testverdi';". Denne variabelen er av datatypen string</p>
            {testOppgave2}
        </>
    )
}
function OppgaveC(){
    let produkt = 2 * 3;
    console.log(produkt);
    return(
        <>
            <h2>Oppgave C</h2>
            <p>For å gi variabelen "produkt" en verdi som 2 * 3 skriver du "let product = 2 * 3;", eller "const produkt = 2 * 3;". Denne variabelen er av datatypen integer</p>
            {produkt}
        </>
    )
}
function OppgaveD(){
    let broek = 2 / 3;
    console.log(broek);
    return (
        <>
            <h2>Oppgave D</h2>
            <p>For å gi variabelen "broek" en verdi som 2 / 3 skriver du "let broek = 2 / 3;", eller "const broek = 2 / 3;". Denne variabelen er av datatypen float</p>
            {broek}
        </>
    )
}

export default function Oppgave1(){
    return(
        <>
            <h1>Oppgave 1</h1>
            <OppgaveA />
            <OppgaveB />
            <OppgaveC />
            <OppgaveD />
        </>
    )
}