function factorialRecursivo(n: number): number {
  if(n === 0 || n === 1){
    return 1;
  }
  return (n * factorialRecursivo(n-1));
}
 
const numero = 5;
const resultadoFactorial = factorialRecursivo(numero);
console.log(`El factorial de ${numero} es: ${resultadoFactorial}`); 


interface Pelicula {
  id: number;
  title: string;
  genre_ids: number[]; 
}
 

function agruparPeliculasPorGenero(peliculas: Pelicula[]): { [key: number]: string[] } {
  const resultado = peliculas.reduce((acumulador, pelicula) => {
    pelicula.genre_ids.forEach((generoId) => {
      if (!acumulador[generoId]) {
        acumulador[generoId] = [];
      }
      acumulador[generoId].push(pelicula.title);
    });
    return acumulador;
  }, {} as { [key: number]: string[] });
  return resultado;
}
 

const peliculasDePrueba = [
    { id: 1, title: "Película A", genre_ids: [28, 35] },
    { id: 2, title: "Película B", genre_ids: [10749] },
    { id: 3, title: "Película C", genre_ids: [28] }
];
 
const peliculasAgrupadas = agruparPeliculasPorGenero(peliculasDePrueba);
console.log(peliculasAgrupadas); 


async function obtenerTitulosDePosts(): Promise<string[]> {
    try{
        type Post = {
            userId: number;
            id: number;
            title: string;
            body: string;
        }
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const posts:Post[] = await response.json();
        const titulos: string[] = posts.map(posts => posts.title);
        return titulos;
    }
    catch(error){
        console.error(`Error al obtener los títulos (con async/await): ${error}`);
        return [];
    }
}

obtenerTitulosDePosts()
    .then(titulos => {
        console.log(`Títulos de los posts: ${titulos}`);
    })
    .catch(error => {
        console.error(`Error al obtener los títulos: ${error}`);
    });

async function ejecutarObtenerTitulos() {
    try {
        const titulos = await obtenerTitulosDePosts();
        console.log(`Títulos de los posts (con async/await): ${titulos}`);
    } catch (error) {
    console.error(`Error al obtener los títulos (con async/await): ${error}`);
    }
}

ejecutarObtenerTitulos();