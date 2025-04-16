<!-- SWE642 HWAssignment4-authors:
Divyanshi Detroja G01522554
Vignesh Reddy G01502803
Supraja Naraharisetty G01507868
Yashwanth Katanguri G01514418 -->
//This page displays the names and the buttons to take the survey and view the records
<template>
  <div class="container">
    <div class="card">
      <h1 class="heading">Welcome to SWE642 Survey!</h1>
      <ol class="authors">
        <li>Divyanshi Detroja G01522554</li>
        <li>Vignesh Reddy G01502803</li>
        <li>Supraja Naraharisetty G01507868</li>
        <li>Yashwanth Katanguri G01514418</li>
      </ol>
      <div class="button-group">
        <button @click="navigateToSurvey">Take the Survey</button>
        <button @click="navigateToRecords">View All Records</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WelcomePage',
  methods: {
    navigateToSurvey() {
      this.$router.push('/survey-form');
    },
    navigateToRecords() {
      this.$router.push('/list-all-surveys');
    }
  }
};
</script>
/* All the styling of the page is included in this block */
<style scoped>
.container {
  height: 100vh;
  width: 100vw;
  background-image: url('@/assets/images/bg2.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: rgba(191, 166, 168, 0.5);
  padding: 3%;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(131, 119, 134, 1);
}

.card:hover {
  transform: scaleX(1.1) scaleY(1.1);
  transition: 0.5s;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 2% 5%;
  border: 0;
  background-color: rgba(87, 87, 36, 0.7);
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

h1 {
  color: rgba(139, 70, 46, 1);
  font-weight: bolder;
  text-shadow: 2px 2px 5px rgb(234, 200, 176);
  text-align: center;
}

ol.authors {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
  color: white;
  font-weight: 500;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}

li {
  color: white;
  font-weight: 500;
  font-size: larger;
}

@media (max-width: 500px) {
  .card {
    width: 80vw !important;
    height: auto;
  }

  .card:hover {
    transform: scaleX(0.95) scaleY(0.95);
    transition: 0.5s;
  }

  ol {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .button-group {
    flex-direction: column;
    margin: 2%;
  }
  
  button {
    margin-bottom: 5%;
    width: 70%;
  }
}
</style>