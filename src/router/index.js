import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../components/Welcome'
import List_all_surveys from '../components/List_all_surveys'
import View_survey from '../components/View_survey'
import Survey_form from '../components/Survey_form'

const routes = [
  { path: '/', name: 'welcome', component: Welcome },
  { path: '/list-all-surveys', name: 'List All Surveys', component: List_all_surveys },
  { path: '/survey-form', name: 'CreateSurvey', component: Survey_form },
  { path: '/surveys/view/:id', name: 'ViewSurvey', component: View_survey },
  { path: '/survey-form/:id', name: 'Survey Form', component: Survey_form }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router