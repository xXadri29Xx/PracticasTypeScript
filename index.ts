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


