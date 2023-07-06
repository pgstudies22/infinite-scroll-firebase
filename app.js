import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit, startAfter } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyDhINjnYYu6XC775rnxZPvxCC10nhcVyiM",
  authDomain: "infinite-scroll-test-3e3bb.firebaseapp.com",
  projectId: "infinite-scroll-test-3e3bb",
  storageBucket: "infinite-scroll-test-3e3bb.appspot.com",
  messagingSenderId: "418120327432",
  appId: "1:418120327432:web:f9e135b305b3e5317a4cbd",
  measurementId: "G-X45WSWQD8K"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const productListContainer = document.querySelector('[data-js="products-list"]')
const readMoreProductsButton = document.querySelector('[data-js="load-more"]')

const readMoreProducts = async () => {
  const first = query(collection(db, 'products'), orderBy('price', 'asc'), limit(3)) 
  const documentSnapshots = await getDocs(first)

  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

  const next = query(collection(db, "cities"),
    orderBy("price"),
    startAfter(lastVisible),
    limit(3));

    const productsCards = documentSnapshots.docs.reduce((acc, doc) => {
      acc += `
        <div class="card">
          <img src="${doc.data().image}" alt="">
          <div class="card-info">
            <h4 class="card-title">${doc.data().category}</h4>
            <h2 class="card-price">R$ ${doc.data().price}</h2>
          </div>
        </div>
      `
  
      return acc
    }, '')

    productListContainer.innerHTML += productsCards
}

document.addEventListener('DOMContentLoaded', readMoreProducts)
readMoreProductsButton.addEventListener('click', readMoreProducts)