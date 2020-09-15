// Our product database.
const sampleProducts = [
  {
    id: 1,
    name: "Orlando Florida Resort",
    category: "Familiares",
    price: 4000,
    description:
      "Viaje a Orlando Florida con la familia incluyendo lugares como DisneyLand y Universal Studios",
    popular: true,
    imageUrls: [
      "https://media-cdn.tripadvisor.com/media/photo-s/14/1f/c8/10/universal-studios-entrance.jpg",
      "https://www.telegraph.co.uk/content/dam/Travel/Destinations/North%20America/USA/Florida/downtown-orlando-guide-lead-xlarge.jpg"
    ]
  },
  {
    id: 2,
    name: "Paris",
    category: "Pareja",
    price: 3000,
    description:
      "una semana en paris con tour por los lugares mas famosos inclueyendo hospedaje",

    popular: true,
    imageUrls: [
      "https://www.turismoviajar.com/wp-content/uploads/2019/09/paris-2020.jpg",
      "https://www.ef.com/sitecore/__/~/media/universal/pg/8x5/destination/FR_00_PAR_1.jpg"
    ]
  }
];

// List of item categories.
const categories = [
  {
    name: "Todos los Paquetes",
    icon: "list"
  },
  {
    name: "Familiares",
    icon: "group"
  },
  {
    name: "Pareja",
    icon: "groupadd"
  },
  {
    name: "Compañeros",
    icon: "groupadd"
  },
  {
    name: "Solo",
    icon: "groupadd"
  }
];

// Data for rendering menu.
const dataForTheMenu = [
  { name: "Home page", url: "/", icon: "home", id: 0 },
  {
    name: "Product categories",
    id: 1,
    children: categories.map((x, i) => {
      return {
        name: x.name,
        id: i,
        url: "/?category=" + x.name,
        icon: x.icon
      };
    })
  }
];

export { sampleProducts, categories, dataForTheMenu };
