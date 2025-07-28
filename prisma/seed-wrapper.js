// Ten plik jest w `prisma/`, więc ścieżki są prostsze.

// Rejestrujemy `ts-node` i `tsconfig-paths`, aby poprawnie obsługiwać
// aliasy ścieżek z tsconfig.json i importy plików TypeScript.
require('ts-node').register({
  // Wskazujemy na główny plik konfiguracyjny projektu
  project: 'tsconfig.json' 
});
require('tsconfig-paths').register();

// Po skonfigurowaniu środowiska, po prostu uruchamiamy nasz główny skrypt.
// `./` oznacza "w tym samym folderze".
require('./seed.ts'); 