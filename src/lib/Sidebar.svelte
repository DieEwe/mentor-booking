<!-- src/lib/Sidebar.svelte -->
<script lang="ts">
    import { userStore } from './stores/userStore';
    import { get } from 'svelte/store';
  
    let currentUser = get(userStore);
  
    $: userStore.subscribe((value) => {
      currentUser = value;
    });
  
    function isMentor() {
      return currentUser.isLoggedIn && currentUser.user?.role === 'mentor';
    }
  
    function isCoach() {
      return currentUser.isLoggedIn && currentUser.user?.role === 'coach';
    }
  </script>
  
  <nav class="sidebar">
    <a href="/">Home</a>
    
    <!-- Always visible: link to apply as mentor -->
    <a href="/mentor-application">Apply as Mentor</a>
    
    <!-- Visible if logged in (mentor or coach) -->
    {#if currentUser.isLoggedIn}
      <a href="/coaching-dates">Coaching Dates</a>
      <a href="/profile">My Profile</a>
    {/if}
  </nav>
  