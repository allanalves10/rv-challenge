let valueSunlight;
let valueWater;
let valuePets;

async function filterPlants(paramsFilter) {
    const { sun, water, pets } = paramsFilter;
    
    try {
        const response = await fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`)
        const plants = await response.json();
        
        const results = document.getElementById('resultsList');
        const noResults = document.getElementById('noResults');

        if (plants.length > 0) {
            if (noResults && noResults.parentNode) {
                noResults.parentNode.removeChild(noResults);
            }
        }

        if (plants.length === 0) {
            return results.parentNode.removeChild(results)
        }

        results.innerHTML = plants.map(plant => {
            return(`<li data-id="${plant.id}">
            <img src="${plant.url}" alt=${plant.name}" />
            <span>${plant.name}</span>
            <span>$${plant.price}</span>  
            </li>
            `)
        });
    } catch (err) {
        console.error(err);
    }
}

function verifyParams() {
    if (valueSunlight && valueWater && valuePets) {
        filterPlants({sun: valueSunlight, water: valueWater, pets: valuePets})
    } else {
        //toast by error
    }
}

const sunlightSelect = document.getElementById('sunlight');
sunlightSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        valueSunlight = e.target.value;
        verifyParams();
    }
});

const waterSelect = document.getElementById('water');
waterSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        valueWater = e.target.value;
        verifyParams();
    }
});

const petsSelect = document.getElementById('pets');
petsSelect.addEventListener('change', (e) => {
    if (e.target.value) {
        valuePets = e.target.value;
        verifyParams();
    }
})