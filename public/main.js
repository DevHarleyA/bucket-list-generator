const remove = document.getElementsByClassName('fa-ban')
const conquer = document.getElementsByClassName('fa-circle-check')

//trying to POST and DELETE within the same function

Array.from(conquer).forEach(function (element) {
    element.addEventListener('click', function () {
        const name = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        console.log(name)

        const dream = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        console.log(dream)

        fetch('/dreams', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'dream': dream
            })
        }).then(function (response) {
            window.location.reload()
        })
    })
})


// Array.from(conquer).forEach(function (element) {
//     element.addEventListener('click', function () {
//         const name = this.parentNode.parentNode.parentNode.childNodes[1].innerText
//         console.log(name)

//         const dream = this.parentNode.parentNode.parentNode.childNodes[3].innerText
//         console.log(dream)

//         const date = this.parentNode.parentNode.parentNode.childNodes[6].innerText
//         console.log(date)

//         fetch('/conquers', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 'name': name,
//                 'dream': dream,
//                 'startDate': date
//             })
//         })

//         //        fetch('/dreamsDelete', {
//         //             method: 'delete',
//         //             headers: {
//         //                 'Content-Type': 'application/json'
//         //             },
//         //             body: JSON.stringify({
//         //                 'name': name,
//         //                 'dream': dream
//         //             })
//         //         }) 
//         //         .then (function (response) {
//         //             window.location.reload()
//         //         })
//         //         .catch(err => {
//         //             console.log(`error ${err}`)
//         //         })

//     })
// })

Array.from(remove).forEach(function (element) {
    element.addEventListener('click', function () {
        const name = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        console.log(name)

        const dream = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        console.log(dream)

        fetch('/dreamsDelete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'dream': dream
            })
        }).then(function (response) {
            window.location.reload()
        })
    })
})

