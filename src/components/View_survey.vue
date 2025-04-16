<!-- SWE642 HWAssignment4-authors:
Divyanshi Detroja G01522554
Vignesh Reddy G01502803
Supraja Naraharisetty G01507868
Yashwanth Katanguri G01514418 -->
//This component displays the record when the user clicks view button from the list all surveys/records page
<template>
  <div class="survey" v-if="survey">
    <div class="survey-container">
      <h2>Survey Details</h2>
      <div class="row">
        <p><strong>First Name:</strong> {{ survey.firstName }}</p>
        <p><strong>Last Name:</strong> {{ survey.lastName }}</p>
      </div>
      <div class="row">
        <p><strong>Street Address:</strong> {{ survey.streetAddress }}</p>
      </div>
      <div class="row">
        <p><strong>City:</strong> {{ survey.city }}</p>
        <p><strong>State:</strong> {{ survey.state }}</p>
        <p><strong>ZIP:</strong> {{ survey.zip }}</p>
      </div>
      <div class="row">
        <p><strong>Telephone:</strong> {{ survey.telephone }}</p>
        <p><strong>Date:</strong> {{ survey.date }}</p>
      </div>
      <div class="row">
        <p><strong>Email:</strong> {{ survey.email }}</p>
      </div>
      <div class="row">
        <p><strong>Campus Likes:</strong> {{ survey.campusLikes }}</p>
      </div>
      <div class="row">
        <p><strong>Interest Source:</strong> {{ survey.interestSource }}</p>
      </div>
      <div class="row">
        <p><strong>Likelihood:</strong> {{ survey.likelihood }}</p>
        <p><strong>Comments:</strong> {{ survey.comments }}</p>
      </div>
      <div class="actions">
        <button @click="onEdit">Modify</button>
        <button @click="onDelete">Delete</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading survey...</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const survey = ref(null)
const route = useRoute()
const router = useRouter()
const fetchSurvey = async () => {
  const id = route.params.id
  if (id) {
    try {
      const response = await fetch(`http://localhost:8080/api/surveys/${id}`)
      if (!response.ok) throw new Error('Survey not found')
      survey.value = await response.json()
    } catch (err) {
      console.error('Error loading survey:', err)
      alert('Survey not found!')
    }
  } else {
    alert('Invalid survey ID in route.')
  }
}
const onEdit = () => {
  router.push(`/survey-form/${survey.value.id}`)
}
const onDelete = async () => {
  if (confirm('Are you sure you want to delete this survey?')) {
    try {
      const response = await fetch(`http://localhost:8080/api/surveys/${survey.value.id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('Survey deleted successfully.')
        router.push('/list-all-surveys')
      } else {
        throw new Error('Failed to delete the survey')
      }
    } catch (err) {
      console.error('Error deleting survey:', err)
      alert('Failed to delete the survey.')
    }
  }
}
onMounted(fetchSurvey)
</script>
<style scoped>
/* All the styling of the page is included in this block */
h2 {
  color: rgba(139, 70, 46, 1);
  font-weight: bolder;
  text-shadow: 2px 2px 5px rgb(234, 200, 176);
  text-align: center;
}

strong {
  margin-right: 15px;
}

button {
  padding: 10px 20px;
  border: 0;
  background-color: rgba(87, 87, 36, 0.7);
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(50, 51, 35, 1);
  margin: 2% 5%;
}

button:hover {
  background-color: rgba(50, 51, 35, 1);
  box-shadow: 0 4px 10px rgba(87, 87, 36, 0.7);
  color: white;
  transform: scaleX(1.1) scaleY(1.1);
  transition: 0.5s;
  cursor: pointer;
}

.survey {
  background-image: url('@/assets/images/bg2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

p {
  display: inline;
}

.survey-container {
  background-color: rgba(252, 252, 252, 0.5);
  padding: 2%;
  border-radius: 20px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 25px;
}
</style>
