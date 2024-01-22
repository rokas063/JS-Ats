// Klasė Marsrutas su funkcija
class Marsrutas {
  constructor(
    pavadinimas,
    isvykimoDataLaikas,
    trukmeDienomis = 0,
    trukmeValandomis = 0,
    trukmeMinutemis = 0
  ) {
    // Nustatome kintamuosius
    this.pavadinimas = pavadinimas;
    this.isvykimoDataLaikas = isvykimoDataLaikas;
    // Trukmės apskaičiavimas
    this.trukmeDienomis = trukmeDienomis;
    this.trukmeValandomis = trukmeValandomis;
    this.trukmeMinutemis = trukmeMinutemis;

    // Apskaičiuojame trukmę minutėmis
    this.trukme = this.skaiciuotiTrukme(
      trukmeDienomis,
      trukmeValandomis,
      trukmeMinutemis
    );

    this.atvykimoLaikas = this.skaiciuotiAtvykimoLaika();
    this.atvykimoDataLaikas = this.sukurtiAtvykimoDataLaika();
  }

  // Apskaičiuojama ir gražinama trukmė
  skaiciuotiTrukme(dienos, valandos, minutes) {
    valandos = Math.min(valandos, 23);
    minutes = Math.min(minutes, 59);

    return dienos * 24 * 60 + valandos * 60 + minutes;
  }

  // Apskaičiuojamas ir gražinamas atvykimo laikas
  skaiciuotiAtvykimoLaika() {
    const isvykimoLaikas = new Date(this.isvykimoDataLaikas);
    const atvykimoLaikas = new Date(
      isvykimoLaikas.getTime() + this.trukme * 60 * 1000
    );
    return atvykimoLaikas;
  }

  // Sukuriama ir gražinama atvykimo data ir laikas
  sukurtiAtvykimoDataLaika() {
    const atvykimoLaikas = this.skaiciuotiAtvykimoLaika();
    return atvykimoLaikas.toLocaleString();
  }

  // Funkcija gražina informaciją apie datą ir atvykimo laiką
  informacijaApieAtvykima() {
    const atvykimoLaikas = this.skaiciuotiAtvykimoLaika();
    return {
      data: atvykimoLaikas.toLocaleDateString(),
      laikas: atvykimoLaikas.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  // Funkcija suranda trumpiausią maršrutą pagal dienas ir jį gražina
  static rastiTrumpiausiaKelionePagalDienas(marsrutai) {
    return marsrutai.reduce(
      (min, marsrutas) =>
        marsrutas.trukmeDienomis < min.trukmeDienomis ? marsrutas : min,
      marsrutai[0]
    );
  }

  // Funkcija suranda ilgiausią kelionę pagal dienas ir ją gražina
  static rastiIlgiausiaKelionePagalDienas(marsrutai) {
    return marsrutai.reduce(
      (max, marsrutas) =>
        marsrutas.trukmeDienomis > max.trukmeDienomis ? marsrutas : max,
      marsrutai[0]
    );
  }

  // Funkcija suranda ilgiausią kelionę pagal valandas ir ją gražina
  static rastiIlgiausiaKelionePagalValandas(marsrutai) {
    return marsrutai.reduce((max, marsrutas) => {
      const maxTrukme = max.trukmeValandomis * 60 + max.trukmeMinutemis;
      const currentTrukme =
        marsrutas.trukmeValandomis * 60 + marsrutas.trukmeMinutemis;

      return currentTrukme > maxTrukme ? marsrutas : max;
    }, marsrutai[0]);
  }
}

// Maršrutai
const marsrutai = [
  new Marsrutas("Vilnius - Kaunas", "2024-01-22 13:45", 0, 1, 30),
  new Marsrutas("Vilnius - Varšuva", "2024-01-22 10:30", 0, 8, 15),
  new Marsrutas("Vilnius - Klaipėda", "2024-01-22 15:30", 0, 4, 20),
  new Marsrutas("Vilnius - Talinas", "2024-01-22 9:25", 1, 1, 10),
  new Marsrutas("Vilnius - Šiauliai", "2024-01-22 17:30", 0, 2, 20),
];

// Testuojame funkcijas
const trumpiausiaKelionePagalDienas =
  Marsrutas.rastiTrumpiausiaKelionePagalDienas(marsrutai);
const ilgiausiaKelionePagalDienas =
  Marsrutas.rastiIlgiausiaKelionePagalDienas(marsrutai);
const ilgiausiaKelionePagalValandas =
  Marsrutas.rastiIlgiausiaKelionePagalValandas(marsrutai);

// Atspausdiname rezultatus su papildoma informacija
console.log("Trumpiausia kelionė pagal dienas:");
console.log("Pavadinimas:", trumpiausiaKelionePagalDienas.pavadinimas);
console.log(
  "Išvykimo data ir laikas:",
  trumpiausiaKelionePagalDienas.isvykimoDataLaikas
);
const trukmeValandomisDienomis = Math.floor(
  trumpiausiaKelionePagalDienas.trukme / 60
);
const trukmeMinutemisDienomis = trumpiausiaKelionePagalDienas.trukme % 60;
console.log(
  "Kelionės trukmė (valandomis + minutėmis):",
  `${trukmeValandomisDienomis} valandos ${trukmeMinutemisDienomis} minutės`
);

console.log(
  "Atvykimo laikas:",
  trumpiausiaKelionePagalDienas.atvykimoLaikas.toLocaleString()
);
console.log();

console.log("Ilgiausia kelionė pagal dienas:");
console.log("Pavadinimas:", ilgiausiaKelionePagalDienas.pavadinimas);
console.log(
  "Išvykimo data ir laikas:",
  ilgiausiaKelionePagalDienas.isvykimoDataLaikas
);

const trukmeValandomisDienomisIlgiausia = Math.floor(
  ilgiausiaKelionePagalDienas.trukme / 60
);
const trukmeMinutemisDienomisIlgiausia =
  ilgiausiaKelionePagalDienas.trukme % 60;
console.log(
  "Kelionės trukmė (valandomis + minutėmis):",
  `${trukmeValandomisDienomisIlgiausia} valandos ${trukmeMinutemisDienomisIlgiausia} minutės`
);
console.log(
  "Atvykimo laikas:",
  ilgiausiaKelionePagalDienas.atvykimoLaikas.toLocaleString()
);
console.log();

console.log("Ilgiausia kelionė pagal valandas:");
console.log("Pavadinimas:", ilgiausiaKelionePagalValandas.pavadinimas);
console.log(
  "Išvykimo data ir laikas:",
  ilgiausiaKelionePagalValandas.isvykimoDataLaikas
);

const trukmeValandomisIlgiausia = Math.floor(
  ilgiausiaKelionePagalValandas.trukme / 60
);
const trukmeMinutemisIlgiausia = ilgiausiaKelionePagalValandas.trukme % 60;
console.log(
  "Kelionės trukmė (valandomis + minutėmis):",
  `${trukmeValandomisIlgiausia} valandos ${trukmeMinutemisIlgiausia} minutės`
);

console.log(
  "Atvykimo laikas:",
  ilgiausiaKelionePagalValandas.atvykimoLaikas.toLocaleString()
);
console.log();
