<!-- SWE642 HWAssignment4-authors:
  Divyanshi Detroja G01522554
  Vignesh Reddy G01502803
  Supraja Naraharisetty G01507868
  Yashwanth Katanguri G01514418
-->
//This component fetches and displays all the student survey entries from the backend in a table format with 2 action buttons.
<template>
  <div class="landing-page">
    <h1>All Survey Records</h1>
    <div class="table-wrapper">
      <table class="mat-elevation-z8">
        <thead>
          <tr>
            <th v-for="column in displayedColumns" :key="column">
              {{ formatHeader(column) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through each survey record and display its fields -->
          <tr v-for="element in dataSource" :key="element.id">
            <td>{{ element.id }}</td>
            <td>{{ element.firstName }}</td>
            <td>{{ element.lastName }}</td>
            <td>{{ element.streetAddress }}</td>
            <td>{{ element.zip }}</td>
            <td>{{ element.city }}</td>
            <td>{{ element.state }}</td>
            <td>{{ element.telephone }}</td>
            <td>{{ element.email }}</td>
            <td>{{ element.date }}</td>
            <td>{{ element.campusLikesAsList?.join(', ') }}</td>
            <td>{{ element.interestSource }}</td>
            <td>{{ element.likelihood }}</td>
            <td>{{ element.comments }}</td>
            <td>
              <button @click="viewSurvey(element.id)">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="hero-content">
      <button @click="goHome">HomePage</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListAllSurveys',
  data() {
    return {
      dataSource: [],
      displayedColumns: [
        'id', 'firstName', 'lastName', 'streetAddress', 'zip', 'city',
        'state', 'telephone', 'email', 'date', 'campusLikes',
        'interestSource', 'likelihood', 'comments', 'actions'
      ]
    };
  },
  methods: {
    fetchRecords() {
      axios.get('http://localhost:8080/api/surveys')
        .then(response => {
          this.dataSource = response.data.map(survey => ({
            ...survey,
            campusLikesAsList: survey.campusLikes
              ? survey.campusLikes.split(',').map(item => item.trim())
              : []
          }));
        })
        .catch(error => {
          console.error('Error fetching records:', error);
          alert('There was an error fetching the records.');
        });
    },
    viewSurvey(id) {
      this.$router.push(`/surveys/view/${id}`);
    },
    //Navigate to the welcome page
    goHome() {
      this.$router.push('/');
    },
    formatHeader(key) {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    }
  },
  mounted() {
    this.fetchRecords();
  }
};
</script>
<style scoped>
/* All the styling of the page is included in this block */
.landing-page {
  background-image: url('@/assets/images/bg2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-top: 3rem;
}

h1 {
  text-align: center;
  color: rgba(139, 70, 46, 1);
  text-shadow: 2px 2px 5px rgb(234, 200, 176);
  margin-bottom: 1rem;
  margin-top: 0;
}

.table-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

tr {
  background-color: rgba(191, 166, 168, 0.5) !important;
  box-shadow: 0 4px 10px rgba(131, 119, 134, 1) !important;
}

.mat-elevation-z8 {
  width: 100%;
  max-width: none;
  background-color: rgba(234, 234, 210, 0.7);
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(50, 51, 35, 1);
  border-radius: 0;
  overflow-x: auto;
  border-collapse: collapse;
}

th {
  background-color: #4a4a4a;
  color: rgb(255, 255, 255);
  font-weight: bold;
  padding: 12px;
}

td {
  padding: 12px;
  text-align: center;
}

.hero-content {
  text-align: center;
}

button {
  padding: 10px 50px;
  border: 0;
  background-color: rgba(255, 255, 255, 0.7);
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(50, 51, 35, 1);
}

button:hover {
  background-color: rgba(50, 51, 35, 1);
  box-shadow: 0 4px 10px rgba(87, 87, 36, 0.7);
  color: white;
  transform: scaleX(1.1) scaleY(1.1);
  transition: 0.5s;
  cursor: pointer;
}

@media (max-width: 1200px) {
  .mat-elevation-z8 {
    width: 95%;
  }
}

@media (max-width: 768px) {
  .mat-elevation-z8 {
    width: 100%;
  }
}
</style>
