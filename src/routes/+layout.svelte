<!-- src/routes/+layout.svelte -->
<script>
  import "../app.css"; // Global styles
  import Sidebar from "$lib/Sidebar.svelte";
</script>

<div style="display: flex;">
  <Sidebar />
  <div class="content">
    <slot />
  </div>
</div>
