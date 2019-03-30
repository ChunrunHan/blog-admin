<template>
  <d2-container>
    <template slot="header">header</template>
    <Content></Content>
    <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import Content from './components/content';
export default {
    components: {
        Content
    }
}
</script>

