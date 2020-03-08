<template>
<component :is="$route.params.resumeid"></component>
</template>

<script>
import Vue from 'vue';
import '../resumes/resumes';
export default Vue.component('CV', {
    name: 'app'
});
</script>

<style scoped>

</style>
