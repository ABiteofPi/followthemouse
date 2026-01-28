<script setup lang="ts">
import { computed, ref } from 'vue';
import { analyzePassword } from '../types/logic';

const password = ref('');
const result = computed(() => analyzePassword(password.value));

const strengthColor = computed(() => {
  if (result.value.score === 0) return ''
  if (result.value.level === 'Too Weak') return 'too-weak'
  if (result.value.level === 'Weak') return 'weak'
  if (result.value.level === 'Moderate') return 'moderate'
  if (result.value.level === 'Strong') return 'strong'
  if (result.value.level === 'Very Strong') return 'very-strong'
  return ''
});
</script>

<template>
  <div class="d-flex flex-column align-items-center h-100 py-5">
    <h1 class="my-5 doto title px-5">Password Strength Meter</h1>
    <div class="d-flex flex-column gap-2 mt-5">
      <input v-model="password" type="password" class="input" :class="strengthColor" placeholder="Type a password..." />

      <p class="doto px-4 py-2 mb-2 align-self-center">Strength: <strong :class="strengthColor">{{ result.level
      }}</strong></p>

      <div v-if="result.feedback.length > 0" class="px-4 py-3 d-flex flex-column gap-2 lh-1 tip-box">
        <div class="d-flex flex-row gap-2">
          <i class="bi bi-info-circle mb-2 info-color"></i>
          <span class="doto tip-title">Tips</span>
        </div>

        <p v-for="tip in result.feedback" class="tip" :key="tip">{{ tip }}</p>
      </div>
      <div v-else class="px-4 py-1 align-self-center">
        <span class="doto success">----- Your password looks good! -----</span>
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
  color: #fff !important;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
  transition: background 0.4s ease;
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

.too-weak {
  color: #ff4d4d;

  &:focus-visible {
    border: 1px solid #ff4d4d;
  }
}

.weak {
  color: #ffa500;

  &:focus-visible {
    border: 1px solid #ffa500;
  }
}

.moderate {
  color: #ffff00;

  &:focus-visible {
    border: 1px solid #ffff00;
  }
}

.strong {
  color: #90ee90;

  &:focus-visible {
    border: 1px solid #90ee90;
  }
}

.very-strong {
  color: #00c700;

  &:focus-visible {
    border: 1px solid #00c700;
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

.info-color {
  color: #ac99ff44 !important;
}

.tip-title {
  color: #ab99ff;
}

.success {
  font-size: 20px;
}
</style>
