<!-- SWE642 HWAssignment4-authors:
Divyanshi Detroja G01522554
Vignesh Reddy G01502803
Supraja Naraharisetty G01507868
Yashwanth Katanguri G01514418 -->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 20px;
}
nav ul li {
  display: inline;
}
nav ul li a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
nav ul li a:hover {
  color: #007bff;
}
</style>
