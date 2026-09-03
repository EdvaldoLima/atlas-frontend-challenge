<script lang="ts" setup>
withDefaults(
  defineProps<{
    modelValue?: string;
  }>(),
  {
    modelValue: "",
  },
);

defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    v-bind="$attrs"
    class="input-text"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style src="./InputText.scss"></style>
