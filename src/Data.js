import {firestore} from "./firebaseConfig";
// Our product database.
const sampleProducts = setProducts();
const samplePromos = setPromos();
const sampleCarrousel = setCarrousel();

function setProducts(){
  var sample = [];
  firestore.collection('paquetes')
    .get()
    .then(
      snapshot=> {
        snapshot.forEach(doc=>{
          const data=doc.data()
          sample.push(data)
        })
      }
    ).catch(error=> console.log(error))
    return sample
}

function setCarrousel() {
  var sampledata = [];
  firestore.collection('carrousel')
    .get()
    .then(
      snapshot=> {
        snapshot.forEach(doc=>{
          const data=doc.data()
          sampledata.push(data)
        })
        console.log(sampledata)
      }
    ).catch(error=> console.log(error))
    return sampledata
}

function setPromos(){
  var sample = [];
  firestore.collection('promos')
    .get()
    .then(
      snapshot=> {
        snapshot.forEach(doc=>{
          const data=doc.data()
          sample.push(data)
        })
        console.log(sample)
      }
    ).catch(error=> console.log(error))
    return sample
}

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

export { sampleProducts, categories, dataForTheMenu, samplePromos, sampleCarrousel };
