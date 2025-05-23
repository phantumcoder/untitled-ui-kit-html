const dropdown = $('.dropdown');
const accountBtn = $('.account-btn');

// It's good practice to check if the element was actually found
if (accountBtn.length) { // .length checks if the jQuery object found any elements
    accountBtn.on('click', function(e) { // Use .on() or .click()
        e.preventDefault();
        if (dropdown.length) { // Also check if dropdown exists
            dropdown.show();
        }
    });
} else {
    console.warn("Element with class 'account-btn' not found.");
}