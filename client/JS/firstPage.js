document.addEventListener('DOMContentLoaded', () => {
    const goToProfileCard = document.getElementById('goToProfile');

    goToProfileCard.addEventListener('click', () => {
        const profileData = localStorage.getItem('selectedEmployee');
        
        if (profileData) {
            // If profile data is already saved in local storage, go to the third page
            window.location.href = 'thirdPage.html';
        } else {
            // If no profile data, go to the second page to select profile
            window.location.href = 'secondPage.html';
        }
    });
});
