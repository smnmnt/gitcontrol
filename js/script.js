'use strict'
const inputClass = document.getElementsByClassName('input__class')
const controlForm = document.querySelector(".form_control")
const firstNameValue = document.querySelector(".input__firstname")
const secondNameValue = document.querySelector(".input__secondname")
const ageValue = document.querySelector(".input__age")
const postValue = document.querySelector(".input__post")
const submitButton = document.getElementById("submit")
const table = document.getElementById("table")
let workerNames = []

const readAndPush = function (event) {
    event.preventDefault()
    const newWorker = {
        firstName: firstNameValue.value,
        secondName: secondNameValue.value,
        age: ageValue.value,
        post: postValue.options[postValue.selectedIndex].textContent
    }
    if (newWorker.firstName != '' & newWorker.secondName != '' & newWorker.age != '' & newWorker.post != '') {
        workerNames.push(newWorker)
        localStorage.setItem('worker', JSON.stringify(workerNames))

        firstNameValue.value = ''
        secondNameValue.value = ''
        ageValue.value = ''
        postValue.selectedIndex = 0
    }
    newLine()
    
}

const newLine = function () {
    table.innerHTML = '<tr><th>Имя</th><th>Фамилия</th><th>Дата рождения</th><th>Должность</th><th>-</th></tr>'
    getWorkerInfo()
}

const getWorkerInfo = function () {
    workerNames.forEach((item, index) => {
        if(item.firstName != '' & item.secondName != '' & item.age != '' & item.post != '') {
            const tr = document.createElement('tr')

            tr.innerHTML =  '<td>' + item.firstName + '</td>' + '<td>' + item.secondName + '</td>' + '<td>' + item.age + '</td>' + '<td>' + item.post + '</td>' + '<td id="del">-</td>'
            table.append(tr)
            tr.querySelector('#del').addEventListener('click', () => {
                tr.remove()
                workerNames.splice(index--, 1)
                localStorage.setItem('worker', JSON.stringify(workerNames))
            })
        }
    })
}

const getCache = () => {
    if (localStorage.getItem('worker') != null) {
        workerNames = JSON.parse(localStorage.getItem('worker'))
        newLine()
    }
}

submitButton.addEventListener('click', readAndPush)
getCache()