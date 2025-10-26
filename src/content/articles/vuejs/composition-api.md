---
title: "Vue.js Composition API Guide"
description: "Learn how to use Vue.js Composition API for more organized and reusable code"
pubDate: 2024-12-25
category: "VueJS"
tags: ["vue", "composition-api", "frontend"]
author: "Vue Developer"
featured: true
---

# Vue.js Composition API Guide

The Composition API provides a set of additive, function-based APIs that allow flexible composition of component logic.

## Introduction

The Composition API was introduced in Vue 3 as a new way to organize component logic, as an alternative to the Options API.

## Basic Usage with `setup()`

In Vue 3, you can use the `setup()` function in components:

```javascript
import { ref, onMounted } from 'vue';

export default {
  setup() {
    // reactive state
    const count = ref(0);
    
    // functions that modify state and trigger updates
    function increment() {
      count.value++;
    }
    
    // lifecycle hooks
    onMounted(() => {
      console.log(`Initial count is ${count.value}`);
    });
    
    // expose to template
    return {
      count,
      increment
    };
  }
};
```

## Reactivity APIs

### ref

Used for creating reactive references to values:

```javascript
import { ref } from 'vue';

const count = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

### reactive

Used for creating reactive objects:

```javascript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  message: 'Hello'
});

state.count++; // reactive
```

### computed

Used for creating computed properties:

```javascript
import { ref, computed } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

console.log(doubleCount.value); // 0
count.value = 2;
console.log(doubleCount.value); // 4
```

## Lifecycle Hooks

```javascript
import { onMounted, onUpdated, onUnmounted } from 'vue';

export default {
  setup() {
    onMounted(() => {
      console.log('Component mounted');
    });
    
    onUpdated(() => {
      console.log('Component updated');
    });
    
    onUnmounted(() => {
      console.log('Component unmounted');
    });
  }
};
```

## Watch Effects

### watch

Watches one or more reactive data sources:

```javascript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`);
});
```

### watchEffect

Runs a function immediately and tracks its dependencies:

```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);

watchEffect(() => {
  console.log(`Count is ${count.value}`);
}); // logs: "Count is 0"

count.value++; // logs: "Count is 1"
```

## Composing Functions

One of the main benefits of the Composition API is the ability to extract and reuse logic:

```javascript
// useCounter.js
import { ref } from 'vue';

export function useCounter() {
  const count = ref(0);
  
  function increment() {
    count.value++;
  }
  
  function decrement() {
    count.value--;
  }
  
  return {
    count,
    increment,
    decrement
  };
}

// In a component
import { useCounter } from './useCounter';

export default {
  setup() {
    const { count, increment, decrement } = useCounter();
    
    return {
      count,
      increment,
      decrement
    };
  }
};
```

## Composition API vs Options API

The Composition API offers several advantages:

1. Better TypeScript support
2. More flexible code organization
3. Better runtime performance for complex components
4. Easier logic reuse across components

However, the Options API remains fully supported and is still suitable for many use cases.

## Conclusion

The Composition API provides a powerful way to organize and reuse component logic in Vue applications. It's especially useful for larger components or when sharing logic between components.