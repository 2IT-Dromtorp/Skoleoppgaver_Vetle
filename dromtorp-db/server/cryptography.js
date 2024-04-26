function sha512(input) {
    let hash = "";

    input.split("").forEach((char) => {
        hash += char.charCodeAt(0).toString(2);
    });

    if (hash.length > 2 ** 128 - 2) throw new Error("Password too large");

    let currValue = hash.length;
    let multipleOf = 1;
    while (currValue > 1024 - 128 - 1) {
        currValue -= 1024;
        multipleOf += 1;
    }

    const charactersLeft =
        1024 - 128 - (hash.length - 1024 * (multipleOf - 1)) - 1;

    hash += "1";

    for (let i = 0; i < charactersLeft; i++) {
        hash += "0";
    }

    let tmpBits = "";

    input.split("").forEach((char) => {
        tmpBits += char.charCodeAt(0).toString(2);
    });

    tmpBits = tmpBits.length.toString(2);

    const bitsLeft = 128 - tmpBits.length;

    for (let i = 0; i < bitsLeft; i++) {
        tmpBits = "0" + tmpBits;
    }

    hash += tmpBits;

    function rightRotate(word, n) {
        return (BigInt(word) >> n) | (BigInt(word) << (BigInt(64) - n));
    }
    function rightShift(word, n) {
        return BigInt(word) >> n;
    }
    function additionModulo(number1, number2) {
        const bigIntResult = number1 + number2;
        return BigInt(
            "0b" +
                bigIntResult
                    .toString(2)
                    .substring(bigIntResult.toString(2).length - 64)
        );
    }

    const rounds = [];

    const constants = [
        BigInt("0x428a2f98d728ae22"),
        BigInt("0x7137449123ef65cd"),
        BigInt("0xb5c0fbcfec4d3b2f"),
        BigInt("0xe9b5dba58189dbbc"),
        BigInt("0x3956c25bf348b538"),
        BigInt("0x59f111f1b605d019"),
        BigInt("0x923f82a4af194f9b"),
        BigInt("0xab1c5ed5da6d8118"),
        BigInt("0xd807aa98a3030242"),
        BigInt("0x12835b0145706fbe"),
        BigInt("0x243185be4ee4b28c"),
        BigInt("0x550c7dc3d5ffb4e2"),
        BigInt("0x72be5d74f27b896f"),
        BigInt("0x80deb1fe3b1696b1"),
        BigInt("0x9bdc06a725c71235"),
        BigInt("0xc19bf174cf692694"),
        BigInt("0xe49b69c19ef14ad2"),
        BigInt("0xefbe4786384f25e3"),
        BigInt("0x0fc19dc68b8cd5b5"),
        BigInt("0x240ca1cc77ac9c65"),
        BigInt("0x2de92c6f592b0275"),
        BigInt("0x4a7484aa6ea6e483"),
        BigInt("0x5cb0a9dcbd41fb44"),
        BigInt("0x76f988da831153b5"),
        BigInt("0x983e5152ee66dfab"),
        BigInt("0xa831c66d2db43210"),
        BigInt("0xb00327c898fb213f"),
        BigInt("0xbf597fc7beef0ee4"),
        BigInt("0xc6e00bf33da88fc2"),
        BigInt("0xd5a79147930aa725"),
        BigInt("0x06ca6351e003826f"),
        BigInt("0x142929670a0e6e70"),
        BigInt("0x27b70a8546d22ffc"),
        BigInt("0x2e1b21385c26c926"),
        BigInt("0x4d2c6dfc5ac42aed"),
        BigInt("0x53380d139d95b3df"),
        BigInt("0x650a73548baf63de"),
        BigInt("0x766a0abb3c77b2a8"),
        BigInt("0x81c2c92e47edaee6"),
        BigInt("0x92722c851482353b"),
        BigInt("0xa2bfe8a14cf10364"),
        BigInt("0xa81a664bbc423001"),
        BigInt("0xc24b8b70d0f89791"),
        BigInt("0xc76c51a30654be30"),
        BigInt("0xd192e819d6ef5218"),
        BigInt("0xd69906245565a910"),
        BigInt("0xf40e35855771202a"),
        BigInt("0x106aa07032bbd1b8"),
        BigInt("0x19a4c116b8d2d0c8"),
        BigInt("0x1e376c085141ab53"),
        BigInt("0x2748774cdf8eeb99"),
        BigInt("0x34b0bcb5e19b48a8"),
        BigInt("0x391c0cb3c5c95a63"),
        BigInt("0x4ed8aa4ae3418acb"),
        BigInt("0x5b9cca4f7763e373"),
        BigInt("0x682e6ff3d6b2b8a3"),
        BigInt("0x748f82ee5defb2fc"),
        BigInt("0x78a5636f43172f60"),
        BigInt("0x84c87814a1f0ab72"),
        BigInt("0x8cc702081a6439ec"),
        BigInt("0x90befffa23631e28"),
        BigInt("0xa4506cebde82bde9"),
        BigInt("0xbef9a3f7b2c67915"),
        BigInt("0xc67178f2e372532b"),
        BigInt("0xca273eceea26619c"),
        BigInt("0xd186b8c721c0c207"),
        BigInt("0xeada7dd6cde0eb1e"),
        BigInt("0xf57d4f7fee6ed178"),
        BigInt("0x06f067aa72176fba"),
        BigInt("0x0a637dc5a2c898a6"),
        BigInt("0x113f9804bef90dae"),
        BigInt("0x1b710b35131c471b"),
        BigInt("0x28db77f523047d84"),
        BigInt("0x32caab7b40c72493"),
        BigInt("0x3c9ebe0a15c9bebc"),
        BigInt("0x431d67c49c100d4c"),
        BigInt("0x4cc5d4becb3e42b6"),
        BigInt("0x597f299cfc657e2a"),
        BigInt("0x5fcb6fab3ad6faec"),
        BigInt("0x6c44198c4a475817"),
    ];

    let a = BigInt("0x6a09e667f3bcc908");
    let b = BigInt("0xbb67ae8584caa73b");
    let c = BigInt("0x3c6ef372fe94f82b");
    let d = BigInt("0xa54ff53a5f1d36f1");
    let e = BigInt("0x510e527fade682d1");
    let f = BigInt("0x9b05688c2b3e6c1f");
    let g = BigInt("0x1f83d9abfb41bd6b");
    let h = BigInt("0x5be0cd19137e2179");

    for (i = 0; i < hash.length / 1024; i++) {
        rounds.push(hash.substring(i * 1024, (i + 1) * 1024));
        const messageQueue = [];

        for (j = 0; j < 16; j++) {
            messageQueue.push("0b" + rounds[i].substring(j * 64, j * 64 + 64));
        }
        for (j = 16; j < 80; j++) {
            const a0 = additionModulo(
                rightShift(messageQueue[j - 2], 7n),
                additionModulo(
                    rightRotate(messageQueue[j - 2], 1n),
                    rightRotate(messageQueue[j - 2], 8n)
                )
            );
            const a1 = additionModulo(
                rightShift(messageQueue[j - 15], 6n),
                additionModulo(
                    rightRotate(messageQueue[j - 15], 19n),
                    rightRotate(messageQueue[j - 15], 61n)
                )
            );
            const message = (
                a0 +
                BigInt(messageQueue[j - 7]) +
                a1 +
                BigInt(messageQueue[j - 16])
            ).toString(2);

            messageQueue.push("0b" + message.substring(message.length - 64));
            continue;
        }
        for (j = 0; j < messageQueue.length; j++) {
            const h0 = a;
            const h1 = b;
            const h2 = c;
            const h3 = d;
            const h4 = e;
            const h5 = f;
            const h6 = g;
            const h7 = h;

            const ch = (e & f) ^ (~e & g);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const sigmaA = (a >> 2n) ^ (a >> 13n) ^ (a >> 22n);
            const sigmaE = (e >> 6n) ^ (e >> 11n) ^ (e >> 25n);

            const finalH = additionModulo(
                additionModulo(
                    additionModulo(additionModulo(ch, h7), sigmaE),
                    BigInt(messageQueue[j])
                ),
                constants[i]
            );

            a = additionModulo(additionModulo(sigmaA, maj), finalH);
            b = h0;
            c = h1;
            d = h2;
            e = additionModulo(h3, finalH);
            f = h4;
            g = h5;
            h = h6;

            continue;
        }
    }

    hash =
        a.toString(16) +
        b.toString(16) +
        c.toString(16) +
        d.toString(16) +
        e.toString(16) +
        f.toString(16) +
        g.toString(16) +
        h.toString(16);
    return hash;
}

module.exports = { sha512 };
