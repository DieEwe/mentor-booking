<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { login } from '$lib/stores/userStore';
  import { users } from '$lib/dummyData';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  let selectedRole: 'mentor' | 'coach' | null = null;
  let identifier = ''; // can be nickname or email
  let password = '';
  let errorMessage = '';

  function handleLogin() {
    // Attempt to find a matching user in dummy data
    const foundUser = users.find(user => 
      (user.email === identifier || user.nickname === identifier) &&
      user.password === password &&
      user.role === selectedRole
    );

    if (!foundUser) {
      errorMessage = 'Invalid credentials or role mismatch.';
      return;
    }

    // Log the user in
    login(foundUser);
    // Redirect to coaching dates (or wherever you need)
    goto('/coaching-dates');
  }
</script>

<main>
  <h1>Welcome to Our WebApp</h1>

  <div class="form-section">
    <label for="role">Select your role:</label><br />
    <label>
      <input
        type="radio"
        bind:group={selectedRole}
        value="mentor"
      /> 
      Mentor
    </label>
    <label style="margin-left: 1rem;">
      <input
        type="radio"
        bind:group={selectedRole}
        value="coach"
      /> 
      Coach
    </label>
  </div>

  <div class="form-section">
    <label for="identifier">Nickname or Email:</label>
    <input id="identifier" class="input-text" bind:value={identifier} />
  </div>

  <div class="form-section">
    <label for="password">Password:</label>
    <input id="password" type="password" class="input-text" bind:value={password} />
  </div>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}

  <button class="button" on:click={handleLogin} disabled={!selectedRole || !identifier || !password}>
    Login
  </button>
</main>
