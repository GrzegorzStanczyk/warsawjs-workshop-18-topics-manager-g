import Helpers from './helpers'
import config from './config'
import hello from 'hellojs'
import Bulma from 'bulma'
import Mustache from 'Mustache'
import './css.scss'

hello.init({
  github: config.client_id
}, {
  redirect_uri: config.redirect_uri
})

const githubAuthLink = document.querySelector('#gitHub-login')
const taskInput = document.querySelector('#task-input')
const taskTitle = document.querySelector('#task-title')
const addNewTaskBtn = document.querySelector('#add-new-task')
const $form = document.querySelector('.js-form-add-topic');

githubAuthLink.addEventListener('click', (e) => {
  e.preventDefault()
  login()
})

const github = hello('github')
let userAvatarUrl

const login = () => {
  github.login().then(e => {
    return github.api('/me').then(e => {
      userAvatarUrl = e.avatar_url
      const githubUserName = document.querySelector('#user-panel')
      const githubUserAvatar = document.querySelector('#avatar')
      githubUserName.textContent = e.login
      githubUserAvatar.src = e.avatar_url

      // addNewTaskBtn.setAttribute('title', 'Accept button')
      addNewTaskBtn.removeAttribute('disabled')
    })
  }, function (e) {
    console.log('error', e)
  })
}

taskInput.addEventListener('keydown', e => {
  if (e.keyCode == 13) {
    createNewTask()
  }
})

addNewTaskBtn.addEventListener('click', e => {
  e.preventDefault()
  createNewTask()
})
const card = document.createElement('div')

const createNewTask = () => {
  const tasksList = document.querySelector('#tasks-list')
  if (taskInput.value.length <= 0 || taskTitle.value.length <= 0) {
    return
  }
  
  const cardContent = document.createElement('div')
  cardContent.classList.add('column', 'is-3')
  
  var output = Mustache.render(template, {
    title: taskTitle.value,
    description: taskInput.value,
    userAvatarUrl: userAvatarUrl
  });
  cardContent.innerHTML = output

  tasksList.appendChild(cardContent)

  $form.reset()
}

var template = 
`
  <div class="card">
      <header class="card-header">
          <p class="card-header-title">
              {{title}}
          </p>
      </header>
      <img class="avatar" src="{{userAvatarUrl}}">
      <div class="card-content">
          <div class="content">
              {{description}}
          </div>
      </div>
      <footer class="card-footer">
          <a href="#" class="card-footer-item">Zagłosuj</a>
          <a href="#" class="card-footer-item">Chcę być trenerem</a>
      </footer>
  </div>
`
