// Service pour communiquer avec la base de données (Supabase viendra remplacer ceci)
// Version temporaire avec données locales

// Import des images des héros
import spiderManImg from '@/assets/spider-man.jpg';
import ironManImg from '@/assets/iron-man.jpg';
import captainAmericaImg from '@/assets/captain-america.jpg';
import blackWidowImg from '@/assets/black-widow.jpg';
import blackPantherImg from '@/assets/black-panther.jpg';
import doctorStrangeImg from '@/assets/doctor-strange.jpg';
import scarletWitchImg from '@/assets/scarlet-witch.jpg';
import hulkImg from '@/assets/hulk.jpg';

export interface Hero {
  id: number;
  name: string;
  realName: string;
  universe: string;
  image?: string;
  powers?: string[];
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Données initiales (les 8 héros Marvel demandés)
let heroesData: Hero[] = [
  {
    id: 1,
    name: "Spider-Man",
    realName: "Peter Parker",
    universe: "Earth-616",
    image: spiderManImg,
    powers: ["Super force", "Agilité", "Sens d'araignée", "Adhésion murale"],
    description: "Jeune héros de New York qui a obtenu ses pouvoirs d'une morsure d'araignée radioactive."
  },
  {
    id: 2,
    name: "Iron Man",
    realName: "Tony Stark",
    universe: "Earth-616",
    image: ironManImg,
    powers: ["Genius intellect", "Technologie avancée", "Armure high-tech"],
    description: "Milliardaire, playboy, philanthrope et génie technologique."
  },
  {
    id: 3,
    name: "Captain America",
    realName: "Steve Rogers",
    universe: "Earth-616",
    image: captainAmericaImg,
    powers: ["Super force", "Agilité", "Endurance", "Bouclier vibranium"],
    description: "Super-soldat américain de la Seconde Guerre mondiale."
  },
  {
    id: 4,
    name: "Black Widow",
    realName: "Natasha Romanoff",
    universe: "Earth-616",
    image: blackWidowImg,
    powers: ["Arts martiaux", "Espionnage", "Armes high-tech"],
    description: "Ancienne espionne russe devenue agent du SHIELD."
  },
  {
    id: 5,
    name: "Black Panther",
    realName: "T'Challa",
    universe: "Earth-616",
    image: blackPantherImg,
    powers: ["Force surhumaine", "Agilité", "Vibranium", "Sens aiguisés"],
    description: "Roi du Wakanda et protecteur du vibranium."
  },
  {
    id: 6,
    name: "Doctor Strange",
    realName: "Stephen Strange",
    universe: "Earth-616",
    image: doctorStrangeImg,
    powers: ["Arts mystiques", "Magie", "Manipulation du temps"],
    description: "Maître des arts mystiques et Sorcier Suprême."
  },
  {
    id: 7,
    name: "Scarlet Witch",
    realName: "Wanda Maximoff",
    universe: "Earth-616",
    image: scarletWitchImg,
    powers: ["Magie du chaos", "Télékinésie", "Manipulation de la réalité"],
    description: "Mutante puissante avec des pouvoirs magiques."
  },
  {
    id: 8,
    name: "Hulk",
    realName: "Bruce Banner",
    universe: "Earth-616",
    image: hulkImg,
    powers: ["Force illimitée", "Régénération", "Invulnérabilité"],
    description: "Scientifique transformé en créature verte surpuissante."
  }
];

let nextId = 9;

// Simuler une requête async
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// GET - Récupérer tous les héros
export const fetchHeroes = async (): Promise<Hero[]> => {
  await delay(500); // Simule la latence réseau
  return [...heroesData];
};

// POST - Ajouter un nouveau héros
export const addHero = async (heroData: Omit<Hero, 'id' | 'created_at' | 'updated_at'>): Promise<Hero> => {
  await delay(300);
  const newHero: Hero = {
    ...heroData,
    id: nextId++,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  heroesData.unshift(newHero);
  return newHero;
};

// PUT - Mettre à jour un héros
export const updateHero = async (id: number, heroData: Partial<Hero>): Promise<Hero> => {
  await delay(300);
  const index = heroesData.findIndex(hero => hero.id === id);
  if (index === -1) throw new Error('Héros non trouvé');
  
  heroesData[index] = {
    ...heroesData[index],
    ...heroData,
    updated_at: new Date().toISOString()
  };
  return heroesData[index];
};

// DELETE - Supprimer un héros
export const deleteHero = async (id: number): Promise<void> => {
  await delay(200);
  const index = heroesData.findIndex(hero => hero.id === id);
  if (index === -1) throw new Error('Héros non trouvé');
  
  heroesData.splice(index, 1);
};

// Recherche de héros
export const searchHeroes = async (query: string): Promise<Hero[]> => {
  await delay(300);
  const lowercaseQuery = query.toLowerCase();
  return heroesData.filter(hero => 
    hero.name.toLowerCase().includes(lowercaseQuery) ||
    hero.realName.toLowerCase().includes(lowercaseQuery) ||
    hero.universe.toLowerCase().includes(lowercaseQuery)
  );
};

// Filtrer les héros par univers
export const filterHeroesByUniverse = async (universe: string): Promise<Hero[]> => {
  await delay(200);
  return heroesData.filter(hero => hero.universe === universe);
};