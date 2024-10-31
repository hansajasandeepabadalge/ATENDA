document.addEventListener('DOMContentLoaded', async function() {
    const datePicker = document.querySelector('.date-picker');
    const attendanceList = document.querySelector('.attendance-list');
    const currentDate = new Date();
    const dates = [];

    // Step 1: Fetch child names and classes from Google Sheets
    async function fetchChildNames() {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyeGRSQOnhF3Znc7sHEBzA2YPIp5y2IUo3Tmw9-aR4PfOLGwqCgk3jqutvZRoEbsKYn/exec');
            const data = await response.json();
            displayAttendanceList(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Step 2: Display child names in the attendance list
    function displayAttendanceList(data) {
        attendanceList.innerHTML = ''; // Clear any existing items
        data.forEach(row => {
            const [childName, childClass] = row;
            const attendanceItem = document.createElement('div');
            attendanceItem.className = 'attendance-item';
            attendanceItem.innerHTML = `
                <span class="attendance-name">${childName}</span>
                <div class="attendance-status">
                    <button class="status-button">Drop</button>
                    <button class="status-button">Pick</button>
                </div>
            `;
            attendanceList.appendChild(attendanceItem);
        });

        // Add event listeners to attendance status buttons after adding items
        const statusButtons = document.querySelectorAll('.status-button');
        statusButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });
    }

    // Step 3: Populate the date picker
    for (let i = -2; i <= 2; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        dates.push(date);
    }

    // Clear existing dates and add new dates to the date picker
    datePicker.innerHTML = '';
    dates.forEach((date, index) => {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        if (index === 2) {
            dateDiv.classList.add('active');
        }
        dateDiv.textContent = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        datePicker.appendChild(dateDiv);
    });

    // Add event listeners to date picker for selecting dates
    const dateElements = document.querySelectorAll('.date-picker .date');
    dateElements.forEach(date => {
        date.addEventListener('click', function() {
            document.querySelector('.date-picker .date.active').classList.remove('active');
            this.classList.add('active');
        });
    });

    // Fetch child names on page load
    fetchChildNames();
});
