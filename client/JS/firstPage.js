document.addEventListener('DOMContentLoaded', () => {
    const goToProfileCard = document.getElementById('goToProfile');
    const goToOtherProfileCard = document.getElementById('goToOtherProfile');

    goToProfileCard.addEventListener('click', () => {
        const profileData = localStorage.getItem('selectedEmployee');

        // Store 'no 01' in session storage
        sessionStorage.setItem('clickedCard', 'no 01');

        if (profileData) {
            // If profile data is already saved in local storage, go to the third page
            window.location.href = 'thirdPage.html';
        } else {
            // If no profile data, go to the second page to select profile
            window.location.href = 'secondPage.html';
        }
    });

    goToOtherProfileCard.addEventListener('click', () => {

        // Store 'no 02' in session storage
        sessionStorage.setItem('clickedCard', 'no 02');
        
            // If profile data is already saved in local storage, go to the third page
            
            window.location.href = 'secondPage.html';
    });
});
