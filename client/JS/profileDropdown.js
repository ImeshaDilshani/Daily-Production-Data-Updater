document.addEventListener('DOMContentLoaded', () => {
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    const selectOtherProfileBtn = document.getElementById('selectOtherProfileBtn');

    // Toggle the visibility of the profile dropdown
    profileIcon.addEventListener('click', () => {
        profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Hide the profile dropdown when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!profileDropdown.contains(event.target) && !profileIcon.contains(event.target)) {
            profileDropdown.style.display = 'none';
        }
    });

    // Handle "Select Other Profile" button click
    selectOtherProfileBtn.addEventListener('click', () => {
        // localStorage.removeItem('profileData'); // Remove profile data from local storage
        window.location.href = 'otherProfile.html'; // Redirect to second page
    });

    // Load profile data from local storage and update the dropdown
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    if (profileData) {
        document.getElementById('profile-img').src = `images/${profileData.epf_number}.jpg`;
        document.getElementById('profile-name').textContent = profileData.full_name;
        document.getElementById('profile-epf').textContent = `EPF No: ${profileData.epf_number}`;
    }
});
