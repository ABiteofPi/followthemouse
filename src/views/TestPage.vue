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
    <h1 class="my-5 doto title">Password Strength Meter</h1>
    <div class="d-flex flex-column gap-2">
      <input v-model="password" type="password" class="input" placeholder="Type a password..." />

      <div class="meter d-flex align-items-center justify-content-center">
        <div class="progress" :style="{ width: result.score + '%', backgroundColor: getBarColor(result.level) }"></div>
      </div>

      <p class="doto px-4 py-2 mb-2 align-self-center">Strength: <strong>{{ result.level }}</strong></p>

      <div class="px-4 py-3 d-flex flex-column gap-2 lh-1 tip-box">
        <p v-for="tip in result.feedback" class="tip" :key="tip">{{ tip }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.title {
  text-shadow: 0 4px 25px rgba(255, 255, 255, 0.3), 0 0px 7px rgba(255, 255, 255, 0.2), 0 4px 50px rgba(255, 255, 255, 0.1);
}

.input {
  padding: 15px 30px;
  font-size: 20px;
  border: 1px solid #cccccc4d;
  border-radius: 50px;
  min-width: 500px;
  background-color: #090014;
  color: #fff;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s ease;
  transition: border 0.3s ease;
  transition: box-shadow 0.1s ease;

  &:hover {
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.0);
    background-color: #0e011f;
  }

  &:focus-visible {
    outline: none;
    border: 1px solid #cccccc8a;
    box-shadow: 0 2px 25px rgba(255, 255, 255, 0.1);
    background-color: #0e011f;
  }
}

.progress {
  height: 4px;
  border-radius: 50px;
}

.tip-box {
  background-color: #160338;
  border: 1px solid #5f457c46;
  border-radius: 15px;

}

.tip {
  font-size: 14px;
  margin: 0;

}
</style>
