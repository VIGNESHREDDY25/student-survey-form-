<!-- SWE 642 Assignment 3 - authors:
Divyanshi Detroja G01522554
Vignesh Reddy G01502803
Supraja Naraharisetty G01507868
Yashwanth Katanguri G01514418 -->
//This is the main component which is the survey page where the user fills the details
<template>
  <div class="survey-form-container">
    <form @submit.prevent="onSubmit" class="form">
      <h1>Student Survey 2025</h1>
      <div class="row f-l-names">
        <label>
          <span class="label">First Name:</span>
          <input
            type="text"
            v-model="surveyForm.firstName"
            placeholder="First Name"
          />
        </label>
        <label>
          <span class="label">Last Name:</span>
          <input
            type="text"
            v-model="surveyForm.lastName"
            placeholder="Last Name"
          />
        </label>
      </div>

      <div class="row str-addr">
        <label>
          <span class="label">Street Address:</span>
          <input
            type="text"
            v-model="surveyForm.streetAddress"
            placeholder="Street Address"
            class="streetAddress"
          />
        </label>
      </div>
      <div class="row zip-city-state">
        <label>
          <span class="label">Zip Code:</span>
          <input
            type="text"
            v-model="surveyForm.zip"
            placeholder="Zip Code"
            @blur="lookupZipCode"
          />
        </label>
        <label>
          <span class="label">City:</span>
          <input
            type="text"
            v-model="surveyForm.city"
            placeholder="City"
            readonly
          />
        </label>
        <label>
          <span class="label">State:</span>
          <input
            type="text"
            v-model="surveyForm.state"
            placeholder="State"
            readonly
          />
        </label>
      </div>
      <div class="row tel-mail-date">
        <label>
          <span class="label">Telephone:</span>
          <input
            type="tel"
            v-model="surveyForm.telephone"
            placeholder="Telephone Number"
          />
        </label>
        <label>
          <span class="label">E-mail:</span>
          <input type="email" v-model="surveyForm.email" placeholder="E-mail" />
        </label>
        <label>
          <span class="label">Date of Survey:</span>
          <input type="date" v-model="surveyForm.date" />
        </label>
      </div>
      <div class="column">
        <h4>What did you like most about the campus?</h4>
        <div class="campus-likes-checkbox-group">
          <label
            v-for="like in campusLikesOptions"
            :key="like"
            class="check-label"
          >
            <input
              type="checkbox"
              :value="like"
              @change="onCampusLikeChange(like, $event)"
              :checked="selectedCampusLikes.includes(like)"
            />
            {{ like }}
          </label>
        </div>
      </div>
      <h4>How did you become interested in the university?</h4>
      <div class="interest-source-radio-group">
        <label
          v-for="source in interestSources"
          :key="source"
          class="radio-label"
        >
          <input
            type="radio"
            v-model="surveyForm.interestSource"
            :value="source"
          />
          {{ source }}
        </label>
      </div>
      <div class="row">
        <h4>Likelihood of recommending this school to others</h4>
        <select v-model="surveyForm.likelihood">
          <option value="" disabled selected>Select an option</option>
          <option
            v-for="option in likelihoodOptions"
            :key="option"
            :value="option"
          >
            {{ option }}
          </option>
        </select>
      </div>
      <div class="row">
        <h4>Additional Comments</h4>
        <textarea
          v-model="surveyForm.comments"
          placeholder="Your comments"
        ></textarea>
      </div>

      <div class="form-action-buttons">
        <button type="submit">Submit</button>
        <button type="button" @click="onCancel">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const surveyForm = reactive({
      firstName: "",
      lastName: "",
      streetAddress: "",
      zip: "",
      city: "",
      state: "",
      telephone: "",
      email: "",
      date: "",
      interestSource: "",
      likelihood: "",
      comments: "",
    });

    const selectedCampusLikes = ref([]);
    const campusLikesOptions = ref([
      "Students",
      "Location",
      "Campus",
      "Atmosphere",
      "Dorm Rooms",
      "Sports",
    ]);
    const interestSources = ref(["Friends", "Television", "Internet", "Other"]);
    const likelihoodOptions = ref(["Very Likely", "Likely", "Unlikely"]);
    const zipCodeData = ref([]);
    const router = useRouter();
    const route = useRoute();
    const editMode = ref(false);
    const editingId = ref(null);

    let zipWatcher = null;

    const formattedCampusLikes = computed(() => {
      return selectedCampusLikes.value.join(",");
    });

    const onCampusLikeChange = (like, event) => {
      if (event.target.checked) {
        selectedCampusLikes.value.push(like);
      } else {
        selectedCampusLikes.value = selectedCampusLikes.value.filter(
          (item) => item !== like
        );
      }
    };

    const lookupZipCode = async () => {
      const zip = surveyForm.zip;
      if (zip && zip.length === 5) {
        // Check if zipCodeData.value is loaded
        if (
          !Array.isArray(zipCodeData.value) ||
          zipCodeData.value.length === 0
        ) {
          try {
            const response = await fetch(
              new URL("@/assets/zipcodes.json", import.meta.url).href
            );
            const data = await response.json();
            zipCodeData.value = data.zipcodes; // Access the 'zipcodes' array
          } catch (error) {
            console.error("Error loading zip code data:", error);
            return;
          }
        }
        const zipInfo = zipCodeData.value.find(
          (item) => item.zip === zip // Compare zip codes as strings
        );
        if (zipInfo) {
          if (!editMode.value || !surveyForm.city || !surveyForm.state) {
            surveyForm.city = zipInfo.city;
            surveyForm.state = zipInfo.state;
          }
        } else {
          surveyForm.city = "";
          surveyForm.state = "";
        }
      } else {
        surveyForm.city = "";
        surveyForm.state = "";
      }
    };

    const onSubmit = async () => {
      const errors = [];
      if (selectedCampusLikes.value.length < 2) {
        errors.push("Please select at least 2 campus likes.");
      }

      const fieldMap = {
        firstName: "First Name",
        lastName: "Last Name",
        streetAddress: "Street Address",
        zip: "Zip Code",
        city: "City",
        state: "State",
        telephone: "Phone Number",
        email: "Email",
        date: "Survey Date",
        likelihood: "Recommendation Likelihood",
        comments: "Additional Comments",
      };

      for (const field in surveyForm) {
        if (Object.prototype.hasOwnProperty.call(surveyForm, field)) {
          if (
            !surveyForm[field] &&
            [
              "firstName",
              "lastName",
              "zip",
              "telephone",
              "email",
              "date",
              "interestSource",
              "likelihood",
            ].includes(field)
          ) {
            errors.push(`${fieldMap[field] || field} is required.`);
          }
          if (
            ["firstName", "lastName"].includes(field) &&
            !/^[a-zA-Z\s]*$/.test(surveyForm[field])
          ) {
            errors.push(
              `${
                fieldMap[field] || field
              } must contain only letters and spaces.`
            );
          }
          if (field === "zip" && !/^\d{5}$/.test(surveyForm[field])) {
            errors.push("Zip code must be exactly 5 digits.");
          }
          if (field === "telephone" && !/^\d{10}$/.test(surveyForm[field])) {
            errors.push("Phone number must be exactly 10 digits.");
          }
          if (
            field === "email" &&
            surveyForm[field] &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(surveyForm[field])
          ) {
            errors.push("Email format is invalid.");
          }
        }
      }

      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }

      const surveyData = {
        ...surveyForm,
        campusLikes: formattedCampusLikes.value,
        city: surveyForm.city,
        state: surveyForm.state,
      };

      const url = editMode.value
        ? `http://localhost:8080/api/surveys/${editingId.value}`
        : "http://localhost:8080/api/surveys";

      const method = editMode.value ? "PUT" : "POST";

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert(
          `Survey ${editMode.value ? "updated" : "submitted"} successfully!`
        );
        router.push("/");
      } catch (err) {
        console.error(err);
        alert(
          `There was an error ${
            editMode.value ? "updating" : "submitting"
          } the survey.`
        );
      }
    };

    const onCancel = () => {
      router.push("/");
    };

    onMounted(async () => {
      const surveyId = route.params.id;

      if (surveyId) {
        editMode.value = true;
        editingId.value = +surveyId;

        try {
          const response = await fetch(
            `http://localhost:8080/api/surveys/${surveyId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch survey data");
          }
          const data = await response.json();
          for (const key in surveyForm) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              surveyForm[key] = data[key];
            }
          }
          selectedCampusLikes.value = (data.campusLikes || "")
            .split(",")
            .map((item) => item.trim());
          await lookupZipCode();
        } catch (error) {
          console.error("Error loading survey:", error);
          alert("Failed to load survey for editing.");
        }
      } else {
        try {
          const response = await fetch(
            new URL("@/assets/zipcodes.json", import.meta.url).href
          );
          const data = await response.json();
          zipCodeData.value = data.zipcodes; // Access the 'zipcodes' array
        } catch (error) {
          console.error("Error loading zip code data:", error);
        }
      }
    });

    onBeforeUnmount(() => {
      if (zipWatcher) {
        clearTimeout(zipWatcher);
      }
    });

    return {
      surveyForm,
      selectedCampusLikes,
      campusLikesOptions,
      interestSources,
      likelihoodOptions,
      zipCodeData,
      editMode,
      editingId,
      formattedCampusLikes,
      onCampusLikeChange,
      lookupZipCode,
      onSubmit,
      onCancel,
    };
  },
};
</script>

<style>
body {
  margin: 0;
}

.row {
  margin: 2% 0;
  display: flex;
  justify-content: space-between;
}

.survey-form-container {
  background-image: url("@/assets/images/bg2.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  height: 92vh;
  margin: 0;
  padding: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
}

.form {
  background-color: rgba(191, 166, 168, 0.5);
  padding: 1%;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(131, 119, 134, 255);
}

.form:hover {
  transform: scaleX(1.05) scaleY(1.05);
  transition: 0.5s;
}

textarea {
  width: 600px;
  height: 40px;
  border-radius: 20px;
  border: none;
  padding: 2%;
}

.tel-mail-date input,
.zip-city-state input,
.str-addr input,
.f-l-names input {
  border: 0;
  border-radius: 15px;
  height: 25px;
  padding: 0 15px;
}

.campus-likes-checkbox-group input {
  margin: 0 !important;
  margin-bottom: -5px !important;
}

.streetAddress {
  width: 680px;
}

h1 {
  color: rgba(139, 70, 46, 255);
  text-align: center;
}

.f-l-names label {
  width: 50%;
}

.f-l-names input {
  width: 280px;
}

.label {
  margin-right: 20px;
  margin-left: 10px;
}

.check-label {
  margin: 0 2%;
}

.check-label input {
  height: 15px;
  width: 15px;
}

.radio-label {
  margin: 0 4%;
}

.radio-label input {
  height: 15px;
  width: 15px;
}

select {
  margin-right: 200px;
  height: 30px;
  width: 200px;
  border: none;
  border-radius: 15px;
  padding-left: 15px;
  align-self: center;
}

button {
  padding: 10px 50px;
  border: 0;
  background-color: rgba(87, 87, 36, 0.7);
  font-weight: 700;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(50, 51, 35, 255);
}

button:hover {
  background-color: rgba(50, 51, 35, 255);
  box-shadow: 0 4px 10px rgba(87, 87, 36, 0.7);
  color: white;
  transform: scaleX(1.1) scaleY(1.1);
  transition: 0.5s;
  cursor: pointer;
}

.form-action-buttons {
  display: flex;
  justify-content: space-around;
  margin: 0 95px;
}
</style>