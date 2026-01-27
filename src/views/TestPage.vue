<script setup lang="ts">
import { computed, ref } from 'vue';
import { analyzePassword } from '../types/logic';

const password = ref('');
const result = computed(() => analyzePassword(password.value));

function getBarColor(level: string) {
  const colors: Record<string, string> = {
    'Too Weak': '#ff4d4d',
    'Weak': '#ffa500',
    'Medium': '#ffff00',
    'Strong': '#90ee90',
    'Very Strong': '#008000'
  };
  return colors[level];
}
</script>

<template>
  <div class="d-flex flex-column align-items-center h-100 py-5">
    <h1 class="my-5 doto">Password Strength Meter</h1>
    <div>
      <input v-model="password" type="password" placeholder="Type a password..." />

      <div class="meter">
        <div class="progress" :style="{ width: result.score + '%', backgroundColor: getBarColor(result.level) }"></div>
      </div>

      <p>Strength: <strong>{{ result.level }}</strong></p>
      <p v-for="tip in result.feedback" :key="tip">{{ tip }}</p>
    </div>
  </div>

</template>

<style scoped></style>
