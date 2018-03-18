import Helpers from './helpers'
import config from './config'
import hello from 'hellojs'
import Bulma from 'bulma'

hello.init({
  github: config.client_id
}, {
  redirect_uri: config.redirect_uri
})

const githubAuthLink = document.querySelector('#gitHub-login')

githubAuthLink.addEventListener('click', (e) => {
  e.preventDefault()
  login()
})

const github = hello('github')

const login = () => {
  github.login().then(e => {
    return github.api('/me').then(e => {
      const githubUserName = document.querySelector('#user-panel')
      const githubUserAvatar = document.querySelector('#avatar')
      githubUserName.textContent = e.login
      githubUserAvatar.src = e.avatar_url
    })
  }, function (e) {
    console.log('error', e)
  })
}

const taskInput = document.querySelector('#task-input')
const addNewTaskBtn = document.querySelector('#add-new-task')

taskInput.addEventListener('keydown', e => {
  console.log(e)
  if (e.keyCode == 13) {
    createNewTask()
  }
})

addNewTaskBtn.addEventListener('click', e => {
  createNewTask()
})

const createNewTask = () => {
  const tasksList = document.querySelector('#tasks-list')
  if (taskInput.value.length <= 0) {
    return
  }
  const task = document.createElement('li')
  task.classList.add('column')
  task.textContent = taskInput.value
  tasksList.appendChild(task)
  taskInput.value = ''
}
