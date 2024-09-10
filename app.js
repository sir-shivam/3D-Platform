// Function to get user's current location using the Geolocation API
function getUserLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
  } else {
      alert("Geolocation is not supported by this browser.");
  }
}

// Function to show the user's latitude and longitude
function showPosition(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  console.log("User Latitude: " + userLat);
  console.log("User Longitude: " + userLon);

  // Example: Platform latitude and longitude
  const platformLat = 19.0761; // Change this to match your platform's location
  const platformLon = 72.8778;

  const distance = calculateDistance(userLat, userLon, platformLat, platformLon);
  alert("Distance to Platform: " + distance + " km");
}

// Function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a = 
      0.5 - Math.cos(dLat) / 2 + 
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

// Call the function to get the user's location
getUserLocation();


const markerGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const marker = new THREE.Mesh(markerGeometry, markerMaterial);
marker.position.set(0, 0.5, 0); // Adjust the position based on your platform model
scene.add(marker);

// Add event listener for user clicks on the marker
window.addEventListener('click', function(event) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObject(marker);
    if (intersects.length > 0) {
        alert('You clicked on the marker!');
        // Call the distance calculation function
        getUserLocation();
    }
});
