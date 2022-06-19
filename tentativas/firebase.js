// Importar funÃ§Ãµes necessÃ¡rias de cada SDK.
/**
 * firebase-app.js - Script "pai" de onde Ã© importada a funÃ§Ã£o initializeApp.
 * Esta funÃ§Ã£o Ã© responsÃ¡vel pela ligaÃ§Ã£o da nossa app Ã  app Firebase.
 */
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";

/**
 * firebase-firestore.js - Script relativo apenas Ã  Firestore de onde sÃ£o
 * importadas as funÃ§Ãµes relativas Ã  base de dados.
 * NÃ£o esquecer da funÃ§Ã£o getFirestore.
 */
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  query,
  where,
  limit,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";

// ConfiguraÃ§Ã£o Firebase, obtida na consola.
const firebaseConfig = {
  apiKey: "AIzaSyAHFQv2Aoz-DCB9rd4eU6DnZ2BUlVPf898",
  authDomain: "schollex-c20c6.firebaseapp.com",
  projectId: "schollex-c20c6",
  storageBucket: "schollex-c20c6.appspot.com",
  messagingSenderId: "691896115943",
  appId: "1:691896115943:web:6f2364b17b695948abf842",
  measurementId: "G-6J8W865YWN"
};

// LigaÃ§Ã£o da nossa app Ã  app Firebase.
const app = initializeApp(config);

// LigaÃ§Ã£o Ã  base de dados.
const db = getFirestore(app);

// ReferÃªncia a uma coleÃ§Ã£o, na raÃ­z da base de dados, chamada "products".
const productsRef = collection(db, 'products');

// ReferÃªncia a um objeto, utilizando a referÃªncia da coleÃ§Ã£o criada na linha 48, chamado "product1".
const docRef = doc(productsRef, 'product1');

// ReferÃªncia ao mesmo documento referenciado na linha 51, de forma ligeiramente diferente.
const anotherDocRef = doc(db, 'products', 'product1');

// ObtenÃ§Ã£o de todos os documentos existentes na coleÃ§Ã£o "products".
getDocs(productsRef).then(arrayProducts => {
  // Sendo a funÃ§Ã£o getDocs, o resultado serÃ¡ um array, logo Ã© possÃ­vel iterar.
  arrayProducts.forEach(product => {
    // Para cada referÃªncia, queremos extrair os dados.
    console.log(product.data());
  });
});

// ObtenÃ§Ã£o apenas de um documento, utilizando a referÃªncia certa.
getDoc(anotherDocRef).then(product => {
  // Ã‰ possÃ­vel validar a existÃªncia do objeto.
  if (product.exists()) {
    // Sendo apenas um documento, podemos extrair logo os seus dados.
    console.log(product.data());
  } else {
    // Caso nÃ£o exista.
    console.log('Este produto nÃ£o existe.');
  }
});

// Adicionar um objeto Ã  coleÃ§Ã£o de products.
const newProduct = {
  name: 'New Product',
  price: 999
};

// FunÃ§Ã£o responsÃ¡vel por adicionar um documento.
// O primeiro parametro Ã© a referÃªncia Ã  coleÃ§Ã£o e o segundo o documento a adicionar.
// Nota: serÃ¡ atribuÃ­do um id aleatÃ³rio ao nome do documento na coleÃ§Ã£o.
addDoc(productsRef, newProduct);

// FunÃ§Ã£o responsÃ¡vel por editar ou adicionar um documento.
/**
 * Nota: uma vez que a referÃªncia tem a indicaÃ§Ã£o do nome do documento,
 * caso exista serÃ¡ uma ediÃ§Ã£o, caso nÃ£o, o documento serÃ¡ criado.
 */
let changes = {
  'category': 'IT'
};
// As configuraÃ§Ãµes permitem definir se Ã© suposto editar ou substituir o documento.
let configsSetDoc = {
  merge: true
};
setDoc(docRef, changes, configsSetDoc);

// FunÃ§Ã£o responsÃ¡vel por apagar um documento.
deleteDoc(anotherDocRef);

// Caso queiramos apagar apenas uma propriedade de um objeto.
updateDoc(anotherDocRef, {
  name: deleteField()
});

// Para a execuÃ§Ã£o de queries.
// DefiniÃ§Ã£o da clÃ¡usula where, a condiÃ§Ã£o para a query (pode ter diferentes operadores).
const whereClause = where('name', '==', 'New Product');
// ClÃ¡usula de ordenaÃ§Ã£o de resultados, opcional.
const orderClause = orderBy('name', 'desc');
// ClÃ¡usula de limitaÃ§Ã£o de resultados, opcional.
const limitClause = limit(2);
// ReferÃªncia Ã  query, com a indicaÃ§Ã£o da referÃªncia da coleÃ§Ã£o, condiÃ§Ã£o, order e limit.
const queryClause = query(productsRef, whereClause, orderClause, limitClause);

// ObtenÃ§Ã£o dos dados, utilizando a query como referÃªncia.
getDocs(queryClause).then(arrayProducts => {
  arrayProducts.forEach(product => {
    console.log(product.data());
  });
});

// FunÃ§Ã£o responsÃ¡vel por receber atualizaÃ§Ãµes em tempo real.
/**
 * Sempre que for guardada uma alteraÃ§Ã£o na coleÃ§Ã£o ou documento referenciado,
 * Ã© recebida a nova versÃ£o e executada a funÃ§Ã£o de callback.
 */
onSnapshot(docRef, (doc) => {
  // No caso de ser um documento, se fosse uma coleÃ§Ã£o, era necessÃ¡rio iterar.
  console.log(doc.data());
});
