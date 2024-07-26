document.addEventListener('DOMContentLoaded', () => {

    const goToProfileCard = document.getElementById('goToProfile');
    const selectOtherProfileCard = document.getElementById('selectOtherProfile');

    goToProfileCard.addEventListener('click', () => {

        const profileData = localStorage.getItem('profileData');
        // what is profileData?--------------------------------------------------------------------------------------------------
        // Assuming you have a function to save the selected profile data
        function saveProfileData(profileData) {
            localStorage.setItem('profileData', JSON.stringify(profileData));
            window.location.href = 'thirdPage.html';
        }

        if (profileData) {
            // If profile data is already saved in local storage, go to the third page
            window.location.href = 'thirdPage.html';
        } else {
            // If no profile data, go to the second page to select profile
            window.location.href = 'secondPage.html';
        }
    });

    selectOtherProfileCard.addEventListener('click', () => {
        // Always go to the second page to select profile
        window.location.href = 'secondPage.html';
    });
});
