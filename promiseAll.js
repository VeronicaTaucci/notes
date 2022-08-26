
let p1 = fetch('https://jsonplaceholder.typicode.com/photos') //XHR , promise
let p2 = fetch('https://jsonplaceholder.typicode.com/todos')

Promise.all([p1, p2]) //arg1 = array of all the fetch calls
    .then(responseArray => { //loop through arrays and call the json for each one of them
        let arr = []
        responseArray.forEach(response => {
            arr.push(response.json())
            return Promise.all(arr) //return all the arrays that were converted to js obj
        })
    })
    .then(data => {
        console.log(data)
        // arr[0] will be results for https://jsonplaceholder.typicode.com/photos
        // arr[1] will be results for https://jsonplaceholder.typicode.com/todos
    })




