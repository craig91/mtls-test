document.getElementById('loadusersBtn').addEventListener('click', () => {
    fetch('http://192.168.1.10:3000/users')
        .then(response => {
            if(!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
})