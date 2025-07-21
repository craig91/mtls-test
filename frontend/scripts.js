document.getElementById('loadusersBtn').addEventListener('click', () => {
    fetch('http://192.168.1.10:3000/users')
        .then(response => {
            if(!response.ok) throw new Error("Network response was not ok");
            console.log(response);
            return response.json();
        })
        .then(users => {
            const container = document.getElementById('userList');
            container.innerHTML = '';

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.textContent = `${user.first_name} ${user.last_name} - ${user.job}`;
                container.appendChild(userDiv);
            })
        })
        .catch(error => {
            console.error('Error fetching users: ', error);
        })
})