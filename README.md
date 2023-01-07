# Form

Extracted useForm from InertiaJS to make form handling faster

## Installation

```bash
pnpm add @osenco/form
```

## Usage

### VueJS

```vue
<script lang="ts" setup>
import { useForm } from "@osenco/form"

const form = useForm({
    name: '',
    email: ''
})

const submitForm = async () => {
    const { id } = await form.post('/users', {
        auth: `Bearer ${token}`
    })
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <label>
            Name
            <input v-model="form.name" type="name" />
        </label>
        
        <label>
            Email
            <input v-model="form.email" type="email" />
        </label>

        <input type="submit" value="Save details" :disabled="form.processing" />
    </form>
</template>

```
