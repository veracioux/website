<script>
export default {
    name: "ProjectCard",
    props: {
        icon: String,
        video: String,
        title: String,
    }
}

</script>

<template>
  <div id="container">
      <div>{{title}}</div>
      <img v-if="icon" :src="icon"  alt="Project image"/>
  </div>
</template>

<style scoped>
    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        padding: 16px 16px;
        width: 280px;
        height: 360px;
        font-size: 16px;
        border-radius: 10px;
        background: red;
    }
</style>