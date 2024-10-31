document.addEventListener('DOMContentLoaded', function() {
    const datePicker = document.querySelector('.date-picker');
    const currentDate = new Date();
    const dates = [];

    // Generate dates around the current date
    for (let i = -2; i <= 2; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dates.push(date);
    }

    // Clear existing dates
    datePicker.innerHTML = '';

    // Add new dates to the date picker
    dates.forEach((date, index) => {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        if (index === 2) {
            dateDiv.classList.add('active');
        }
        dateDiv.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        datePicker.appendChild(dateDiv);
    });

    // Add event listeners to the new dates
    const dateElements = document.querySelectorAll('.date-picker .date');
    dateElements.forEach(date => {
        date.addEventListener('click', function() {
            document.querySelector('.date-picker .date.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // Add event listeners to attendance status buttons
    const statusButtons = document.querySelectorAll('.status-button');

    statusButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Toggle active class on the clicked button
            button.classList.toggle('active');
        });
    });
});