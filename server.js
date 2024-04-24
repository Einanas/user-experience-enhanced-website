// Importeer het npm pakket express uit de node_modules map
import express, { application, json } from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

app.use(express.urlencoded({extended: true }))

// Stel het oba profile in
const apiData = 'https://fdnd-agency.directus.app/items/oba_profile'

// Stel het oba profile in
const apiFamily = 'https://fdnd-agency.directus.app/items/oba_family'

// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items/oba_item'

const apiItem = (apiUrl + 'oba_item')

// Array of object (ik weet niet specifiek welke) for POST om boeken op te slaan
let savedItems = [2, 3, 4, 5, 6, 20, 26, 31, 32];

// Home pagina
app.get('/', function(request, response) {
    console.log(savedItems)
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((items) => {
        response.render('index', {           
            items: items.data, /*hier zeg ik dat iedereen getoond moet worden*/
            savedItems: savedItems
        })
    });
})

// Boeken Pagina
app.get('/boeken', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item').then((itemsDataUitDeAPI) => {
        response.render('boeken', {
            
        })
    });
})

// Boeken ID (Pagina waar alle boeken zijn opgeslagen (zie het als favorieten lijst))
app.get('/boeken/:id', function(request, response) {
    fetchJson('https://fdnd-agency.directus.app/items/oba_item' + '?filter={"id":' + request.params.id + '}').then((itemsDataUitDeAPI) => {
        response.render('detail', {
            
        })
    });
})

// Maak een POST route voor de index
app.post('/boeken/:id', function(request, response) {
    // Voeg het nieuwe bericht toe aan de messages array
    savedItems.push(Number(request.params.id))
  
    // Redirect hierna naar de homepage
    response.redirect(303, '/')
  })
  
// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
});