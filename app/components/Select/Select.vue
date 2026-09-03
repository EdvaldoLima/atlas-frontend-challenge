<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
});

interface SelectOption {
  label: string;
  value: string;
}

withDefaults(
  defineProps<{
    label: string;
    modelValue?: string;
    options: SelectOption[];
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
  <label class="select-field">
    {{ label }}
    <select
      :value="modelValue"
      v-bind="$attrs"
      class="select-field__control"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </label>
</template>

<style src="./Select.scss"></style>
