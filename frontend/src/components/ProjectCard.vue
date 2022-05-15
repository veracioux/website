<script>
export default {
    name: "ProjectCard",
    props: {
        icon: String,
        video: String,
        title: String,
        desc: String,
    }
}
</script>

<template>
    <div class="container">
        <div class="title">{{ title }}</div>
        <img v-if="icon" :src="icon" alt="Project image"/>
        <div class="description">{{ desc }}</div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    padding: 64px 32px;
    width: 280px;
    font-size: 16px;
    border-radius: 10px;
    background: #00000040;
}

.title {
    color: #7c4dff;
    font-weight: bold;
    font-size: 24px;
}

.description {
    text-align: center;
    color: #99a3ff80;
}
</style>