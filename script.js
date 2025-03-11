// Initialize the map with the new center coordinates
const map = L.map('map').setView([48.714242, 2.202518], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Sample sports locations data
const sportsLocations = [
    {
        id: 1,
        name: "Parc des Princes",
        sport: "football",
        position: [48.8414, 2.2530],
        description: "Home stadium of Paris Saint-Germain, with a capacity of 47,929 spectators.",
        amenities: ["Stadium seating", "Concessions", "Team shop"]
    },
    {
        id: 2,
        name: "Stade Roland Garros",
        sport: "tennis",
        position: [48.8471, 2.2526],
        description: "Famous tennis complex hosting the French Open Grand Slam tournament.",
        amenities: ["Multiple courts", "Training facilities", "Museum"]
    },
    {
        id: 3,
        name: "Bercy Arena",
        sport: "basketball",
        position: [48.8387, 2.3786],
        description: "Multi-purpose indoor arena that hosts basketball games and other events.",
        amenities: ["Indoor courts", "VIP boxes", "Food court"]
    },
    {
        id: 4,
        name: "Piscine Georges Vallerey",
        sport: "swimming",
        position: [48.8746, 2.4080],
        description: "Olympic swimming pool built for the 1924 Summer Olympics.",
        amenities: ["Olympic-sized pool", "Diving platforms", "Training lanes"]
    },
    {
        id: 5,
        name: "Golf de Paris",
        sport: "golf",
        position: [48.8583, 2.2944],
        description: "Beautiful golf course in the heart of Paris with stunning views.",
        amenities: ["18-hole course", "Driving range", "Pro shop"]
    },
    {
        id: 6,
        name: "Stade Jean-Bouin",
        sport: "football",
        position: [48.8431, 2.2533],
        description: "Multi-use stadium primarily used for rugby and football matches.",
        amenities: ["Modern facilities", "Training fields", "Fan shop"]
    },
    {
        id: 7,
        name: "Tennis Club de Paris",
        sport: "tennis",
        position: [48.8610, 2.2736],
        description: "Prestigious tennis club with multiple courts and training facilities.",
        amenities: ["Clay courts", "Hard courts", "Tennis lessons"]
    },
    {
        id: 8,
        name: "Hoops Factory",
        sport: "basketball",
        position: [48.8952, 2.3853],
        description: "Modern basketball facility with multiple courts for all levels.",
        amenities: ["Indoor courts", "Training programs", "Cafe"]
    },
    {
        id: 9,
        name: "Piscine Joséphine Baker",
        sport: "swimming",
        position: [48.8462, 2.3664],
        description: "Floating swimming pool on the Seine river.",
        amenities: ["Heated pool", "Floating deck", "Sauna"]
    },
    {
        id: 10,
        name: "Golf National",
        sport: "golf",
        position: [48.7553, 2.0327],
        description: "Home of the 2018 Ryder Cup and the golf events of the 2024 Summer Olympics.",
        amenities: ["Championship course", "Practice areas", "Clubhouse"]
    },
    {
        id: 11,
        name: "Forêt Domaniale de Meudon - Running Trail",
        sport: "running",
        position: [48.7983, 2.2335],
        description: "Beautiful forest trails perfect for running with varied terrain.",
        amenities: ["Marked trails", "Scenic views", "Natural terrain"]
    },
    {
        id: 12,
        name: "Parc de Sceaux - Running Track",
        sport: "running",
        position: [48.7705, 2.2997],
        description: "Well-maintained park with dedicated running paths and beautiful gardens.",
        amenities: ["Flat paths", "Distance markers", "Water fountains"]
    },
    {
        id: 13,
        name: "Coulée Verte du Sud Parisien",
        sport: "running",
        position: [48.7612, 2.2881],
        description: "Green corridor perfect for long-distance running away from traffic.",
        amenities: ["Linear path", "Urban greenway", "Multiple access points"]
    },
    {
        id: 14,
        name: "Parc de la Vallée aux Loups",
        sport: "running",
        position: [48.7754, 2.2681],
        description: "Peaceful park with trails through arboretum and gardens.",
        amenities: ["Varied terrain", "Quiet atmosphere", "Natural setting"]
    }
];

// Running heatmap data - represents popular running routes/areas (points along trails with intensity)
const runningHeatData = [
    // Forêt Domaniale de Meudon area
    [48.7983, 2.2335, 0.8], // Main trail point
    [48.7965, 2.2315, 0.7],
    [48.7970, 2.2360, 0.9],
    [48.7990, 2.2380, 0.6],
    [48.8005, 2.2345, 0.8],
    [48.7997, 2.2305, 0.7],
    [48.7975, 2.2290, 0.5],
    [48.7945, 2.2330, 0.6],
    [48.7950, 2.2375, 0.7],
    // Parc de Sceaux area
    [48.7705, 2.2997, 0.9], // Main point
    [48.7720, 2.3015, 0.8],
    [48.7735, 2.3030, 0.7],
    [48.7690, 2.3010, 0.8],
    [48.7675, 2.2980, 0.7],
    [48.7710, 2.2960, 0.6],
    [48.7740, 2.2970, 0.5],
    // Coulée Verte area
    [48.7612, 2.2881, 0.8], // Main point
    [48.7625, 2.2890, 0.7],
    [48.7600, 2.2870, 0.6],
    [48.7635, 2.2900, 0.7],
    [48.7645, 2.2925, 0.5],
    [48.7590, 2.2860, 0.6],
    // Parc de la Vallée aux Loups
    [48.7754, 2.2681, 0.7], // Main point
    [48.7770, 2.2695, 0.6],
    [48.7740, 2.2670, 0.5],
    [48.7760, 2.2650, 0.6],
    [48.7780, 2.2660, 0.5]
];

// Sport icon colors
const sportIcons = {
    football: "⚽",
    basketball: "🏀",
    tennis: "🎾",
    swimming: "🏊",
    golf: "⛳",
    running: "🏃"
};

// Create markers layer group
const markersLayer = L.layerGroup().addTo(map);

// Create heatmap layer but don't add to map yet
const heatLayer = L.heatLayer([], {
    radius: 25,
    blur: 15,
    maxZoom: 17,
    gradient: {0.4: '#27ae60', 0.65: '#f1c40f', 1: '#e74c3c'}
});

// Current visualization modes
const vizModes = {
    running: "markers" // Default to markers
};

// Icon generator function
function createSportIcon(sport) {
    return L.divIcon({
        html: `<div class="sport-icon ${sport}">${sportIcons[sport]}</div>`,
        className: '',
        iconSize: [30, 30]
    });
}

// Update map visualization based on selected filters and visualization modes
function updateMapVisualization() {
    // Clear existing layers
    markersLayer.clearLayers();
    map.removeLayer(heatLayer);
    
    // Get checked sports
    const activeFilters = {};
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        activeFilters[checkbox.id] = checkbox.checked;
    });
    
    // Add markers for all sports except those using heatmaps when in heatmap mode
    sportsLocations.forEach(location => {
        if (
            activeFilters[location.sport] && 
            !(location.sport === 'running' && vizModes.running === 'heatmap')
        ) {
            const marker = L.marker(location.position, {
                icon: createSportIcon(location.sport)
            }).addTo(markersLayer);
            
            marker.bindTooltip(location.name);
            
            // Add click event to show location details
            marker.on('click', function() {
                showLocationDetails(location);
                
                // Highlight the selected marker
                markersLayer.eachLayer(m => {
                    if (m._icon) m._icon.classList.remove('selected-marker');
                });
                if (this._icon) this._icon.classList.add('selected-marker');
            });
        }
    });
    
    // Add heatmap for running if active and in heatmap mode
    if (activeFilters.running && vizModes.running === 'heatmap') {
        heatLayer.setLatLngs(runningHeatData);
        map.addLayer(heatLayer);
    }
}

// Show location details in info panel
function showLocationDetails(location) {
    const detailsContainer = document.getElementById('location-details');
    
    const amenitiesList = location.amenities.map(a => `<li>${a}</li>`).join('');
    
    detailsContainer.innerHTML = `
        <h3>${location.name}</h3>
        <p class="sport-type"><strong>Sport:</strong> ${location.sport.charAt(0).toUpperCase() + location.sport.slice(1)}</p>
        <p>${location.description}</p>
        <h4>Amenities:</h4>
        <ul>${amenitiesList}</ul>
    `;
}

// Initialize map visualization
updateMapVisualization();

// Filter change event listeners
document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateMapVisualization);
});

// Visualization toggle event listeners
document.querySelectorAll('input[name="running-viz"]').forEach(radio => {
    radio.addEventListener('change', function() {
        vizModes.running = this.value;
        updateMapVisualization();
    });
});

// Reset filters button
document.getElementById('reset-filters').addEventListener('click', function() {
    document.querySelectorAll('.filter-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = true;
    });
    updateMapVisualization();
});

// Make the map responsive
window.addEventListener('resize', function() {
    map.invalidateSize();
});
