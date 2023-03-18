<script lang="ts" setup>
import { ref, computed } from "vue";
import EmojiField from "@/components/EmojiField.vue";
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg";
import type Emoji from "@/types/Emoji";
import type Entry from "@/types/Entry";

const charCount = computed(() => text.value.length);
const text = ref("");
const maxLength = 280;
const emoji = ref<Emoji | null>(null);

const emit = defineEmits<{
  (e: "@create", entry: Entry): void;
}>();

const handleTextInput = (e: Event) => {
  const textArea = e.target as HTMLTextAreaElement;
  if (textArea.value.length <= maxLength) {
    text.value = textArea.value;
  }
  // else {
  //   textArea.value = textArea.value.substring(0, maxLength);
  //   text.value = textArea.value;
  // }
};

const handleSubmit = () => {
  emit("@create", {
    body: text.value,
    createdAt: new Date(),
    userId: 1,
    id: Math.random(),
    emoji: emoji.value,
  });
  text.value = "";
  emoji.value = null;
};
</script>

<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      :value="text"
      @keyup="handleTextInput"
      placeholder="New Journal Entry..."
      :maxlength="maxLength"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxLength }}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
