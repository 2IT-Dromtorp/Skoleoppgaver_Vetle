function FrontPage() {
    return(
        <div className="flex flex-col items-center">
            <h1 className="font-extrabold text-4xl text-gray-800">VTH feilmeldingssenter</h1>
            <h2 className="mt-8 font-bold text-2xl text-gray-800">Opprett en feilmelding</h2>
            <p className="w-1/2">Dersom du finner et problem med en av våre tjenester, setter vi pris på om du melder ifra om dette. For å gjøre dette, gå inn på "Opprett en feilemlding" øverst i høyre hjørne, og skriv inn relevant informasjon i boksene, trykk deretter på send inn.</p>
            <h2 className="mt-8 font-bold text-2xl text-gray-800">Se gjennom feilmeldinger</h2>
            <p className="w-1/2">Dersom du trenger å se på opprettede feilmeldinger, trykk på "Se gjennom feilmeldinger" knappen ved siden av "Opprett en feilmelding" knappen. Der kan du se en liste over opprettede feilmeldinger, du kan trykk på fullfør for å vise at feilmeldingen er løst. Løste feilmeldinger vil ha en grønn boks isteden for en fullfør knapp.</p>
            <p className="w-1/2 mt-12 font-semibold text-lg text-center">Takk for hjelpen!</p>
        </div>
    )
}

export default FrontPage;